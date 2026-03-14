#  Auth Middleware — الكود القديم vs الجديد

## الكود القديم (بسيط لكن فيه مشاكل)

```js
// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // ❌ الاسم مش دقيق، ده header مش token
  
  if (!token) { // ❌ بيتحقق إن الـ header موجود بس، مش من شكله
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""), // ❌ خطر لو "Bearer" مش موجودة
      process.env.JWT_SECRET         // ❌ مفيش تحقق إن JWT_SECRET موجود
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" }); // ❌ كل الأخطاء نفس الرسالة
    // ❌ status 400 غلط، المفروض 401
  }
};

module.exports = authMiddleware;
```

---

## الكود الجديد (محسّن وأكثر أماناً)

```js
// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  // ✅ [1] بنحفظ الـ header الكامل في متغير اسمه authHeader (اسم أدق)
  const authHeader = req.headers["authorization"];

  // ✅ [2] بنتحقق من حاجتين مع بعض:
  //    - authHeader?.  ← لو undefined أو null ما يعملش error (Optional Chaining)
  //    - startsWith("Bearer ") ← بيتأكد إن الشكل صح
  //    لو جاء "Authorization: 123456" بدون Bearer → بيرفضه هنا
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  // ✅ [3] استخراج الـ token بطريقة أآمن
  //    split(" ") → ["Bearer", "abc123"]
  //    [1]        → "abc123" فقط
  const token = authHeader.split(" ")[1];

  // ✅ [4] التحقق إن JWT_SECRET موجود في ملف .env
  //    لو مش موجود → السيرفر يوقف ويوضح المشكلة بدل ما يتصرف بشكل غريب
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // بنحفظ بيانات الـ user في الـ request
    next();             // بنسمح للـ request يكمل
  } catch (err) {

    // ✅ [5] بنفرق بين أنواع الأخطاء
    if (err.name === "TokenExpiredError") {
      // الـ token كان صح بس انتهت صلاحيته
      // الـ frontend يقدر يعمل refresh للـ token
      return res.status(401).json({ message: "Token expired" });
    }

    if (err.name === "JsonWebTokenError") {
      // الـ token مزيف أو اتعبث بيه
      return res.status(401).json({ message: "Invalid token" });
    }

    // أي error تاني = مشكلة في السيرفر نفسه
    return res.status(500).json({ message: "Authentication error" });
  }
};

module.exports = authMiddleware;
```

---

---

### Optional Chaining `?.`
```js
authHeader?.startsWith("Bearer ")
// لو authHeader = undefined → مش هيعمل error، هيرجع false بس
// لو authHeader = "Bearer abc" → هيشتغل عادي
```

### split vs replace
```js
// replace — ممكن تتخدع
"Bearer abc123".replace("Bearer ", "") // → "abc123" ✅
"abc123".replace("Bearer ", "")        // → "abc123" ✅ (ما اتغيرش وما عملش error!)

// split — أوضح وأآمن
"Bearer abc123".split(" ")[1] // → "abc123" ✅
"abc123".split(" ")[1]        // → undefined (هنعرف في [4] إن فيه مشكلة)
```

### HTTP Status Codes
```
400 Bad Request    → الـ request شكله غلط (بيانات ناقصة مثلاً)
401 Unauthorized   → محتاج تعمل login الأول
500 Internal Error → مشكلة في السيرفر نفسه
```

### JWT Error Names
```
TokenExpiredError  → الـ token صح بس وقته خلص (مثلاً بعد 7 أيام)
JsonWebTokenError  → الـ token مش صح أصلاً أو اتعبث بيه
```

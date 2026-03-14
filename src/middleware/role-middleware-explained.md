#  Role Middleware — الكود القديم vs الجديد

## الكود القديم (بسيط لكن فيه مشاكل)

```js
// src/middleware/role.middleware.js
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) { // ❌ لو req.user مش موجود → Server Crash
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};

module.exports = roleMiddleware;
```

---

## الكود الجديد (محسّن وأكثر أماناً)

```js
// src/middleware/role.middleware.js
const roleMiddleware = (roles) => {

  // ✅ [1] التحقق إن roles مصفوفة وليست فارغة
  //    لو المطور كتب roleMiddleware("admin") بدل roleMiddleware(["admin"]) → throw error فوراً
  if (!Array.isArray(roles) || roles.length === 0) {
    throw new Error("roles must be a non-empty array");
  }

  return (req, res, next) => {

    // ✅ [2] التحقق إن req.user موجود
    //    بيحصل لو authMiddleware مش شغال قبل roleMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // ✅ [3] التحقق إن الـ user عنده role أصلاً
    //    لو الـ JWT فيه { id: "123" } بدون role → 403
    if (!req.user.role) {
      return res.status(403).json({ message: "Forbidden: No role assigned" });
    }

    // ✅ [4] التحقق إن الـ role مسموحله
    //    لو role = "sales" والـ roles = ["admin"] → 403
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next(); // ✅ User authorized — اكمل للـ Controller
  };
};

module.exports = roleMiddleware;
```


### Middleware Factory
```js
const roleMiddleware = (roles) => {
  return (req, res, next) => { ... }
}
// دالة بترجع middleware — عشان نقدر نبعت roles كـ argument
roleMiddleware(["admin"])
roleMiddleware(["admin", "manager"])
```

### Array.isArray
```js
Array.isArray(["admin"])  // → true  ✅
Array.isArray("admin")    // → false ❌ throw error
Array.isArray([])         // → false ❌ throw error (فارغة)
```

### HTTP Status Codes
```
401 Unauthorized   → مفيش user أصلاً (محتاج تعمل login)
403 Forbidden      → فيه user بس مش عنده صلاحية
```

---

## 🔗 الاستخدام مع authMiddleware

```js
// ✅ authMiddleware الأول دايماً عشان يحط req.user
router.post("/products", authMiddleware, roleMiddleware(["admin"]), createProduct);
router.get("/reports",   authMiddleware, roleMiddleware(["admin", "manager"]), getReports);

// ❌ لو نسيت authMiddleware
router.post("/products", roleMiddleware(["admin"]), createProduct); // req.user = undefined → 401
```

/*APIFeatures is a helper class for filtering, searching, sorting, and pagination.
query → the Mongoose query (User.find())
queryString → data from client URL (req.query)*/

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    /*Copy queryString to queryObj to avoid changing the original.
    Remove page, sort, limit, fields, search → they are not filters.
    Replace gte, lte, gt, lt with $gte, $lte, $gt, $lt for MongoDB.
    Apply filter with this.query.find(...).
    Return this to allow chaining.*/
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "search"];

        excludedFields.forEach((el) => delete queryObj[el]);

        this.query = this.query.find(queryObj);

        return this;
    }

    /*Search for text in name or email.
    $regex → partial match
    $options: "i" → case-insensitive*/
    search() {
        if (this.queryString.search) {
            const search = this.queryString.search;

            this.query = this.query.find({
                name: { $regex: search, $options: "i" },
            });
        }

        return this;
    }

    /*Sort results by the field from URL.
    Default → newest first (-createdAt).*/
    sort() {
        if (this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    /*Choose only the fields you want.
    Default → remove __v field.*/
    limitFields() {

        if (this.queryString.fields) {

            const fields = this.queryString.fields.split(",").join(" ")
            this.query = this.query.select(fields)

        } else {

            this.query = this.query.select("-__v")

        }

        return this
    }

    /*Divide results by page.
    skip → skip previous records
    limit → number of results per page*/
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;

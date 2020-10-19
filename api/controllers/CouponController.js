/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    create: async function (req, res) {

        if (req.method == "GET") return res.view('coupon/create');

        var coupon = await Coupon.create(req.body).fetch();

        return res.status(201).json({ id: coupon.id });
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatCoupon = await Coupon.findOne(req.params.id);

            if (!thatCoupon) return res.notFound();

            return res.view('coupon/update', { coupon: thatCoupon });

            
        } else {

            var updatedCoupon = await Coupon.updateOne(req.params.id).set(req.body);

            if (!updatedCoupon) return res.notFound();

            return res.ok();
        }
    },

    

    // action - delete 
    delete: async function (req, res) {

        var deletedCoupon = await Coupon.destroyOne(req.params.id);

        if (!deletedCoupon) return res.notFound();

        return res.ok();
    },

    // json function
    json: async function (req, res) {

        var everycoupon = await Coupon.find();

        return res.json(everycoupon);
    },


    // admin function
    admin: async function (req, res) {

        var Coupons = await Coupon.find();

        return res.view('coupon/admin', { coupon: Coupons });
    },

    // read function
    read: async function (req, res) {

        var Coupons = await Coupon.find();

        return res.view('coupon/read', { coupon: Coupons });
    },

    // detail function
    detail: async function (req, res) {

            var thatCoupon = await Coupon.findOne(req.params.id);

            if (!thatCoupon) return res.notFound();

            return res.view('coupon/detail', { coupon: thatCoupon });

            
    },

    //// action - search
    //search: async function (req, res) {

    //    var limit = Math.max(2, 1) || 1;
    //    var offset = Math.max(req.query.offset, 0) || 0;

    //    var someCoupons = await Coupon.find({
    //        limit: limit,
    //        skip: offset
    //    });

    //    var count = await Coupon.count();

    //    return res.view('coupon/search', { coupon: someCoupons, numOfRecords: count });
    //},

    search: async function (req, res) {

       

        var whereClause = {};

        if (req.query.region && req.query.region != "" ){
            
        whereClause.region = { contains: req.query.region };

        var limit = Math.max(2, 1) || 1;
        var offset = Math.max(req.query.offset, 0) || 0;

        var thoseCoupons = await Coupon.find({
            where: whereClause,
            limit: limit,
            skip: offset
        });

        var j = await Coupon.find({
            where: whereClause,
            
        });


        
        return res.view('coupon/search', { coupon: thoseCoupons, numOfRecords: j.length });

    }else {

        var limit = Math.max(2, 1) || 1;
        var offset = Math.max(req.query.offset, 0) || 0;

        var someCoupons = await Coupon.find({
            limit: limit,
            skip: offset
        });

        var count = await Coupon.count();

        return res.view('coupon/search', { coupon: someCoupons, numOfRecords: count });
        
    }


    } 
};


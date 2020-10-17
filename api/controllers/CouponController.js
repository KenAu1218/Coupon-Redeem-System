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

    // action - read
    read: async function (req, res) {

        var thatCoupon = await Coupon.find(req.params.id);

        if (!thatCoupon) return res.notFound();

        return res.view('coupon/read', { coupon: thatCoupon });
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


};


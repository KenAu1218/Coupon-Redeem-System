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

        var whereClause = {};

        whereClause.region = { contains: "HKI"};

        var limit = Math.max(2, 1) || 1;

        //var o = JSON.stringify(Coupon.createdAt);
 
        //var o = res.json({createdAt: Coupon.createdAt});

        var o =  {createdAt : -1};

        var Coupon1 = await Coupon.find({
            limit: limit,
            where: whereClause,
            sort : 'createdAt DESC'
        });

        whereClause.region = { contains: "KWL"};

        var Coupon2 = await Coupon.find({
            limit: limit,
            where: whereClause,
            sort :  'createdAt DESC'
        });

        whereClause.region = { contains: "NT"};

        var Coupon3 = await Coupon.find({
            limit: limit,
            where: whereClause,
            sort :  'createdAt DESC'
        });

        return res.view('coupon/read', { coupon1: Coupon1,coupon2: Coupon2, coupon3: Coupon3  });
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
        
        var d = new Date("10/19/2020");

        var k = new Date("10/21/2020");

        if(d <= k){
            console.log( "yes");
     }

        console.log("DD: "+ d.toDateString());



        var whereClause = {};

        if (req.query.region || req.query.minCoin || req.query.maxCoin || req.query.vaildOn) {

            if(req.query.region)
            whereClause.region = { contains: req.query.region };

            //if (req.query.minCoin) {
                
            //    console.log("req.query.minCoin" + typeof req.query.minCoin);
            //    console.log("req.query.maxCoin" + typeof req.query.maxCoin);
            //}

           

            //var dd = new Date();

            if(req.query.vaildOn){

                whereClause.expireDate = {'>=': req.query.vaildOn};
            }else{
                console.log("no date");
            }


            var min = 0;
            var max = 0;
            if(req.query.minCoin){
                min = parseInt(req.query.minCoin);
            }

            if(req.query.maxCoin){
                max = parseInt(req.query.maxCoin);
            }

            if(min == 0 && max == 0  ){
            
            }else if (max == 0 && min != 0){

                whereClause.coin = {'>=': min};
                
            } else {
                whereClause.coin = {'>=': min, '<=': max}; // req.query.minCoin is string type
            }

           

            var limit = Math.max(2, 1) || 1;
            var offset = Math.max(req.query.offset, 0) || 0;

            var thoseCoupons = await Coupon.find({
                where: whereClause,
                limit: limit,
                skip: offset,

            });

            var j = await Coupon.find({
                where: whereClause,

            });


            return res.view('coupon/search', { coupon: thoseCoupons, numOfRecords: j.length });

        } else {

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


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




  if (req.wantsJSON) {

   var q = await Coupon.findOne(req.params.id);


   var l = q.quota - 1;


   var updatedCoupon = await Coupon.updateOne(req.params.id).set({ quota: l });



   if (!updatedCoupon) return res.notFound();

   return res.ok();

  }


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

  var userInfo = {};

  userInfo.username = req.session.username;

  userInfo.userid = req.session.userid;

  userInfo.coin = req.session.coin;

  userInfo.role = req.session.role;

  console.log(userInfo.userid);


  return res.view('coupon/admin', { coupon: Coupons, user: userInfo });
 },

 // read function
 read: async function (req, res) {

  var whereClause = {};

  whereClause.region = { contains: "HKI" };

  var limit = Math.max(2, 1) || 1;

  //var o = JSON.stringify(Coupon.createdAt);

  //var o = res.json({createdAt: Coupon.createdAt});

  var o = { createdAt: -1 };

  var Coupon1 = await Coupon.find({
   limit: limit,
   where: whereClause,
   sort: 'createdAt DESC'
  });

  whereClause.region = { contains: "KWL" };

  var Coupon2 = await Coupon.find({
   limit: limit,
   where: whereClause,
   sort: 'createdAt DESC'
  });

  whereClause.region = { contains: "NT" };

  var Coupon3 = await Coupon.find({
   limit: limit,
   where: whereClause,
   sort: 'createdAt DESC'
  });

  var userInfo = {};

  userInfo.username = req.session.username;

  userInfo.userid = req.session.userid;

  userInfo.coin = req.session.coin;

  userInfo.role = req.session.role;

  //console.log(req.session.username);
  //if(req.session.username){
  //console.log("req.session.username");
  //console.log("pppp");

  //}
  return res.view('coupon/read', { coupon1: Coupon1, coupon2: Coupon2, coupon3: Coupon3, user: userInfo });
 },

 // detail function
 detail: async function (req, res) {

  var thatCoupon = await Coupon.findOne(req.params.id);

  if (!thatCoupon) return res.notFound();

  var userInfo = {};

  userInfo.username = req.session.username;

  userInfo.userid = req.session.userid;

  userInfo.coin = req.session.coin;

  userInfo.role = req.session.role;

  console.log("detail:" + userInfo.userid);

  return res.view('coupon/detail', { coupon: thatCoupon, user: userInfo });


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





  var userInfo = {};

  userInfo.username = req.session.username;

  userInfo.userid = req.session.userid;

  userInfo.coin = req.session.coin;

  userInfo.role = req.session.role;






  if (req.wantsJSON) {

   var thoseCoupon;
   var totalCoupon;
   var limit = Math.max(2, 1) || 1;
   var offset = Math.max(req.query.offset, 0) || 0;


    var whereClause = {};

    if (req.query.region)
     whereClause.region = { contains: req.query.region };


    if (req.query.vaildOn) {

     whereClause.expireDate = { '>=': req.query.vaildOn };
    } 


    var min = 0;
    var max = 0;
    if (req.query.minCoin) {
     min = parseInt(req.query.minCoin);
    }

    if (req.query.maxCoin) {
     max = parseInt(req.query.maxCoin);
    }

    if (min == 0 && max == 0) {

    } else if (max == 0 && min != 0) {

     whereClause.coin = { '>=': min };

    } else {
     whereClause.coin = { '>=': min, '<=': max }; // req.query.minCoin is string type
    }



    totalCoupon = await Coupon.count({
     where: whereClause,

    });

    console.log("totalCoupon"+totalCoupon);
    

    thoseCoupon = await Coupon.find({
     where: whereClause,
     limit: limit,
     skip: offset,

    });

    res.json({totalCoupon, thoseCoupon});


  } else {
   var count = await Coupon.count();

   console.log(count);
   return res.view('coupon/search', { numOfRecords: count, user: userInfo });
  }





 },


 populate: async function (req, res) {

  var coupon = await Coupon.findOne(req.params.id).populate("belongTo");

  if (!coupon) return res.notFound();

  return res.json(coupon);

 },

};


/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
        console.log("21312");
        if (!req.body.username || !req.body.password) return  res.status(401).json("username&passwordundefine");
        console.log("0");
        var user = await User.findOne({ username: req.body.username });
        console.log("1");
        if (!user) return res.status(401).json("User not found");
        console.log("2");
        var match = await sails.bcrypt.compare(req.body.password, user.password);
        console.log("3");
        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            console.log("hi1");
            console.log(user.id);
            req.session.username = user.username;
            req.session.userid = user.id;              // req.session.id is different it mean the id of this session
            req.session.coin = user.coin;
            req.session.role = user.role;
            
            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {
            console.log("hi2");
            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.id = user.id;
            req.session.coin = user.coin;
            req.session.role = user.role;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.json();
        });

      
    },

    populate: async function (req, res) {


        var user = await User.findOne(req.params.id).populate("have");
    
        if (!user) return res.notFound();
    
        return res.json(user);
    },

    add: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belongTo", {id: req.params.id});
    
        if (!thatCoupon) return res.status(404).json("Coupon not found.");
            
        if (thatCoupon.belongTo.length > 0)
            return res.status(409).json("Already added.");   // conflict
        
            await User.addToCollection(req.params.id, "have").members(req.params.fk);
    
        //return res.ok();

        return res.status(204).send();
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belongTo", {id: req.params.id});
        
        if (!thatCoupon) return res.status(404).json("Coupon not found.");
    
        if (thatCoupon.belongTo.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict
    
        await User.removeFromCollection(req.params.id, "have").members(req.params.fk);
    
        return res.ok();
    },


    redeem: async function(req, res){

        var user = await User.findOne(req.session.userid).populate("have");
    
        if (!user) return res.notFound();
    
        //return res.json(user);
        return res.view('user/redeem',{ user: user });
    },

    update: async function (req, res) {
        
        if(req.wantsJSON){

            var u = await User.findOne(req.params.id);

            var c = req.params.coin;

            //console.log("c"+ c);

            var l = u.coin - c; 

            req.session.coin = l;

            var updatedCoupon = await User.updateOne(req.params.id).set({coin: l});


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


    check: async function (req, res) {

        if(req.wantsJSON){
        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");
        
        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belongTo", {id: req.params.id});
    
        if (!thatCoupon) return res.status(404).json("Coupon not found.");
            
        if (thatCoupon.belongTo.length > 0)
            return res.status(409).json("Already added.");   // conflict
        
          
        return res.status(204).send();
        }
    },

     // json function
     json: async function (req, res) {

        var everyuser = await User.find();

        return res.json(everyuser);
    },

};


/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            console.log("hi1");
            req.session.username = user.username;
            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {
            console.log("hi2");
            if (err) return res.serverError(err);

            req.session.username = user.username;
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

};

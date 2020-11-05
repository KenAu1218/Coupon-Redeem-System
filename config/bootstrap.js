/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */



module.exports.bootstrap = async function () {

    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```

    sails.bcrypt = require('bcryptjs');
    var salt = await sails.bcrypt.genSalt(10);


    if (await Coupon.count() > 0) {
        return;
    }

    await Coupon.createEach([

        { title: "50% discount", restaurant: "Ming Court", region: "KWL", mall: "Megabox", image: "https://cdn.asiatatler.com/asiatatler/i/hk/2020/02/12125015-louise-hong-kong-instagrammable-restaurants-2020-hong-kong-tatler_cover_1800x1200.jpg", quota: 50, coin: 100, expireDate: "2020-12-18", detail: "Present this coupon to enjoy a special price of HK$628 per person on Ming Court Hairy Crab Degustation Menu (5-course)" },
        { title: "80% discount", restaurant: "The Chefs Table", region: "KWL", mall: "APM", image: "https://media.timeout.com/images/103943247/image.jpg", quota: 100, coin: 200, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "Free Lunch", restaurant: "Stanford Cafe", region: "HKI", mall: "Time Square", image: "https://media.timeout.com/images/105579017/image.jpg", quota: 150, coin: 250, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "20% discount", restaurant: "Palm Court", region: "HKI", mall: "IFC Mall", image: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2020/04/new-restaurants-hong-kong-2020-pano.jpg", quota: 300, coin: 300, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "10% discount", restaurant: "Cielo", region: "NT", mall: "Tsuen Wan Plaza", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAxxQXuSEN3UKfYPeIAqY40opfcuW11EYarQ&usqp=CAU", quota: 50, coin: 400, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "30% discount", restaurant: "Canton Pot", region: "NT", mall: "New Town Plaza", image: "https://www.voguehk.com/media/2019/05/best-restaurants-hong-kong-keia.jpg", quota: 10, coin: 450, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "40% discount", restaurant: "Statiion 3 Cafe", region: "KWL", mall: "Festival Walk", image: "https://www.louise.hk/images/louise_terrace.jpg", quota: 2, coin: 450, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "10% discount", restaurant: "Double Cafe", region: "HKI", mall: "Pacific Place", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7SNmy5-M8I9sH4jRoaRVhUq31-4PUwkSwrw&usqp=CAU", quota: 5, coin: 450, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },
        { title: "5% discount", restaurant: "Fo Tan", region: "NT", mall: "New Town Plaza", image: "https://blacksheeprestaurants.com/wp-content/uploads/2017/10/osteria-marzia-black-sheep-restaurants.jpg", quota: 9, coin: 450, expireDate: "2020-12-18", detail: "Show this coupon or printout to restaurant staff before the meal" },

    ]);

    return generateUsers();

    async function generateUsers() {

        if (await User.count() > 0) {
            return;
        }

        var hash1 = await sails.bcrypt.hash('1234', salt);
        var hash2 = await sails.bcrypt.hash('5678', salt);
        var hash3 = await sails.bcrypt.hash('9990', salt);

        await User.createEach([
            { username: "admin", password: hash1, role: "admin"},
            { username: "Ken", password: hash2, role: "member"},
            { username: "Paula", password: hash3, role: "member" },
            { username: "JohnsonBaby", password: hash3 },
            // etc.
        ]);

        const coupon1 = await Coupon.findOne({ restaurant: "Ming Court", title: "50% discount"  });
        const coupon2 = await Coupon.findOne({ restaurant: "The Chefs Table", title: "80% discount"});
        const coupon3 = await Coupon.findOne({ restaurant: "Stanford Cafe", title: "Free Lunch"});
        const admin = await User.findOne({ username: "admin" });
        const Ken = await User.findOne({ username: "Ken" });
        const Paula = await User.findOne({ username: "Paula" });

        await User.addToCollection(admin.id, 'have').members(coupon1.id);
        await User.addToCollection(Ken.id, 'have').members([coupon2.id, coupon3.id]);
        await User.addToCollection(Paula.id, 'have').members(coupon3.id);
    }
};

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` your home page.            *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/

    'GET /coupon/create': 'CouponController.create',
    'POST /coupon/create': 'CouponController.create',

    //'GET /': 'PersonController.list',
    //'GET /person': 'PersonController.list',
    //'GET /person/list': 'PersonController.list',
    //'GET /person/json': 'PersonController.json',

    'GET /coupon/read/:id': 'CouponnController.read',

    'POST /coupon/delete/:id': 'CouponController.delete',

    'GET /coupon/update/:id': 'CouponController.update',
    'POST /coupon/update/:id': 'CouponController.update',


    'GET /coupon/search': 'CouponController.search',
    'GET /coupon/paginate': 'CouponController.paginate',

    /***************************************************************************
    *                                                                          *
    * More custom routes here...                                               *
    * (See https://sailsjs.com/config/routes for examples.)                    *
    *                                                                          *
    * If a request to a URL doesn't match any of the routes in this file, it   *
    * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
    * not match any of those, it is matched against static assets.             *
    *                                                                          *
    ***************************************************************************/


};

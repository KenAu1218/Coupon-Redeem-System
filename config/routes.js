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

    'GET /': 'CouponController.read',
    'GET /coupon': 'CouponController.read',
    'GET /coupon/read': 'CouponController.read',
    'GET /coupon/list': 'CouponController.read',

    'GET /coupon/json': 'CouponController.json',

    'POST /coupon/delete/:id': 'CouponController.delete',

    'GET /coupon/update/:id': 'CouponController.update',
    'POST /coupon/update/:id': 'CouponController.update',
    'PUT /coupon/:id': 'CouponController.update',

    'GET /coupon/admin': 'CouponController.admin',

    'GET /coupon/detail/:id': 'CouponController.detail',

    'GET /coupon/search': 'CouponController.search',

    //'GET /coupon/searchEngine': 'CouponController.searchEngine',


    'GET /user': 'UserController.login',
    'GET /user/login': 'UserController.login',
    'POST /user/login': 'UserController.login',
    'POST /user/logout': 'UserController.logout',


    'GET /coupon/:id/belongTo': 'CouponController.populate',
    'GET /user/:id/have': 'UserController.populate',
    'POST /user/:id/have/add/:fk': 'UserController.add',
    'POST /user/:id/have/remove/:fk': 'UserController.remove',


    'GET /user/redeem': 'UserController.redeem',

    'PUT /user/:id/coin/:coin': 'UserController.update',

    'GET /user/:id/coupon/:fk' : 'UserController.check',

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

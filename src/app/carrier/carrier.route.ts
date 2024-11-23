import { GhRoute } from "../misc/classes/route";

/**
 * @class CarrierRoutes
 * @description The routes for the carrier module
 */
export class CarrierRoutes {
    /**
     * @description The route to enter the client module
     * @type {GhRoute}
     */
    static readonly carrier: GhRoute = new GhRoute('carrier');

    /**
     * @description The log in route
     * @type {GhRoute}
     */
    static readonly login: GhRoute = new GhRoute('login', CarrierRoutes.carrier);

    /**
     * @description The forgot password route
     */
    static readonly forgotPassword = new GhRoute('forgot-password', CarrierRoutes.carrier);

    /**
     * @description The sign up route
     * @type {GhRoute}
     */
    static readonly signup: GhRoute = new GhRoute('signup', CarrierRoutes.carrier);

    /**
     * @description The main page route
     * @type {GhRoute}
     */
    static readonly main: GhRoute = new GhRoute('app', CarrierRoutes.carrier);

    /**
     * @description The send report trip route
     * @type {GhRoute}
     */
    static readonly reportTrip: GhRoute = new GhRoute('report-trip', CarrierRoutes.main);

    /**
     * @description The GP orders route
     * @type {GhRoute}
     */
    static readonly gpOrders: GhRoute = new GhRoute('gp-orders', CarrierRoutes.main);

    /**
     * @description The confirm orders route
     * @type {GhRoute}
     */
    static readonly confirmOrders: GhRoute = new GhRoute('confirm-orders', CarrierRoutes.gpOrders);

    /**
     * @description The item on his way route
     * @type {GhRoute}
     */
    static readonly itemOnHisWay: GhRoute = new GhRoute('item-on-his-way', CarrierRoutes.gpOrders);

    /**
     * @description The item at checkpoint route
     * @type {GhRoute}
     */
    static readonly itemAtCheckpoint: GhRoute = new GhRoute('item-at-checkpoint', CarrierRoutes.gpOrders);

    /**
     * @description The ready for pickup route
     * @type {GhRoute}
     */
    static readonly readyForPickup: GhRoute = new GhRoute('ready-for-pickup', CarrierRoutes.gpOrders);

    /**
     * @description The item delivered route
     * @type {GhRoute}
     */
    static readonly itemDeliveredGp: GhRoute = new GhRoute('item-delivered', CarrierRoutes.gpOrders);

    /**
     * @description The order tracking route
     * @type {GhRoute}
     */
    static readonly gpTracking: GhRoute = new GhRoute('gp-tracking', CarrierRoutes.gpOrders);

    /**
     * @description The trip list route
     * @type {GhRoute}
     */
    static readonly tripList: GhRoute = new GhRoute('trip-list', CarrierRoutes.main);

    /**
     * @description The planned trip route
     * @type {GhRoute}
     */
    static readonly plannedTrip: GhRoute = new GhRoute('planned-trip', CarrierRoutes.tripList);

    /**
     * @description The confirmed trip route
     * @type {GhRoute}
     */
    static readonly confirmedTrip: GhRoute = new GhRoute('confirmed-trip', CarrierRoutes.tripList);

    /**
     * @description The trip details route
     * @type {GhRoute}
     */
    static readonly tripDone: GhRoute = new GhRoute('trip-done', CarrierRoutes.tripList);
}
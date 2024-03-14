import { GhRoute } from "./misc/classes/route";

/**
 * @class ClientRoutes
 * @description The routes for the client module
 */
export class ClientRoutes {
    /**
     * @description The route to enter the client module
     * @type {GhRoute}
     */
    static readonly client: GhRoute = new GhRoute('client');

    /**
     * @description The log in route
     * @type {GhRoute}
     */
    static readonly login: GhRoute = new GhRoute('login', ClientRoutes.client);

    /**
     * @description The forgot password route
     */
    static readonly forgotPassword = new GhRoute('forgot-password', ClientRoutes.client);

    /**
     * @description The sign up route
     * @type {GhRoute}
     */
    static readonly signup: GhRoute = new GhRoute('signup', ClientRoutes.client);

    /**
     * @description The main page route
     * @type {GhRoute}
     */
    static readonly main: GhRoute = new GhRoute('app', ClientRoutes.client);

    /**
     * @description The send items route
     * @type {GhRoute}
     */
    static readonly sendItems: GhRoute = new GhRoute('send-items', ClientRoutes.main);

    /**
     * @description The celendar route
     * @type {GhRoute}
     */
    static readonly calendar: GhRoute = new GhRoute('calendar', ClientRoutes.sendItems);

    /**
     * @description The send report trip route
     * @type {GhRoute}
     */
    static readonly reportTrip: GhRoute = new GhRoute('report-trip', ClientRoutes.main);

    /**
     * @description The client order route
     * @type {GhRoute}
     */
    static readonly clientOrder: GhRoute = new GhRoute('client-order', ClientRoutes.main);

    /**
     * @description The waiting GP confirmation route
     * @type {GhRoute}
     */
    static readonly waitingGpConfirmation: GhRoute = new GhRoute('waiting-gp-confirmation', ClientRoutes.clientOrder);

    /**
     * @description The GP orders route
     * @type {GhRoute}
     */
    static readonly gpOrders: GhRoute = new GhRoute('gp-orders', ClientRoutes.main);

    /**
     * @description The confirm orders route
     * @type {GhRoute}
     */
    static readonly confirmOrders: GhRoute = new GhRoute('confirm-orders', ClientRoutes.gpOrders);

    /**
     * @description The item on his way route
     * @type {GhRoute}
     */
    static readonly itemOnHisWay: GhRoute = new GhRoute('item-on-his-way', ClientRoutes.gpOrders);

    /**
     * @description The item at checkpoint route
     * @type {GhRoute}
     */
    static readonly itemAtCheckpoint: GhRoute = new GhRoute('item-at-checkpoint', ClientRoutes.gpOrders);

    /**
     * @description The ready for pickup route
     * @type {GhRoute}
     */
    static readonly readyForPickup: GhRoute = new GhRoute('ready-for-pickup', ClientRoutes.gpOrders);

    /**
     * @description The item with you route
     * @type {GhRoute}
     */
    static readonly itemWithYou: GhRoute = new GhRoute('item-with-you', ClientRoutes.gpOrders);

    /**
     * @description The waiting reception route
     * @type {GhRoute}
     */
    static readonly waitingReception: GhRoute = new GhRoute('waiting-reception', ClientRoutes.clientOrder);

    /**
     * @description The at check point route
     * @type {GhRoute}
     */
    static readonly atCheckPoint: GhRoute = new GhRoute('at-check-point', ClientRoutes.clientOrder);

    /**
     * @description The item with GP route
     * @type {GhRoute}
     */
    static readonly itemWithGp: GhRoute = new GhRoute('item-with-gp', ClientRoutes.clientOrder);

    /**
     * @description The item ready for pickup route
     * @type {GhRoute}
     */
    static readonly itemReadyForPickup: GhRoute = new GhRoute('item-ready-for-pickup', ClientRoutes.clientOrder);

    /**
     * @description The item delivered route
     * @type {GhRoute}
     */
    static readonly itemDelivered: GhRoute = new GhRoute('item-delivered', ClientRoutes.clientOrder);

    /**
     * @description The item delivered route
     * @type {GhRoute}
     */
    static readonly itemDeliveredGp: GhRoute = new GhRoute('item-delivered', ClientRoutes.gpOrders);

    /**
     * @description The trip list route
     * @type {GhRoute}
     */
    static readonly tripList: GhRoute = new GhRoute('trip-list', ClientRoutes.main);

    /**
     * @description The planned trip route
     * @type {GhRoute}
     */
    static readonly plannedTrip: GhRoute = new GhRoute('planned-trip', ClientRoutes.tripList);

    /**
     * @description The confirmed trip route
     * @type {GhRoute}
     */
    static readonly confirmedTrip: GhRoute = new GhRoute('confirmed-trip', ClientRoutes.tripList);

    /**
     * @description The trip details route
     * @type {GhRoute}
     */
    static readonly tripDone: GhRoute = new GhRoute('trip-done', ClientRoutes.tripList);

    /**
     * @description The alert list route
     * @type {GhRoute}
     */
    static readonly alertList: GhRoute = new GhRoute('alert-list', ClientRoutes.main);

    /**
     * @description The create alert route
     * @type {GhRoute}
     */
    static readonly createAlert: GhRoute = new GhRoute('create', ClientRoutes.alertList);
}
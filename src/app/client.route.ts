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
     * @description The waiting reception route
     * @type {GhRoute}
     */
    static readonly waitingReception: GhRoute = new GhRoute('waiting-reception', ClientRoutes.clientOrder);
}
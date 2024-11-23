import { GhRoute } from "../misc/classes/route";

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
     * @description The waiting reception route
     * @type {GhRoute}
     */
    static readonly waitingReception: GhRoute = new GhRoute('waiting-reception', ClientRoutes.clientOrder);

    /**
     * @description The reschedule order route
     * @type {GhRoute}
     */
    static readonly rescheduleOrder: GhRoute = new GhRoute('reschedule-order', ClientRoutes.clientOrder);

    /**
     * @description The item on delivery route
     * @type {GhRoute}
     */
    static readonly tracking: GhRoute = new GhRoute('order-tracking', ClientRoutes.clientOrder);

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
     * @description The alert list route
     * @type {GhRoute}
     */
    static readonly alertList: GhRoute = new GhRoute('alert-list', ClientRoutes.main);

    /**
     * @description The create alert route
     * @type {GhRoute}
     */
    static readonly createAlert: GhRoute = new GhRoute('create', ClientRoutes.alertList);

    /**
     * @description The edit alert route
     * @type {GhRoute}
     */
    static readonly editAlert: GhRoute = new GhRoute('edit', ClientRoutes.alertList);

    /**
     * @description The match alert route
     * @type {GhRoute}
     */
    static readonly alertMatch: GhRoute = new GhRoute('match', ClientRoutes.alertList);
}
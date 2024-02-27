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
     * @description The send report trip route
     * @type {GhRoute}
     */
    static readonly reportTrip: GhRoute = new GhRoute('report-trip', ClientRoutes.main);
}
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
     * @description The make request route
     * @type {GhRoute}
     */
    static readonly makeRequest: GhRoute = new GhRoute('make-request', ClientRoutes.main);
}
import { GhRoute } from "../misc/classes/route";

/**
 * @class PartnerRoutes
 * @description The routes for the partner module
 */
export class PartnerRoutes {
    /**
     * @description The route to enter the partner module
     * @type {GhRoute}
     */
    static readonly partner: GhRoute = new GhRoute('partner');

    /**
     * @description The log in route
     * @type {GhRoute}
     */
    static readonly login: GhRoute = new GhRoute('login', PartnerRoutes.partner);

    /**
     * @description The main page route
     * @type {GhRoute}
     */
    static readonly main: GhRoute = new GhRoute('app', PartnerRoutes.partner);

    /**
     * @description The register item route
     * @type {GhRoute}
     */
    static readonly registerItem: GhRoute = new GhRoute('register-item', PartnerRoutes.main);
}
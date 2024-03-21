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

    /**
     * @description The view for receiving item route
     * @type {GhRoute}
     */
    static readonly registerItemView: GhRoute = new GhRoute('register-item-view', PartnerRoutes.registerItem);

    /**
     * @description The edit page for receiving item route
     * @type {GhRoute}
     */
    static readonly registerItemEdit: GhRoute = new GhRoute('register-item-edit', PartnerRoutes.registerItemView);

    /**
     * @description The billing route
     * @type {GhRoute}
     */
    static readonly billing: GhRoute = new GhRoute('billing', PartnerRoutes.main);

    /**
     * @description The view for the billing route
     * @type {GhRoute}
     */
    static readonly billingView: GhRoute = new GhRoute('billing-view', PartnerRoutes.billing);

    /**
     * @description The route for the GP pick up
     * @type {GhRoute}
     */
    static readonly gpPickUp: GhRoute = new GhRoute('gp-pick-up', PartnerRoutes.main);

    /**
     * @description The view for the GP pick up
     * @type {GhRoute}
     */
    static readonly gpPickUpView: GhRoute = new GhRoute('gp-pick-up-view', PartnerRoutes.gpPickUp);
}
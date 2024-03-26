import { ClientRoutes } from "./client/client.route";
import { GhRoute } from "./misc/classes/route";

/**
 * @class GlobalRoutes
 * @description The routes for the global module
 */
export class GlobalRoutes {
    /**
     * @description The email activation route
     * @type {GhRoute}
     */
    static readonly emailActivation = new GhRoute('email-activation/:id');

    /**
     * @description The reset password route
     * @type {GhRoute}
     */
    static readonly resetPassword = new GhRoute('reset-password/:id');

    /**
     * @description The not found route
     * @type {GhRoute}
     */
    static readonly notFound = new GhRoute('not-found');
}
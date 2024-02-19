import { GhRoute } from "./misc/classes/route";

/**
 * @class GlobalRoutes
 * @description The routes for the global module
 */
export class GlobalRoutes {
    /**
     * @description The email activation route
     */
    static readonly emailActivation = new GhRoute('email-activation/:id');

    /**
     * @description The forgot password route
     */
    static readonly forgotPassword = new GhRoute('forgot-password');

    /**
     * @description The reset password route
     */
    static readonly resetPassword = new GhRoute('reset-password/:id');
}
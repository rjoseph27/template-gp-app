/**
 * @class GhRoute
 * @description Represents a route in the application
 */
export class GhRoute {
    /**
     * @description The current params of the route
     * @type {any}
     */
    currentParams: any;

    /**
     * @constructor
     * @param segment The name of the segment
     * @param parentRoute The parent route. If not provided, the route is a root route
     */
    constructor(public segment: string, public parentRoute: GhRoute = undefined) {}

    /**
     * Returns the string representation of the route
     * @returns {string} The string representation of the route
     */
    toString() {
        return this.segment;
    }

    /**
     * @description Returns the full path of the route
     * @returns {string} The full path of the route
     */
    fullPath(): string {
        if (this.parentRoute) {
            return this.parentRoute.fullPath() + '/' + this.segment;
        } else {
            return this.segment;
        }
    }
}
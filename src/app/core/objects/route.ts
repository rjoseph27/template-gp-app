/**
 * @class GhRoute
 * @description Represents a route in the application
 */
export class GhRoute {    
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
}
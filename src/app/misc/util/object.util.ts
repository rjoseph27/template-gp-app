/**
 * @class ObjectUtil
 * @description A class that contains utility functions for object manipulation
 */
export class ObjectUtil {
    /**
     * @description A function that deep copies an object
     * @param obj The object to copy
     * @returns The copied object
     */
    static deepCopy(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
    
        let copy: any;
        if (Array.isArray(obj)) {
            copy = [];
            obj.forEach((item, index) => {
                copy[index] = ObjectUtil.deepCopy(item);
            });
        } else {
            copy = {};
            Object.keys(obj).forEach(key => {
                copy[key] = ObjectUtil.deepCopy(obj[key]);
            });
        }
        return copy;
    }
}
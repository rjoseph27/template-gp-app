/**
 * @class ArrayUtil
 * @description Utility class for the array
 */
export class ArrayUtil {
    /**
     * @description Determines if two arrays are equal
     * @param arr1 The first array
     * @param arr2 The second array
     * @returns {boolean} True if the arrays are equal, false otherwise
     */
    static arraysAreEqual(arr1: any[], arr2: any[]): boolean {
        // If the arrays have different lengths, they can't be equal
        if (arr1.length !== arr2.length) {
          return false;
        }
      
        // Iterate over the arrays and compare corresponding elements
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            // If any pair of corresponding elements are different, the arrays are not equal
            return false;
          }
        }
      
        // If all corresponding elements are equal, the arrays are equal
        return true;
      }
}
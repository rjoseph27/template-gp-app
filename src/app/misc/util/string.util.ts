/**
 * @class StringUtil
 * @description A class that contains utility functions for string manipulation
 */
export class StringUtil {
    /**
     * @description A function that seperate a keyword from a text
     * @param text the text to seperate
     * @param highlight The keyword to highlight
     * @returns An array of strings that contains the text and the keyword
     */
    static highlightText(text: string, highlight: string): string[] {
        const index = text.indexOf(highlight);
        const array = text.split(highlight).filter((value) => value !== '');
        
        if(index === 0) {
            array.unshift(highlight)
        } else if (index === text.length - highlight.length) {
            array.push(highlight)
        } else {
            array.splice(1,0,highlight)
        }

        return array;
    }
}
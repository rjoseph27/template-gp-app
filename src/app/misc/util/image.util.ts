import { SERVER_URL } from "../../api/base.service.api";

/**
 * @constant
 * @description The item information image folder
 */
export const ITEM_INFORMATION_IMAGE_FOLDER = 'item-images';

/**
 * @class ImageUtil
 * @description The image util
 */
export class ImageUtil {
    /**
     * @description Gets the image link
     * @param folder The folder of the image
     * @param image The file name of the image
     * @returns {string} The image link
     */
    static getImageLink(folder: string, image: string): string {
        return `${SERVER_URL}/${folder}/${image}`;
    }
}
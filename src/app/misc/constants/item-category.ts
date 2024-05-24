import { ItemCategory } from "../enums/item-category.enum";
import { EnumUtil } from "../util/enum.util";

/**
 * @interface
 * @description The item category interface
 */
interface ItemCategoryInterface {
    prefix: string;
    name: string;
}

/**
 * @constant
 * @description The prefix for the non-classified item category.
 */
export const NON_CLASSIFIED_ITEM_CATEGORY: ItemCategoryInterface = {
    prefix: '0',
    name: 'Other'
};

/**
 * @constant
 * @description The prefix for the electronic item category.
 * @type {ItemCategory}
 */
export const ELECTRONICAL_ITEM_CATEGORY: ItemCategoryInterface = {
    prefix: '1',
    name: 'Electronics'
};

/**
 * @constant
 * @description The prefix for the document item category.
 * @type {ItemCategory}
 */
export const DOCUMENT_ITEM_CATEGORY: ItemCategoryInterface = {
    prefix: '2',
    name: 'Documents'
};

/**
 * @constant
 * @description The prefix for the fashion item category.
 * @type {ItemCategory}
 */
export const BEAUTY_ITEM_CATEGORY: ItemCategoryInterface = {
    prefix: '3',
    name: 'Beauty'
};

/**
 * @constant
 * @description The prefix for the health item category.
 */
export const HEALTH_ITEM_CATEGORY: ItemCategoryInterface = {
    prefix: '4',
    name: 'health'
};

/**
 * @constant
 * @description The list of all the item categories
 */
export const LIST_ITEM_CATEGORY: ItemCategoryInterface[] = [
    NON_CLASSIFIED_ITEM_CATEGORY, 
    ELECTRONICAL_ITEM_CATEGORY, 
    DOCUMENT_ITEM_CATEGORY, 
    BEAUTY_ITEM_CATEGORY,
    HEALTH_ITEM_CATEGORY
]; 

/**
 * @constant
 * @description The select options for the item category
 */
export const LIST_ITEM_CATEGORY_OPTION = LIST_ITEM_CATEGORY.map(category => {
    return {
      label: category.name,
      options: Object.values(ItemCategory)
      .filter(x => x[0] === category.prefix)
      .map((key: string) => (
        {
            label: "enums.ItemCategory."+EnumUtil.getKeyByValue(ItemCategory, key), 
            value: key
        }))
    }
  })
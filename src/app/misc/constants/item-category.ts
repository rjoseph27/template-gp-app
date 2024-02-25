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
 * @description The list of all the item categories
 */
export const LIST_ITEM_CATEGORY: ItemCategoryInterface[] = [
    NON_CLASSIFIED_ITEM_CATEGORY, 
    ELECTRONICAL_ITEM_CATEGORY, 
    DOCUMENT_ITEM_CATEGORY, 
    BEAUTY_ITEM_CATEGORY
]; 
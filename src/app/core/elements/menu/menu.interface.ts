import { Observable } from "rxjs";

/**
 * @interface MenuItem
 * @description Represents the structure of a menu item.
 */
export interface MenuItem {
    /**
     * @description The caption of the menu item.
     * @type {Observable<string>}
     */
    caption$: Observable<string>;

    /**
     * The action to execute when the menu item is clicked.
     * @returns {void}
     */
    action: () => void;
}
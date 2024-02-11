import { ButtonLoadingDirective } from "../../misc/directive/button-loading.directive";
import { ButtonLoadingComponent } from "./button-loading/button-loading.component";
import { GhIconComponent } from "./icon/icon.component";
import { GhDateFieldComponent } from "./input/date-field/date-field.component";
import { GhPasswordFieldComponent } from "./input/password-field/password-field.component";
import { GhSelectFieldComponent } from "./input/select-field/select-field.component";
import { GhTextFieldComponent } from "./input/text-field/text-field.component";
import { GhMenuComponent } from "./menu/menu.component";
import { GhTitleComponent } from "./title/title.component";

/**
 * @constant
 * @type {any[]}
 * @description The list of elements components.
 */
export const ELEMENTS_COMPONENTS = [
    GhIconComponent, 
    GhMenuComponent, 
    GhTitleComponent, 
    GhTextFieldComponent,
    GhPasswordFieldComponent,
    ButtonLoadingComponent,
    ButtonLoadingDirective,
    GhDateFieldComponent,
    GhSelectFieldComponent
]
import { ButtonLoadingDirective } from "../../misc/directive/button-loading.directive";
import { ButtonLoadingComponent } from "./button-loading/button-loading.component";
import { GhIconComponent } from "./icon/icon.component";
import { GhCheckboxComponent } from "./input/checkbox/checkbox.component";
import { GhDateFieldComponent } from "./input/date-field/date-field.component";
import { GhSelectFieldComponent } from "./input/select-field/select-field.component";
import { GhPasswordFieldComponent } from "./input/password-field/password-field.component";
import { GhPhoneFieldComponent } from "./input/phone-field/phone-field.component";
import { GhTextFieldComponent } from "./input/text-field/text-field.component";
import { GhToggleComponent } from "./input/toggle/toggle.component";
import { GhUploadImageComponent } from "./input/upload-image/upload-image.component";
import { GhMenuComponent } from "./menu/menu.component";
import { GhTitleComponent } from "./title/title.component";
import { GhNumberFieldComponent } from "./input/number-field/number-field.component";
import { GhTextAreaComponent } from "./input/text-area/text-area.component";
import { GhhelpComponent } from "./help/help.component";

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
    GhSelectFieldComponent,
    GhPhoneFieldComponent,
    GhCheckboxComponent,
    GhToggleComponent,
    GhUploadImageComponent,
    GhNumberFieldComponent,
    GhTextAreaComponent,
    GhhelpComponent
]
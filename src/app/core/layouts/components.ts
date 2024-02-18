import { GhHeaderComponent } from "./header/header.component";
import { GhLoginComponent } from "./authentication/log-in/log-in.component";
import { GhSignUpComponent } from "./authentication/sign-up/sign-up.component";
import { GhTermsAndConditionsComponent } from "./authentication/sign-up/terms-and-conditions/terms-and-conditions.component";
import { GhEmailActivationComponent } from "./authentication/email-activation/email-activation.component";
import { GhMessageComponent } from "./message/message.component";
import { GhLoaderComponent } from "./loader/loader.component";

/**
 * @constant
 * @type {any[]}
 * @description The list of layouts components.
 */
export const LAYOUTS_COMPONENTS = [
    GhHeaderComponent, 
    GhLoginComponent, 
    GhSignUpComponent, 
    GhTermsAndConditionsComponent,
    GhEmailActivationComponent,
    GhMessageComponent,
    GhLoaderComponent
]
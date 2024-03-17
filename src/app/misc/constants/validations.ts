// The list of all the validations used in the application

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field is a valid email.
 */
export const EMAIL_VALIDATION = 'email';

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field is defined.
 */
export const REQUIRED_VALIDATION = 'required';

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field don't exceed a certain amount.
 */
export const MAX_VALIDATION = 'max';

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field don't go below a certain amount.
 */
export const MIN_VALIDATION = 'min';

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field don't exceed a certain length.
 */
export const MAX_LENGTH_VALIDATION = 'maxlength';

/**
 * @constant
 * @type {string}
 * @description The name of the validation that ensure that the field respect a certain pattern.
 */
export const PATTERN_VALIDATION = 'pattern';

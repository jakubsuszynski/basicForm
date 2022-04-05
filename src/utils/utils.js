import {STATIC_TEXTS} from "../resources/staticTexts";

export const PASSWORD_INPUT_ID = "passwordInput";
export const TEXT_INPUT_ID = "textInput";
export const LONG_TEXT_INPUT_ID = "longTextInput";

const VALIDATIONS = [
    {key: PASSWORD_INPUT_ID, regex: /^(?!\s*$).+/, message: STATIC_TEXTS.PASSWORD_CANT_BE_EMPTY},
    {
        key: PASSWORD_INPUT_ID,
        regex: /[a-zA-Z0-9_.-]{10,}$/,
        message: STATIC_TEXTS.PASSWORD_REQUIREMENTS
    },
    {key: TEXT_INPUT_ID, regex: /^(?!\s*$).+/, message: STATIC_TEXTS.TEXT_CANT_BE_EMPTY},
    {key: LONG_TEXT_INPUT_ID, regex: /^(?!\s*$).+/, message: STATIC_TEXTS.LONG_TEXT_CANT_BE_EMPTY},
]

export const validate = (fieldKey, value) => VALIDATIONS.find(validation => validation.key === fieldKey && !value.match(validation.regex));
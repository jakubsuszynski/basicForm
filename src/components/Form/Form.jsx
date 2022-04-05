import React, {useCallback, useState} from "react";
import {STATIC_TEXTS} from "../../resources/staticTexts";
import {LONG_TEXT_INPUT_ID, PASSWORD_INPUT_ID, TEXT_INPUT_ID, validate} from "../../utils/utils";
import {submitForm} from "../../utils/api";
import {Toast, ROLES} from "../Toast/Toast";
import {SubmitButton} from "../SubmitButton/SubmitButton";
import {LabelledInput} from "../LabelledInput/LabelledInput";

const INITIAL_STATE = {[PASSWORD_INPUT_ID]: "", [TEXT_INPUT_ID]: "", [LONG_TEXT_INPUT_ID]: ""};

const FIELDS = [
    {
        fieldName: TEXT_INPUT_ID, label: STATIC_TEXTS.TEXT_LABEL, type: "text"
    },
    {
        fieldName: PASSWORD_INPUT_ID, label: STATIC_TEXTS.PASSWORD_LABEL, type: "password"
    },
    {
        fieldName: LONG_TEXT_INPUT_ID, label: STATIC_TEXTS.LONG_TEXT_LABEL, type: "textarea", maxLength: 120
    }
];

export const Form = () => {
    const [data, setData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        setMessage(undefined);

        const submitErrors = Object.keys(data).map(key => validate(key, data[key])).filter(error => !!error);
        if (!submitErrors?.length) {
            setLoading(true);
            setErrors([]);

            await submitForm(data, () => {
                setMessage({message: STATIC_TEXTS.SUCCESS, role: ROLES.SUCCESS});
                setData(INITIAL_STATE);
            }, (error) => {
                setMessage({message: STATIC_TEXTS.ERROR(error.response.status), role: ROLES.ERROR});
            })

            setLoading(false);
        } else {
            setErrors(submitErrors);
        }
    }, [data]);

    const validateSingleField = useCallback((event) => {
        const {name, value} = event.target;
        const error = validate(name, value);
        setErrors(errors => {
            const filteredErrors = errors?.filter(error => error.key !== name);
            error && filteredErrors.push(error);
            return filteredErrors;
        });
    }, []);

    const handleChange = useCallback((event) => {
        if (event.target.maxLength === -1 || !event.target.maxLength || event.target.value?.length <= event.target.maxLength) {
            setData(state => ({...state, [event.target.name]: event.target.value}));
        }
        setErrors(errors => errors.filter(error => error.key !== event.target.name));
    }, []);

    const getError = useCallback((fieldName) => errors?.find(error => error.key === fieldName)?.message, [errors])

    return <div className={"col-12 col-lg-6"}>
        <div className={"row"}>
            <h1>{STATIC_TEXTS.BASIC_FORM}</h1>
        </div>
        <form className={"row g-3"} onSubmit={handleSubmit}>
            {FIELDS.map(field => <LabelledInput
                    label={field.label}
                    value={data[field.fieldName]}
                    fieldName={field.fieldName}
                    maxLength={field.maxLength}
                    error={getError(field.fieldName)}
                    type={field.type}
                    onChange={handleChange}
                    onBlur={validateSingleField}/>)
            }
            <SubmitButton disabled={errors?.length} loading={loading}/>
        </form>
        {message && <Toast {...message} onClose={() => setMessage(undefined)}/>}
    </div>;
};
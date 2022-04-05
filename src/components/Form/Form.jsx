import React, {useCallback, useState} from "react";
import {STATIC_TEXTS} from "../../resources/staticTexts";
import {LONG_TEXT_INPUT_ID, PASSWORD_INPUT_ID, TEXT_INPUT_ID, validate} from "../../utils/utils";
import {submitForm} from "../../utils/api";
import {FloatingToast, ROLES} from "../FloatingToast/FloatingToast";

const INITIAL_STATE = {[PASSWORD_INPUT_ID]: "", [TEXT_INPUT_ID]: "", [LONG_TEXT_INPUT_ID]: ""};
const LONG_TEXT_MAX_LENGTH = 120;

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
        const fieldKey = event.target.name;
        const value = event.target.value;
        const error = validate(fieldKey, value);
        setErrors(errors => {
            const filteredErrors = errors?.filter(fieldKey => errors.key !== fieldKey);
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

    return <div className={"col-lg-6"}>
        <div className={"row"}>
            <h1>{STATIC_TEXTS.BASIC_FORM}</h1>
        </div>
        <form className={"row g-3"} onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor={TEXT_INPUT_ID}
                    className={"form-label"}>
                    {STATIC_TEXTS.TEXT_LABEL}
                </label>
                <input
                    value={data[TEXT_INPUT_ID]}
                    onChange={handleChange}
                    onBlur={validateSingleField}
                    type={"text"}
                    name={TEXT_INPUT_ID}
                    className={`form-control ${getError(TEXT_INPUT_ID) && "is-invalid"}`}
                    id={TEXT_INPUT_ID}
                />
                <div className={"invalid-feedback"}>{getError(TEXT_INPUT_ID)}</div>
            </div>
            <div>
                <label
                    htmlFor={PASSWORD_INPUT_ID}
                    className={"form-label"}>
                    {STATIC_TEXTS.PASSWORD_LABEL}
                </label>
                <input
                    value={data[PASSWORD_INPUT_ID]}
                    onChange={handleChange}
                    type={"password"}
                    onBlur={validateSingleField}
                    name={PASSWORD_INPUT_ID}
                    className={`form-control ${getError(PASSWORD_INPUT_ID) && "is-invalid"}`}
                    id={PASSWORD_INPUT_ID}
                />
                <div className={"invalid-feedback"}>{getError(PASSWORD_INPUT_ID)}</div>
            </div>
            <div>
                <div className={"d-flex justify-content-between"}>
                    <label htmlFor={LONG_TEXT_INPUT_ID}
                           className={"form-label"}>{STATIC_TEXTS.LONG_TEXT_LABEL}</label>
                    <div>{data[LONG_TEXT_INPUT_ID]?.length}/{LONG_TEXT_MAX_LENGTH}</div>
                </div>
                <textarea
                    value={data[LONG_TEXT_INPUT_ID]}
                    onChange={handleChange}
                    onBlur={validateSingleField}
                    className={`form-control ${getError(LONG_TEXT_INPUT_ID) && "is-invalid"}`}
                    name={LONG_TEXT_INPUT_ID}
                    maxLength={LONG_TEXT_MAX_LENGTH}
                    id={LONG_TEXT_INPUT_ID}
                />
                <div className={"invalid-feedback"}>
                    {getError(LONG_TEXT_INPUT_ID)}
                </div>
            </div>
            <div>
                <button
                    disabled={errors?.length}
                    type={"submit"}
                    className={"btn btn-primary col-12 col-md-4"}>
                    {loading ?
                        <>
                            <span className={"spinner-border spinner-border-sm me-2"} role={"status"}
                                  aria-hidden={"true"}/>
                            <span className={""}>{STATIC_TEXTS.LOADING}</span>
                        </> : STATIC_TEXTS.SUBMIT_LABEL
                    }
                </button>
            </div>
        </form>
        {message && <FloatingToast {...message} onClose={() => setMessage(undefined)}/>}
    </div>;
};
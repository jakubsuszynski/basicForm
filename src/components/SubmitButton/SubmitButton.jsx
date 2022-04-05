import {STATIC_TEXTS} from "../../resources/staticTexts";
import React from "react";

export const SubmitButton = ({disabled, loading}) => <div>
    <button
        disabled={disabled}
        type={"submit"}
        className={"btn btn-primary col-12 col-md-4"}>
        {loading ?
            <>
                <span className={"spinner-border spinner-border-sm me-2"} role={"status"} aria-hidden={"true"}/>
                <span className={""}>{STATIC_TEXTS.LOADING}</span>
            </> : STATIC_TEXTS.SUBMIT_LABEL
        }
    </button>
</div>;
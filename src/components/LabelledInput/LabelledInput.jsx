import React from "react";

export const LabelledInput = ({value, fieldName, onChange, onBlur, error, label, type, maxLength}) => {
    const commonProps = {
        value,
        onChange,
        onBlur,
        maxLength,
        name: fieldName,
        className: `form-control ${error && "is-invalid"}`,
        id: fieldName
    }

    return <div>
        <div className={"d-flex justify-content-between"}>
            <label
                htmlFor={fieldName}
                className={"form-label"}>
                {label}
            </label>
            {maxLength && <div>{value?.length}/{maxLength}</div>}
        </div>
        {type === "textarea" ? <textarea {...commonProps}/> :
            <input
                {...commonProps}
                type={type}
            />}
        <div className={"invalid-feedback"}>{error}</div>
    </div>;
};
import React from "react";

export const ROLES = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}

export const FloatingToast = ({message, role, onClose}) => {
    let roleClass = "";
    if (role === ROLES.SUCCESS) {
        roleClass = "alert-success";
    } else if (role === ROLES.ERROR) {
        roleClass = "alert-danger";
    }
    return <div className={"container d-flex justify-content-center fixed-bottom"}>
        <div className={`col-md-6 alert ${roleClass} d-flex justify-content-between`} role={"alert"}>
            {message}
            <button type={"button"} className={"btn-close"} aria-label={"Close"} onClick={onClose}/>
        </div>
    </div>
}
import axios from "axios";

export const URL = "https://basicForm.com";
export const REPO_URL = "https://github.com/jakubsuszynski/basicForm";

export const submitForm = async (data, successCallback, errorCallback) => {
    const config = {
        data,
        baseURL: URL,
        url: "form",
        method: "POST"
    }
    try {
        const result = await axios(config);
        successCallback(result);
    } catch (e) {
        errorCallback(e);
    }
}
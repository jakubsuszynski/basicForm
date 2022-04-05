import MockAdapter from "axios-mock-adapter";
import {URL} from "./api";
import axios from "axios";

const mockSubmit = (mock) => {
    const formRegexp = new RegExp(`^${URL}/form`);
    mock.onPost(formRegexp).reply(config => {
        const data = JSON.parse(config.data);
        if (data.textInput === "ERROR") {
            return [400];
        }
        return [200];
    });
};

export const mockRequests = () => {
    const mock = new MockAdapter(axios, {onNoMatch: "passthrough", delayResponse: 1000});
    mockSubmit(mock);
};
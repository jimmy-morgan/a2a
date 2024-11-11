import axios from "axios";

const API_URL = 'http://localhost:8085';
const API_KEY = 'A2nvo03Bssdf';
let sid = localStorage.getItem("sid");

export default {
    setSid(new_sid: string) {
        sid = new_sid;
    },
    async get(endpoint: string) {
        const response = await axios({
            url: API_URL + "/api/" + endpoint,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "sid": sid,
                "api-key": API_KEY,
            },
        });
        return response.data;
    },
    async post(endpoint: string, data: object = {}) {
        const response = await axios({
            url: API_URL + "/api/" + endpoint,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "sid": sid,
                "api-key": API_KEY,
            },
            data: data,
        });
        return response.data;
    },
    async put(endpoint: string, data: object = {}) {
        const response = await axios({
            url: API_URL + "/api/" + endpoint,
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "sid": sid,
                "api-key": API_KEY,
            },
            data: data,
        });
        return response.data;
    },
    async delete(endpoint: string, data: object = {}) {
        const response = await axios({
            url: API_URL + "/api/" + endpoint,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "sid": sid,
                "api-key": API_KEY,
            },
            data: data,
        });
        return response.data;
    },
};

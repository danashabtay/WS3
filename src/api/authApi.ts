import { APIStatus } from "../types";
import axios from "axios";

interface Credentials {
    username: string;
    password: string;
}

const BASE_URL = "https://pws-workshop3-n6dc.onrender.com"

export const AuthApi = {
    login: async ({ username, password }: Credentials): Promise<APIStatus> => {
        try {
            // TODO: make a request to the server to login
            await axios.post(`${BASE_URL}/api/login`, { username, password }, { withCredentials: true });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    signUp: async ({ username, password }: Credentials): Promise<APIStatus> => {
        try {
            // TODO: make a request to the server to sign up
            await axios.post(`${BASE_URL}/api/signup`, { username, password });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    logout: async (): Promise<APIStatus> => {
        try {
            // TODO: make a request to the server to logout
            await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    getUserName: async (): Promise<string | APIStatus> => {
        try {
            // TODO: make a request to the server to get the username
            // return the username
            const res = await axios.get(`${BASE_URL}/api/username`, { withCredentials: true });
            console.log(res.data);
            return res.data.username;
        } catch (e) {
            return handleError(e);
        }
    },
};

const handleError = async (e: unknown): Promise<APIStatus> => {
    // TODO: handle errors here, check status code and return the appropriate APIStatus
    if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        console.log(e.response);
        if (status == 400) {
            return APIStatus.BadRequest;
        }
        if (status == 401) {
            return APIStatus.Unauthorized;
        }
        return APIStatus.ServerError;
    }
    return APIStatus.ServerError;
};
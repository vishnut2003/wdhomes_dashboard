import { AxiosError } from "axios";

export function handleCatchBlock (err: any) {
    if (typeof err === "string") {
        return err;
    } else if (err instanceof Error) {
        return err.message;
    } else if (err instanceof AxiosError) {
        if (err.response?.data) {
            return err.response.data;
        } else {
            return err.message;
        }
    } else {
        return "Something went wrong!";
    }
}
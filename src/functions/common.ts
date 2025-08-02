import { AxiosError } from "axios";

export function handleCatchBlock(err: any): string {
    if (typeof err === "string") {
        return err;
    } else if (err instanceof AxiosError) {
        if (err.response?.data) {
            return err.response.data;
        } else {
            return err.message;
        }
    } else if (err instanceof Error) {
        return err.message;
    } else {
        return "Something went wrong!";
    }
}

export function generateRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
}

export function hexToRgb(hex: string) {
    // Remove "#" if present
    hex = hex.replace(/^#/, '');

    // Expand short form like "#03F" to "#0033FF"
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(hex, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b }; // returns an object
}

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

export async function bufferToFile({
    buffer,
    fileName,
    type,
}: {
    buffer: Buffer,
    fileName: string,
    type: string,
}) {
    return new Promise<File>((resolve, reject) => {
        try {
            const file = new File([buffer], fileName, {
                type,
            });

            return resolve(file);

        } catch (err) {
            return reject(err);
        }
    })
}

export function base64ToFile(data: string, name: string, type: string) {
    const byteArray = Uint8Array.from(atob(data), c => c.charCodeAt(0));
    const file = new File([byteArray], name, { type });
    return file;
}
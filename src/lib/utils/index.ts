export function formatVNCurrency(amount: number | string) {
    if (amount === undefined || amount === null) {
        return null;
    }

    const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(numericAmount);
}

export function generateOrderId(): string {
    const prefix = "ORDER";
    const datePart = new Date().getTime().toString();
    const maxRandomLength = 20 - prefix.length - datePart.length;
    const randomPart = Math.random()
        .toString(36)
        .substring(2, 2 + maxRandomLength);
    return `${prefix}${datePart}${randomPart}`;
}

export async function fetchData(url: string) {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return await response.json();
}

export function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    const formattedTime = `${dateTime.getHours()}:${dateTime.getMinutes().toString().padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

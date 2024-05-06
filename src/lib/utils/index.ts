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
    const hours = dateTime.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${dateTime.getMinutes().toString().padStart(2, "0")} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
}

export function getCurrentDateTimeString(): string {
    // Create a new Date object
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const date = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Format the date string
    const formattedDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    return formattedDate; // Output: YYYY-MM-DD HH:mm:ss
}

export function formatTimeToAmPm(timeString: string): string {
    if (!timeString) return "";
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const ampm = hours >= 12 ? "PM" : "AM";
    // Convert 24-hour time to 12-hour format
    const formattedHours = hours % 12 || 12;
    // Return the formatted time string
    return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

export function getOrderStatusColor(status: string) {
    let color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

    switch (status) {
        case "Hoàn thành":
            color = "success";
            break;
        case "Đang chờ":
            color = "default";
            break;
        case "Đang xử lý":
            color = "secondary";
            break;
        case "Đang giao":
            color = "warning";
            break;
        case "Đã hủy":
            color = "danger";
            break;

        default:
            break;
    }
    return color;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

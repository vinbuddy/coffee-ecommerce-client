export function formatVNCurrency(amount: number | string) {
    if (amount === undefined || amount === null) {
        return null;
    }

    const numericAmount =
        typeof amount === "string" ? parseFloat(amount) : amount;

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(numericAmount);
}

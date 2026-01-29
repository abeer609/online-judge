export function encodeBase64(input: string): string {
    const binary = encodeURIComponent(input).replace(
        /%([0-9A-F]{2})/g,
        (_, p) => String.fromCharCode(parseInt(p, 16)),
    );
    return btoa(binary);
}

export function decodeBase64(base64: string): string {
    const binary = atob(base64);
    const percentEncoded = Array.prototype.map
        .call(
            binary,
            (c: string) =>
                "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
        )
        .join("");
    return decodeURIComponent(percentEncoded);
}

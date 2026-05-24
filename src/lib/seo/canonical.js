
const SITE_URL = "https://torqueblock.com";

function normalizePath(path = "") {
    if (!path) return "/";

    const cleaned = path.startsWith("/") ? path : `/${path}`;

    if (cleaned.length > 1 && cleaned.endsWith("/")) {
        return cleaned.slice(0, -1);
    }

    return cleaned;
}

export function buildCanonical(path = "") {
    const normalizedPath = normalizePath(path);
    return `${SITE_URL}${normalizedPath}`;
}

export function removeQueryParams(url = "") {
    return url.split("?")[0];
}

export function removeHash(url = "") {
    return url.split("#")[0];
}


export function sanitizeCanonical(url = "") {
    return removeHash( removeQueryParams(url) );
}
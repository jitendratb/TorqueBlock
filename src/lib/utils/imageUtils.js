/**
 * Safely extracts a single image URL string from any input (string, object, etc.).
 * Returns a valid string or empty string.
 */
export function normalizeImageString(img) {
    if (!img) return '';
    if (typeof img === 'string') return img.trim();
    if (typeof img === 'object' && img !== null) {
        const url = img.url || img.path || img.src || img.secure_url || img.image || img.heroImage || '';
        return typeof url === 'string' ? url.trim() : '';
    }
    return '';
}

/**
 * Converts gallery, productImage, productImages, images, etc. into an array of string URLs like ["url1", "url2"].
 */
export function normalizeImageArray(data) {
    if (!data) return [];
    let list = [];
    if (Array.isArray(data)) {
        list = data;
    } else if (typeof data === 'string') {
        const trimmed = data.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) list = parsed;
                else list = [trimmed];
            } catch {
                list = [trimmed];
            }
        } else if (trimmed.includes(',')) {
            list = trimmed.split(',');
        } else {
            list = [trimmed];
        }
    } else if (typeof data === 'object' && data !== null) {
        const url = normalizeImageString(data);
        if (url) list = [url];
    }

    return list
        .map(item => normalizeImageString(item))
        .filter(url => typeof url === 'string' && url.length > 0);
}

/**
 * Ensures product object's image fields (productImages, gallery, productImage) are converted into arrays of string URLs.
 */
export function normalizeProductImageFields(product) {
    if (!product || typeof product !== 'object') return product;

    const productImages = normalizeImageArray(product.productImages);
    const gallery = normalizeImageArray(product.gallery);
    const productImage = normalizeImageArray(product.productImage);

    const fallbackList = productImages.length > 0 ? productImages 
        : (gallery.length > 0 ? gallery 
        : (productImage.length > 0 ? productImage : []));

    return {
        ...product,
        productImages: productImages.length > 0 ? productImages : fallbackList,
        gallery: gallery.length > 0 ? gallery : fallbackList,
        productImage: productImage.length > 0 ? productImage : fallbackList,
    };
}

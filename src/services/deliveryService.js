const SESSION_KEY = 'tb_user_city';
const PINCODE_KEY = 'tb_delivery_pincode';
const IP_LOOKUP_URL = 'https://ipwho.is/';
const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const PINCODE_LOOKUP_URL = 'https://api.postalpincode.in/pincode/';
const REQUEST_TIMEOUT = 8000;
const FAST_CITIES = ['bengaluru', 'bangalore', 'delhi'];
const FAST_PINCODE_PREFIXES = ['560', '110'];

const fullDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
const shortDate = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

const addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

const readStored = (storage, key) => {
    try {
        return JSON.parse(window[storage].getItem(key));
    } catch {
        return null;
    }
};

const writeStored = (storage, key, value) => {
    try {
        window[storage].setItem(key, JSON.stringify(value));
    } catch { }
};

const fetchJson = async (url) => {
    const res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
};

class DeliveryService {
    async getPermissionState() {
        try {
            return (await navigator.permissions.query({ name: 'geolocation' })).state;
        } catch {
            return null;
        }
    }

    getBrowserPosition() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) return resolve(null);
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => resolve(coords),
                () => resolve(null),
                { timeout: 10000, maximumAge: 30 * 60 * 1000 }
            );
        });
    }

    async getGpsLocation() {
        const coords = await this.getBrowserPosition();
        if (!coords) return null;
        try {
            const data = await fetchJson(`${REVERSE_GEOCODE_URL}?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`);
            const city = data?.city || data?.locality;
            if (!city) return null;
            return { city, region: data.principalSubdivision || null, pincode: data.postcode || null, source: 'gps' };
        } catch (err) {
            console.error("Reverse geocode error:", err);
            return null;
        }
    }

    async getIpLocation() {
        try {
            const data = await fetchJson(IP_LOOKUP_URL);
            if (data?.success === false || !data?.city) return null;
            return { city: data.city, region: data.region || null, pincode: null, source: 'ip' };
        } catch (err) {
            console.error("IP location fetch error:", err);
            return null;
        }
    }

    // Calls onLocation once the location is known, and again if a better one arrives.
    // Order: pincode the user entered → this session's detected location → browser location → IP lookup.
    async detectLocation(onLocation) {
        const report = (location) => {
            // A pincode entered while detection was still running wins over the detected location
            if (!readStored('localStorage', PINCODE_KEY)) onLocation(location);
        };

        const known = readStored('localStorage', PINCODE_KEY) || readStored('sessionStorage', SESSION_KEY);
        if (known) return onLocation(known);

        // While the permission prompt is open, show the IP guess so the estimate isn't stuck on "checking"
        let hasGps = false;
        const ipLookup = (await this.getPermissionState()) === 'granted' ? null : this.getIpLocation();
        ipLookup?.then((location) => {
            if (!hasGps) report(location);
        });

        const gpsLocation = await this.getGpsLocation();
        hasGps = !!gpsLocation;
        const location = gpsLocation || await (ipLookup || this.getIpLocation());
        if (location) writeStored('sessionStorage', SESSION_KEY, location);
        report(location);
    }

    // Returns null when India Post has no record of the pincode
    async lookupPincode(pincode) {
        let location = { city: null, region: null, pincode, source: 'pincode' };
        try {
            const [data] = await fetchJson(`${PINCODE_LOOKUP_URL}${pincode}`);
            if (data?.Status !== 'Success') return null;
            const postOffice = data.PostOffice?.[0];
            location = { ...location, city: (postOffice?.District || postOffice?.Block)?.trim() || null, region: postOffice?.State || null };
        } catch (err) {
            // Lookup service is down: keep the pincode anyway, its prefix still decides fast delivery
            console.error("Pincode lookup error:", err);
        }
        writeStored('localStorage', PINCODE_KEY, location);
        return location;
    }

    getEstimate(location) {
        const place = `${location?.city || ''} ${location?.region || ''}`.toLowerCase();
        const pincode = location?.pincode || '';
        return {
            city: location?.city || null,
            pincode: location?.source === 'pincode' ? pincode : null,
            isFast: FAST_PINCODE_PREFIXES.some((prefix) => pincode.startsWith(prefix)) || FAST_CITIES.some((c) => place.includes(c)),
        };
    }

    getDateText(isFast) {
        return isFast ? fullDate.format(addDays(1)) : shortDate.formatRange(addDays(3), addDays(4));
    }
}

export const deliveryService = new DeliveryService();

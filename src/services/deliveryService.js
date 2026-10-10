const CACHE_KEY = 'tb_user_city';
const IP_LOOKUP_URL = 'https://ipwho.is/';
const FAST_CITIES = ['bengaluru', 'bangalore', 'delhi'];

const fullDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
const shortDate = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

const addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

class DeliveryService {
    async getUserCity() {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) return JSON.parse(cached);
        } catch { }

        try {
            const res = await fetch(IP_LOOKUP_URL);
            if (!res.ok) return null;
            const data = await res.json();
            if (data?.success === false || !data?.city) return null;
            const location = { city: data.city, region: data.region };
            try {
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(location));
            } catch { }
            return location;
        } catch (err) {
            console.error("IP location fetch error:", err);
            return null;
        }
    }

    getEstimate(location) {
        const place = `${location?.city || ''} ${location?.region || ''}`.toLowerCase();
        return {
            city: location?.city || null,
            isFast: FAST_CITIES.some((c) => place.includes(c)),
        };
    }

    getDateText(isFast) {
        return isFast ? fullDate.format(addDays(1)) : shortDate.formatRange(addDays(3), addDays(4));
    }

    async getDeliveryEstimate() {
        return this.getEstimate(await this.getUserCity());
    }
}

export const deliveryService = new DeliveryService();

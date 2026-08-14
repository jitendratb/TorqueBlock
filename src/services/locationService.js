import { City, State } from 'country-state-city';

class LocationService {
   
    static getStates() {
        const states = State.getStatesOfCountry('IN');
        return states.map(s => ({
            label: s.name,
            value: s.name,
            code: s.isoCode
        }));
    }

    static getStateByName(stateName) {
        if (!stateName) return null;
        const states = this.getStates();
        return states.find(s => s.value.toLowerCase() === stateName.toLowerCase()) || null;
    }


    static getStateByCode(stateCode) {
        if (!stateCode) return null;
        return State.getStateByCodeAndCountry(stateCode, 'IN') || null;
    }

  
    static getCities(stateName = null, searchTerm = '') {
        let cities = [];
        
        if (stateName) {
            const st = this.getStateByName(stateName);
            if (st) {
                cities = City.getCitiesOfState('IN', st.code);
            }
        } else {
            if (searchTerm && searchTerm.length > 1) {
                cities = City.getCitiesOfCountry('IN');
            } else {
                return []; 
            }
        }

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            cities = cities.filter(c => c.name.toLowerCase().includes(lowerSearch));
        }

        return cities.slice(0, 100).map(c => ({
            label: c.name,
            value: c.name,
            stateCode: c.stateCode
        }));
    }


    static getCityByName(cityName) {
        if (!cityName) return null;
        const allCities = City.getCitiesOfCountry('IN');
        return allCities.find(c => c.name.toLowerCase() === cityName.toLowerCase()) || null;
    }

 
    static async fetchByPincode(pincode) {
        if (!pincode || pincode.length !== 6) return null;
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await res.json();
            if (data && data[0]?.Status === 'Success') {
                const po = data[0].PostOffice[0];
                return {
                    city: po.District || po.Block || po.Region,
                    state: po.State
                };
            }
        } catch (err) {
            console.error("Pincode fetch error:", err);
        }
        return null;
    }


    static async fetchPincodeByCity(cityName) {
        if (!cityName) return null;
        try {
            const res = await fetch(`https://api.postalpincode.in/postoffice/${cityName}`);
            const data = await res.json();
            if (data && data[0]?.Status === 'Success') {
                const po = data[0].PostOffice[0];
                return { pincode: po.Pincode };
            }
        } catch (err) {
            console.error("City fetch error:", err);
        }
        return null;
    }
}

export default LocationService;

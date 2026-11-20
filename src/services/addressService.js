import TorqueBlockApi from '@/lib/api';

class AddressService {
    constructor() { }

    async getAddresses() {
        try {
            const response = await TorqueBlockApi.get('/address');
            return response; // response contains { success: true, data: [...] }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw error;
        }
    }

    async addAddress(addressData) {
        try {
            const response = await TorqueBlockApi.post('/address', addressData);
            return response;
        } catch (error) {
            console.error('Error adding address:', error);
            throw error;
        }
    }

    async updateAddress(addressData) {
        try {
            const response = await TorqueBlockApi.put('/address', addressData);
            return response;
        } catch (error) {
            console.error('Error updating address:', error);
            throw error;
        }
    }

    async deleteAddress(addressId) {
        try {
            const response = await TorqueBlockApi.delete('/address', {
                data: { addressId }
            });
            return response;
        } catch (error) {
            console.error('Error deleting address:', error);
            throw error;
        }
    }

    async makeAddressDefault(addressId) {
        try {
            const response = await TorqueBlockApi.post('/address/default', { addressId });
            return response;
        } catch (error) {
            console.error('Error making address default:', error);
            throw error;
        }
    }
}

const addressServiceInstance = new AddressService();
export default addressServiceInstance;

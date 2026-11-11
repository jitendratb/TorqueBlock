import { cache } from 'react';
import brandServiceInstance from './brandService';

export const getActiveBrands = cache(() => brandServiceInstance.getBrands({ isActive: true }));

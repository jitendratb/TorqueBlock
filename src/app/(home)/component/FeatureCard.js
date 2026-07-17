import React from 'react'
import tyresService from '@/services/tyresService'
import FeatureCardClient from './FeatureCardClient'

async function FeatureCard() {
    let initialTyres = [];
    let initialPagination = null;
    
    try {
        const response = await tyresService.getRecommandation({ limit: 16, page: 1 });
        if (response?.success) {
            initialTyres = response.data || [];
            initialPagination = response.pagination || { totalPages: 1, currentPage: 1 };
        }
    } catch (error) {
        console.error("SSR Fetching error for FeatureCard:", error);
    }

    return (
        <FeatureCardClient 
            initialTyres={initialTyres} 
            initialPagination={initialPagination} 
        />
    )
}

export default FeatureCard;
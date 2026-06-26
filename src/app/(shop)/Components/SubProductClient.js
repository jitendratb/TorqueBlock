import React from 'react'
import SubProductDetails from './SubProductDetails'
import SubProductDescription from './SubProductDescription'
import FAQSection from '@/components/atoms/FAQSection';
import TrustSection from './TyreComponent/TrustSection';
import FitmentSection from './TyreComponent/FitmentSection';

function SubProductClient({ product }) {
    return (
        <div className='space-y-4'>
            <SubProductDescription tyre={product} />
            <FitmentSection tyre={product} scale={false} />
            <TrustSection tyre={product} />
            <FAQSection faqs={product?.faqs} />
        </div>
    )
}

export default SubProductClient;
import React from 'react';
import TubeCard from './TubeCard';

export default function TubesList({ tubes = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tubes.map((tube, idx) => (
                <TubeCard key={tube._id || idx} tube={tube} />
            ))}
        </div>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import TyreCard from "@/app/(home)/component/Tyre/TyreCard";
import TorqueBlockApi from "@/lib/api";
import { TyreCardSkeletonGroup } from "@/app/(home)/component/Tyre/TyreCardSkeleton";

function Similar({ tyre }) {

    const [similarTyres, setSimilarTyres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSimilarTyres() {
            try {
                setLoading(true);
                const res = await TorqueBlockApi.get(`/intent/similar/${tyre?.identifier}`);
                setSimilarTyres(res?.tyres);
            } catch (error) {
                console.error("Failed to fetch similar tyres", error);
            } finally {
                setLoading(false);
            }
        }

        if (tyre?.identifier) {
            fetchSimilarTyres();
        }

    }, [tyre?.identifier]);


    if (!loading && !similarTyres?.length) {
        return null;
    }

    return (
        <section className="">
            <div className="space-y-4 py-4">

                <div className="space-y-3">
                    <p className="
                        uppercase
                        tracking-[0.3em]
                        text-orange-500
                        text-xs
                        md:text-sm
                        font-bold
                    ">
                        Explore More
                    </p>

                    <h2 className="
                    text-md
                        md:text-xl
                        md:text-3xl
                        font-black
                        text-white
                        tracking-tight
                    ">
                        Similar Adventure Touring Tyres
                    </h2>
                </div>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {loading ? (
                        <TyreCardSkeletonGroup count={4} />
                    ) : (
                        similarTyres?.map((item) => (
                            <TyreCard
                                key={item?._id}
                                tyre={item}
                            />
                        ))
                    )}
                </div>

            </div>

        </section>
    );
}

export default Similar;
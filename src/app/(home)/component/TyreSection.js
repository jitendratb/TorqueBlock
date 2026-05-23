"use client";

import React, { useEffect, useState } from "react";
import TyreCard from "./Tyre/TyreCard";
import { TyreCardSkeletonGroup } from "./Tyre/TyreCardSkeleton";
import TorqueBlockApi from "@/lib/api";
import Link from "next/link";


const TyreCategorySection = ({ title, highlight, description, data = [], isLoading = false }) => {
    return (
        <div className="relative flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between gap-6">
                <div className="flex flex-col justify-start">
                    <div className="w-auto">
                        <h2 className="text-lg lg:text-3xl lg:text-4xl font-extrabold text-white">
                            {title}
                        </h2>

                        <hr className="border-b-4 mt-1 md:mt-3  mb-0 md:mb-4 border-orange-500 w-[100px] lg:w-[250px] rounded-full" />
                    </div>

                    <p className="text-sm hidden md:block text-gray-400 max-w-3xl leading-relaxed">
                        <span className="font-semibold text-orange-500">
                            {highlight}
                        </span>{" "}
                        {description}
                    </p>
                </div>

   
                <div className="flex items-center">
                    <Link href={`/search?q=tyres`} className="text-xs md:text-sm font-semibold text-orange-500 border border-orange-500 px-4 md:px-6 py-2 md:py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 whitespace-nowrap">
                        View All
                    </Link>
                </div>
            </div>

            {/* Cards */}
            <div className="flex overflow-x-auto gap-6 px-2 scrollbar-hide py-2">
                {isLoading ? (
                    <TyreCardSkeletonGroup count={4} />
                ) : data?.length > 0 ? (
                    data.map((item) => (
                        <TyreCard key={item?._id} tyre={item} />
                    ))
                ) : (
                    <div className="w-full text-center py-12 text-gray-500 border-2  border-zinc-700 rounded-2xl h-[335px]">
                        No tyres found for this category.
                    </div>
                )}
            </div>
        </div>
    );
};

function TyreSection() {

    const [tyreData, setTyreData] = useState({
        limitedStock: [],
        highPerformance: [],
        touringAdventure: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    const categories = [
        {
            key: "limitedStock",
            category: "Limited Stock",
            title: "Limited Stock Essentials",
            highlight: "Limited Stock",
            description:
                "High-demand compounds with extremely low availability. Secure your fitment before the next restock cycle.",
        },
        {
            key: "highPerformance",
            category: "Popular High Performance",
            title: "Elite Performance Tyres",
            highlight: "Elite Performance",
            description:
                "The most sought-after rubber by track enthusiasts and canyon carvers. Maximum grip, zero compromises.",
        },
        {
            key: "touringAdventure",
            category: "Endurance & Adventure",
            title: "Endurance & Adventure Tyres",
            highlight: "Endurance & Adventure",
            description:
                "Engineered for the long haul. Unbreakable durability meets all-weather confidence for cross-country exploration.",
        },
    ];

    useEffect(() => {

        const fetchData = async () => {

            setIsLoading(true);
            try {

                const responses = await Promise.allSettled(
                    categories.map((item, index) =>
                        TorqueBlockApi.get("intent", {
                            params: {
                                page: index + 1,
                                limit: 16,
                            },
                        })
                    )
                );

                const updatedData = {};

                responses?.forEach((result, index) => {

                    const key = categories[index].key;

                    if (result.status === "fulfilled") {
                        updatedData[key] = result.value?.data || [];
                    } else {
                        console.error(
                            `Failed to fetch ${key}:`,
                            result.reason
                        );
                        updatedData[key] = [];
                    }
                });

                setTyreData(updatedData);

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="space-y-6">

            { 
            categories.map((section) => (
                <TyreCategorySection
                    key={section.key}
                    title={section.title}
                    highlight={section.highlight}
                    description={section.description}
                    data={tyreData[section.key]}
                    isLoading={isLoading}
                />
            ))}

        </div>
    );
}

export default TyreSection;
"use client";

import { memo, useMemo } from "react";
import Carousel from "@/components/organisms/Carousel";
import BikeCard from "../BikeCard";

const CompatibleBikes = memo(function CompatibleBikes({ tyre }) {
   
    return (
            <Carousel
                items={tyre?.compatibleVehicles}
                itemWidth="w-full md:w-[320px] gap-4"
                renderItem={(bike, index) => {
                     
                    return(
                    <BikeCard key={bike._id } brand={bike} index={index} className="w-full" />
                )}}
            />
    );
});

export default CompatibleBikes;

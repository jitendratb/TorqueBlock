"use client";

import React, { useEffect, useState } from "react";
import TyreSection from "@/app/(shop)/Components/NewLaunchTyres";

function Similar({ tyre }) {

    return (
        <section className="relative">
          <TyreSection
                    categoryId={tyre?.categoryId?._id}
                    Similar={tyre?.relatedProducts}
                    title={`Alternatives to ${tyre?.productName || "This Tyre"}`}
                    subtitle="Compare similar tyres before you choose"
                 
                />
        </section>
    );
}

export default Similar;
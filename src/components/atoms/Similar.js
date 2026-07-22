"use client";

import React, { useEffect, useState } from "react";
import TyreSection from "@/app/(shop)/Components/NewLaunchTyres";

function Similar({ tyre }) {

    return (
        <section className="relative">
          <TyreSection
                    categoryId={tyre?.categoryId?._id}
                    title="Similar Tyres"
                    subtitle="Similar tyres you might like"
                 
                />
        </section>
    );
}

export default Similar;
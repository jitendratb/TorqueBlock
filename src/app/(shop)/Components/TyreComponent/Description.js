import React from 'react'

function Description({ tyre }) {
    return (
        <div className="space-y-4">
            <div className='space-y-2'>
                <p className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                    Description
                </p>
                <p className="max-w-3xl text-xs md:text-base text-zinc-400">
                    {tyre?.hero?.subtitle}
                </p>
            </div>
            <section className="border-t border-white/10  mt-4">
                <div className="">
                    <div className="space-y-2 py-4">
                        <h2 className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500 ">
                            Commonly Available Sizes
                        </h2>

                        <div className="space-y-4">
                            {tyre?.frontSizes?.length > 0 && (
                                <div className="flex flex-wrap items-center ">
                                    <span className="text-orange-500 font-bold text-sm pb-2 md:pt-0 md:text-xl min-w-[80px]">
                                        Front:
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {tyre?.frontSizes?.map((size) => (
                                            <button
                                                key={size}
                                                className="px-2 md:px-3 py-1 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rear Sizes */}
                            {tyre?.rearSizes?.length > 0 && (
                                <div className="flex flex-wrap items-center">

                                    <span className="text-orange-500 font-bold text-sm pb-2 md:pt-0 md:text-xl min-w-[80px]">
                                        Rear:
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {tyre?.rearSizes?.map((size) => (
                                            <button
                                                key={size}
                                                className="px-2 md:px-3 py-1 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-zinc-400 italic text-[8px] md:text-xs">
                            Sizes vary by batch and bike compatibility. Availability is confirmed on WhatsApp.
                        </p>
                    </div>

                    <div className="border-t border-white/10 "></div>
                    <div className="py-4">
                        <p className="text-sm md:text-lg font-semibold uppercase tracking-[0.25em] text-orange-500">
                            Commonly Used On
                        </p>

                        <div className="space-y-2">
                            <p className="text-xs md:text-md text-zinc-200 leading-relaxed">
                                {tyre?.commonlyUsedOn} from brands like
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {tyre?.commonlyUsedBikesWithId?.map((brand) => (
                                    <div
                                        key={brand?._id}
                                        className="px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 bg-zinc-900 text-xs md:text-sm text-white font-semibold hover:border-orange-500 hover:bg-zinc-800 transition-all duration-300"
                                    >
                                        {brand?.brandName}
                                    </div>
                                ))}
                            </div>

                            <p className="text-zinc-400 italic text-[8px] md:text-xs">
                                Final fitment depends on model year and tyre size. Confirmed on WhatsApp.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Description
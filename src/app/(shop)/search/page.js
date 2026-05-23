'use client';
import React, { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Checkbox from '@/components/atoms/Checkbox';
import CustomDropdown from '@/components/atoms/CustomDropdown';
import searchServiceInstance from '@/services/searchService';


const Card = ({ item }) => {
    const router = useRouter();
    switch (item.type) {
        case 'Tyre': {
            const rating = (Math.random() * 0.5 + 4.5).toFixed(1);
            return (
                <article onClick={() => router.push(`/tyres/${item.identifier}`)} className="grid cursor-pointer grid-cols-1 md:grid-cols-[40%_60%] md:h-[220px] rounded-xl border border-zinc-800 overflow-hidden cursor-pointer">
                    <div className="relative h-[160px] md:h-full w-full overflow-hidden bg-zinc-950 ">
                        <Image
                            src={item.hero?.heroImage || '/placeholder-tyre.jpg'}
                            alt={item.productName || item.hero?.title || "Motorcycle Tyre"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-4  left-4   rounded-full border border-orange-500/30 bg-orange-500/30 px-3 py-1 text-xs uppercase  text-orange-500 backdrop-blur-md font-semibold">
                            Tyre
                        </div>
                        <div className="absolute right-4 top-4 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-white">
                            In stock
                        </div>
                    </div>
                    <div className="p-2 md:p-4 flex flex-col justify-between">
                        <div className='space-y-1 md:space-y-2'>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/brands/${item.brand?.identifier}`);
                                        }} 
                                        className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-orange-400/80 border  border-transparent hover:border hover:border-orange-500/20 hover:scale-110 rounded-xl transition-all duration-300 px-2 py-1 hover:text-white cursor-pointer hover:bg-orange-500/10 hover:border-orange-500/50 transition-colors"
                                    >
                                        {item.brand?.name || 'Brand'}
                                    </button>
                                    <h3 className="text-lg  lg:text-2xl font-semibold text-white">{item.productName || item.hero?.title}</h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 text-[10px]  lg:text-sm text-zinc-400">
                                <span className="rounded-full bg-zinc-950 px-3 py-2 truncate max-w-[250px]">
                                    {item.commonlyUsedOn || 'Motorcycle'}
                                </span>


                                {item.rearSizes?.length > 0 && (
                                    <span className="rounded-full bg-zinc-950 px-3 py-2">
                                        Rear:{' '}
                                        {item.rearSizes.slice(0, 1).join(', ')}
                                        {item.rearSizes.length > 1 && (
                                            <span className="ml-1 text-zinc-500">
                                                +{item.rearSizes.length - 1} more
                                            </span>
                                        )}
                                    </span>
                                )}

                            </div>
                            <p className="text-[10px]  md:text-xs lg:text-sm leading-6 text-zinc-400 line-clamp-2">{item.hero?.subtitle || 'Premium tyre for optimal performance.'}</p>
                        </div>
                        <div className="flex items-center justify-end ">
                            <WhatsAppButton value={`I'm interested in ${item.productName || item.hero?.title}. Please share availability and compatible options.`} text='Get Details' className="max-w-[150px]" />
                        </div>
                    </div>
                </article>
            );
        }
        case 'Comparison': {
            const view = Math.floor(Math.random() * 10000) + 100;
            const rating = (Math.random() * 0.5 + 4.5).toFixed(1);
            return (
                <div onClick={() => { router.push(`/compare/${item.identifier}`) }} className="overflow-hidden cursor-pointer grid grid-cols-1 md:grid-cols-[40%_60%] md:h-[220px] rounded-xl border border-zinc-800 bg-zinc-900/95 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900">
                    <div className="relative grid h-[220px] md:h-full grid-cols-2 overflow-hidden">
                        <div className="relative">
                            <Image
                                src={item.tyre1?.image || '/placeholder.png'}
                                alt={item.tyre1?.productName || 'Tyre 1'}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative">
                            <Image
                                src={item.tyre2?.image || '/placeholder.png'}
                                alt={item.tyre2?.productName || 'Tyre 2'}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 backdrop-blur-md">
                            <span className="text-lg font-bold uppercase tracking-wider text-white">
                                VS
                            </span>
                        </div>

                        <div className="absolute bottom-4 left-4   rounded-full border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-200 backdrop-blur-md">
                            Comparison
                        </div>


                        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur-md">
                            {item.category || 'Tyre Comparison'}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 p-4">
                        <div className='space-y-2'>
                            <h3 className="text-lg lg:text-2xl md:line-clamp-1 font-semibold leading-snug text-white">
                                {item.tyre1?.productName}{" "}
                                <span className="text-zinc-500">vs</span>{" "}
                                {item.tyre2?.productName}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-[10px] md:text-xs lg:text-sm text-zinc-400">
                                <span className="rounded-full bg-zinc-950 px-3 py-2">{view}+ views</span>
                                <span className="rounded-full bg-zinc-950 px-3 py-2  text-yellow-400">⭐ {rating}</span>
                            </div>

                            <p className="line-clamp-2 text-[10px] lg:text-sm text-zinc-400">
                                {item?.seo?.description ||
                                    'Compare performance, grip, mileage and riding comfort.'}
                            </p>

                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-end">
                           

                            <WhatsAppButton
                                value={`I'm interested in ${item.tyre1?.productName} vs ${item.tyre2?.productName}. Please share pricing, availability and best compatible options.`}
                                text="Get Details"
                                className="max-w-[160px]"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        case 'Bike': {
            const rating = (Math.random() * 0.5 + 4.5).toFixed(1);
            return (
                <article onClick={() => { router.push(`/bikes/${item.identifier}`) }} className="grid cursor-pointer grid-cols-1 md:grid-cols-[40%_60%] md:h-[220px] rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="relative h-[220px] md:h-full overflow-hidden bg-zinc-950">
                        <Image
                            src={item.image || '/placeholder-bike.jpg'}
                            alt={item.bikeBrand && item.bikeModel ? `${item.bikeBrand} ${item.bikeModel}` : "Motorcycle"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover transition duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4   rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 md:text-xs uppercase  text-white-600 backdrop-blur-md">
                            Bike
                        </div>
                        <div className="absolute right-4 top-4 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-white">
                            Compatible
                        </div>
                    </div>
                    <div className="p-4 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-blue-400/80">{item.bikeBrand}</p>
                                <h3 className="text-lg lg:text-2xl font-semibold text-white">{item.bikeModel}</h3>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] lg:text-sm text-zinc-400">
                            <span className="rounded-full bg-zinc-950 px-3 py-2">Motorcycle</span>
                            <span className="rounded-full bg-zinc-950 px-3 py-2">Compatible Tyres</span>
                            <span className="rounded-full bg-zinc-950 px-3 py-2  text-yellow-400">⭐ {rating}</span>
                        </div>
                        <p className="text-[10px] lg:text-sm leading-6 text-zinc-400 line-clamp-2">{item.subTitle || 'Find the best tyres for this motorcycle.'}</p>
                        <div className="flex items-center justify-end">
                            <WhatsAppButton value={`I'm looking for tyres for ${item.bikeBrand} ${item.bikeModel}. Please share compatible options.`} text='Get Details' className="max-w-[150px]" />
                        </div>
                    </div>
                </article>
            )
        }
        default:
            return (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-4">
                    <h3 className="text-lg font-semibold text-white">{item.title || item.productName || 'Unknown Item'}</h3>
                    <p className="text-sm text-zinc-400 mt-2">{item.description || item.subTitle || 'No description available'}</p>
                </div>
            );
    }
};

const SearchResultSkeleton = () => (
    <article className="grid animate-pulse grid-cols-1 md:grid-cols-[40%_60%] md:h-[220px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="relative h-[220px] md:h-full overflow-hidden bg-zinc-900">
            <div className="absolute left-4 top-4 h-7 w-20 rounded-full bg-zinc-800" />
            <div className="absolute right-4 top-4 h-7 w-24 rounded-full bg-zinc-800" />
        </div>

        <div className="space-y-4 p-4">
            <div className="space-y-3">
                <div className="h-3 w-24 rounded-full bg-zinc-800" />
                <div className="h-8 w-3/4 rounded-full bg-zinc-800" />
            </div>

            <div className="flex flex-wrap gap-2">
                <div className="h-9 w-20 rounded-full bg-zinc-900" />
                <div className="h-9 w-28 rounded-full bg-zinc-900" />
                <div className="h-9 w-16 rounded-full bg-zinc-900" />
            </div>

            <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-zinc-800" />
                <div className="h-4 w-11/12 rounded-full bg-zinc-800" />
                <div className="h-4 w-8/12 rounded-full bg-zinc-800" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="h-4 w-32 rounded-full bg-zinc-800" />
                <div className="h-11 w-[150px] rounded-xl bg-zinc-800" />
            </div>
        </div>
    </article>
);

function SearchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('q') || '';
    const searchQuery = useMemo(() => queryParam, [queryParam]);
    const [sortBy, setSortBy] = useState('relevance');
    const [filters, setFilters] = useState({ brand: [], type: [], rating: 0, });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [resultCounts, setResultCounts] = useState({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
    const [filtersModal, setFiltersModal] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                setTotalResults(0);
                setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const results = await searchServiceInstance.search(searchQuery, { limit: 10, page: currentPage, category: filters.type.length > 0 ? filters.type.join(',') : undefined, brand: filters.brand.length > 0 ? filters.brand.join(',') : undefined, sorted: sortBy, rating: filters.rating > 0 ? filters.rating : undefined });


                if (results && results.results) {
                    const flattenedResults = [];
                    const counts = { tyreIntent: 0, vehicleIntent: 0, comparison: 0 };

                    if (results.results.tyreIntent?.data) {
                        const tyresWithType = results.results.tyreIntent.data.map(item => ({ ...item, type: 'Tyre' }));
                        flattenedResults.push(...tyresWithType);
                        counts.tyreIntent = results.results.tyreIntent.count || results.results.tyreIntent.data.length;
                    }

                    if (results.results.comparison?.data) {
                        const comparisonsWithType = results.results.comparison.data.map(item => ({ ...item, type: 'Comparison' }));
                        flattenedResults.push(...comparisonsWithType);
                        counts.comparison = results.results.comparison.count || results.results.comparison.data.length;
                    }

                    if (results.results.vehicleIntent?.data) {
                        const bikesWithType = results.results.vehicleIntent.data.map(item => ({ ...item, type: 'Bike' }));
                        flattenedResults.push(...bikesWithType);
                        counts.vehicleIntent = results.results.vehicleIntent.count || results.results.vehicleIntent.data.length;
                    }


                    setSearchResults(flattenedResults);
                    setTotalResults(flattenedResults.length);
                    setResultCounts(counts);
                } else {
                    setSearchResults([]);
                    setTotalResults(0);
                    setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                }
            } catch (err) {
                setError('Failed to load search results');
                setSearchResults([]);
                setTotalResults(0);
                setResultCounts({ tyreIntent: 0, vehicleIntent: 0, comparison: 0 });
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(performSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery, filters, sortBy, currentPage]);

    const brands = ['Pirelli', 'Michelin', 'Metzeler',];
    const types = ['Sports', 'Touring', 'Cruiser', 'Off-road',];

    const toggleFilter = useCallback((filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter((item) => item !== value)
                : [...prev[filterType], value],
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ brand: [], type: [], rating: 0, });
    }, []);

    const breadcrumbItems = [
        {
            label: queryParam ? `Results for "${queryParam}"` : 'Results',
            href: '/search',
            isLast: true,
        },
    ];

    return (
        <div className="flex flex-col flex-1 min-h-0 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr] relative flex flex-col flex-1 min-h-0 overflow-hidden">
                <aside className="hidden lg:block lg:sticky top-0 self-start mb-4 max-h-[calc(91vh-5rem)] overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className=" text-xl font-semibold text-white">Filters</h2>
                        </div>
                        {filters && (filters.brand.length > 0 || filters.type.length > 0 || filters.rating > 0) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-sm text-zinc-400 transition hover:text-white"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="space-y-4 overflow-y-auto h-full flex-1 ">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Brands</h3>
                            <div className="mt-3 grid gap-2 border border-zinc-800 rounded-xl p-2 bg-zinc-900/95">
                                {brands.map((brand) => (
                                    <label key={brand} className="inline-flex items-center gap-3 rounded-lg  border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <Checkbox
                                            checked={filters.brand.includes(brand)}
                                            onChange={() => toggleFilter("brand", brand)}
                                        />
                                        <span>{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white">Type</h3>
                            <div className="mt-3 grid gap-2 border border-zinc-800 rounded-xl p-2 bg-zinc-900/95">
                                {types.map((type) => (
                                    <label key={type} className="inline-flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <Checkbox
                                            checked={filters.type.includes(type)}
                                            onChange={() => toggleFilter("type", type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-white">Minimum rating</h3>
                                {filters?.rating > 0 && (<span className="text-sm text-zinc-400">{filters.rating}+</span>)}
                            </div>
                            <div className="mt-3 grid gap-2 border border-zinc-800 rounded-xl p-2 bg-zinc-900/95">
                                {[0, 4, 4.5].map((rating) => (
                                    <label key={rating} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-white">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={rating}
                                            checked={filters.rating === rating}
                                            onChange={() => setFilters((prev) => ({ ...prev, rating }))}
                                            className="h-4 w-4 cursor-pointer border border-zinc-800 bg-transparent text-black accent-white focus:ring-0 focus:ring-offset-0 " />
                                        <span>{rating === 0 ? 'All ratings' : `${rating}+ stars`}</span>
                                    </label>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </aside>
                <div className='relative flex flex-col flex-1 max-h-[calc(93vh-5rem)] md:max-h-[calc(90vh-5rem)] lg:max-h-[calc(91vh-5rem)]'>
                    <div className="flex items-center justify-between mb-4">
                        <div className='hidden lg:block '>
                            <p className=" text-lg font-semibold text-white w-full">
                                {loading ? 'Searching...' : `${totalResults} Results${searchQuery ? ` for "${searchQuery}"` : ''}`}
                            </p>
                        </div>

                        <button onClick={() => setFiltersModal(true)} className="lg:hidden px-6 rounded-lg py-1 font-bold text-sm bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-95 transition-all">
                            Filter
                        </button>
                        {filtersModal && (
                            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-bold text-white">Filters</h2>
                                        </div>
                                        <button onClick={() => setFiltersModal(false)} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scroll">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Brands</h3>
                                                <span className="text-[10px] text-zinc-600 font-medium">{brands.length} Available</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {brands.map((brand) => (
                                                    <label key={brand} className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${filters.brand.includes(brand) ? 'border-orange-500 bg-orange-500/5 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <Checkbox
                                                            checked={filters.brand.includes(brand)}
                                                            onChange={() => toggleFilter("brand", brand)}
                                                            className={filters.brand.includes(brand) ? 'bg-orange-500 border-orange-500' : ''}
                                                        />
                                                        <span className="text-sm font-medium">{brand}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Type</h3>
                                                <span className="text-[10px] text-zinc-600 font-medium">{types.length} Available</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {types.map((type) => (
                                                    <label key={type} className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${filters.type.includes(type) ? 'border-orange-500 bg-orange-500/5 text-white' : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700'}`}>
                                                        <Checkbox
                                                            checked={filters.type.includes(type)}
                                                            onChange={() => toggleFilter("type", type)}
                                                            className={filters.type.includes(type) ? 'bg-orange-500 border-orange-500' : ''}
                                                        />
                                                        <span className="text-sm font-medium">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-5 border-t border-zinc-800 bg-zinc-900/50 flex gap-3">
                                        <button
                                            onClick={clearFilters}
                                            className="flex-1 py-3 px-4 rounded-xl border border-zinc-800 text-zinc-400 font-semibold text-sm hover:bg-zinc-800 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setFiltersModal(false)}
                                            className="flex-[2] py-3 px-4 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="flex items-center gap-1 lg:gap-2">
                            <span className="text-xs lg:text-sm text-zinc-400 min-w-[3rem] md:min-w-[3.25rem]">Sort by:</span>
                            <CustomDropdown searchable={false} placeholder="Sort By"
                                options={[
                                    { label: 'Relevance', value: 'relevance' },
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Oldest', value: 'oldest' },
                                ]}
                                value={sortBy} onChange={(option) => setSortBy(option.value)} buttonClassName="text-xs lg:text-sm h-6 md:h-8"
                            />
                        </div>
                    </div>

                    <main className="space-y-4  overflow-y-auto custom-scroll  flex flex-col flex-1 max-h-[calc(93vh-5rem)]">
                        {loading ? (
                            <div className="grid gap-4 grid-cols-1">
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                            </div>
                        ) : error ? (
                            <div className="rounded-xl border border-red-800 bg-red-900/20 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-red-300">Search Error</p>
                                <h3 className="mt-3 text-2xl font-semibold">{error}</h3>
                                <p className="mt-2 text-sm text-zinc-400">Please try again or contact support if the problem persists.</p>
                                <div className='flex gap-4 '>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-4 inline-flex items-center justify-center w-full py-3 w-[120px] rounded-xl bg-red-500 py-1 text-sm font-semibold text-white hover:bg-red-400 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-in-out"
                                    >
                                        Retry
                                    </button>
                                    <WhatsAppButton value={`I'm experiencing an issue with the search functionality. Please assist.`} text='Contact Support' className="w-[150px] mt-4" />
                                </div>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="grid gap-4 grid-cols-1 mr-1">
                                {searchResults.map((item, index) => (
                                    <div key={item.id || index}>
                                        <Card item={item} />
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery && !loading && !error ? (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-orange-300">No matches found</p>
                                <h3 className="mt-3 text-2xl font-semibold">Try another query or loosen filters</h3>
                                <p className="mt-2 text-sm text-zinc-400">We couldn&apos;t find tyres matching your current selection.</p>
                                <div className='flex items-center justify-center gap-4 w-full mx-auto max-w-lg pt-4'>
                                    <button
                                        onClick={clearFilters}
                                        className=" inline-flex items-center justify-center w-full py-3 w-[120px] rounded-xl bg-orange-500 py-1 text-sm font-semibold text-white hover:bg-orange-400 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-in-out"
                                    >
                                        Reset filters
                                    </button>
                                    <WhatsAppButton value={`I'm searching for tyres for bike ${searchQuery}. Please check availability and share compatible options.`} text='Ask about this product' />
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-12 text-center text-white shadow-lg shadow-black/20">
                                <p className="text-sm text-orange-300">Start your search</p>
                                <h3 className="mt-3 text-2xl font-semibold">Enter a search term to find tyres</h3>
                                <p className="mt-2 text-sm text-zinc-400">Use the search bar above to find tyres, bikes, or comparisons.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col flex-1 min-h-0 space-y-4">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-zinc-400">Loading search...</p>
                    </div>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}

export default SearchPage;
import Breadcrumb from '@/components/atoms/BreadCrumb';
import compareServiceInstance from '@/services/compareService';
import Image from 'next/image';
import { FiZap, FiCheck, FiArrowRight } from 'react-icons/fi';
import WhatsAppButton from '@/components/atoms/WhatsAppButton';
import Link from 'next/link';
import BikeCard from '../../Components/BikeCard';
import FitmentGalleryClient from '../../Components/FitmentGalleryClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parts = slug.split('-vs-');
  const t1 = parts[0]?.replace(/-/g, ' ') || 'Tyre 1';
  const t2 = parts[1]?.replace(/-/g, ' ') || 'Tyre 2';
  return {
    title: `${t1} vs ${t2} — Torque Block`,
    description: `Full head-to-head comparison: ${t1} vs ${t2}. Specs, ratings, and expert verdict.`,
  };
}

const RATING_LABELS = {
  dry_grip: 'Dry Grip',
  wet_grip: 'Wet Grip',
  mileage: 'Mileage',
  sport_handling: 'Sport Handling',
  touring_comfort: 'Touring Comfort',
  high_speed_stability: 'High Speed Stability',
  cornering_confidence: 'Cornering Confidence',
  warm_up_performance: 'Warm-up Performance',
  track_capability: 'Track Capability',
  adventure_capability: 'Adventure Capability',
  all_weather_reliability: 'All-Weather Reliability',
};

export default async function CompareDetails({ params }) {
  const { slug } = await params;

  let data = null;
  try {
    const response = await compareServiceInstance.getByIdCompare(slug);
    data = response?.comparisonConnectorModelData?.[0]
  } catch (e) {
    console.error('Compare details fetch error:', e);
  }

  const parts = (slug || '').split('-vs-');

  const tyre1 = data?.tyre1 || {};
  const tyre2 = data?.tyre2 || {};
  const tyre1Name = tyre1?.productName || parts[0]?.replace(/-/g, ' ') || 'Tyre 1';
  const tyre2Name = tyre2?.productName || parts[1]?.replace(/-/g, ' ') || 'Tyre 2';
  const tyre1Image = tyre1?.productImages?.[0] || null;
  const tyre2Image = tyre2?.productImages?.[0] || null;
  const tyre1Gallery = tyre1?.gallery || [];
  const tyre2Gallery = tyre2?.gallery || [];
  const tyre1Ratings = tyre1?.ratings || {};
  const tyre2Ratings = tyre2?.ratings || {};
  const compatibleBikes = data?.compatibleBikes || [];
  const category = data?.category || '';
  const seo = data?.seo || {};

  const breadcrumbItems = [
    { label: 'Compare', href: '/compare' },
    { label: `${tyre1Name} vs ${tyre2Name}`, isLast: true },
  ];

  const waMessage = `I just compared ${tyre1Name} vs ${tyre2Name} and need expert advice to choose the perfect tyre for my machine.`;

  console.log(data)

  return (
    <div className="space-y-4 mb-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent" />
          <div className="w-1/2 h-full bg-gradient-to-bl from-white/20 via-white/5 to-transparent" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-white/10 pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center gap-2 pt-8 pb-2 px-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-full w-fit">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
              {category || 'Head-to-Head Battle'}
            </span>
          </div>
          <h1 className="w-full flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none mt-1">
            <span className="flex-1 text-right text-orange-500">{tyre1Name}</span>
            <span className="text-zinc-600 mx-4 md:mx-6 italic text-xl md:text-4xl shrink-0">vs</span>
            <span className="flex-1 text-left text-white">{tyre2Name}</span>
          </h1>
          {seo?.description && (
            <p className="text-zinc-500 text-[10px] md:text-xs text-center max-w-2xl leading-relaxed mt-1 px-4">
              {seo.description}
            </p>
          )}
        </div>


        <div className="relative z-20 flex items-end justify-between px-4 md:px-16 gap-4 md:mt-6">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full min-w-[100px] max-w-[200px] aspect-square mx-auto drop-shadow-2xl">
              {tyre1Image ? (
                <Image src={tyre1Image} alt={tyre1Name} fill className="object-contain" />
              ) : (
                <div className="w-full h-full bg-zinc-800/60 rounded-2xl flex items-center justify-center">
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-orange-400/20 mb-3">Alpha</span>
          </div>

          <div className="flex flex-col items-center shrink-0 mb-12">
            <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-white/40 blur-md" />
              <span className="text-white text-xs md:text-base font-black italic relative z-10">VS</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full min-w-[100px] max-w-[200px] aspect-square mx-auto drop-shadow-2xl">
              {tyre2Image ? (
                <Image src={tyre2Image} alt={tyre2Name} fill className="object-contain" />
              ) : (
                <div className="w-full h-full bg-zinc-800/60 rounded-2xl flex items-center justify-center">
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-white bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20 mb-3">Beta</span>
          </div>
        </div>
      </div>

      {(tyre1?.description || tyre2?.description) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ tyre: tyre1, name: tyre1Name, color: 'orange' }, { tyre: tyre2, name: tyre2Name, color: 'white' }].map(({ tyre, name, color }) => (
            tyre?.description ? (
              <div key={name} className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${color === 'orange' ? 'border-orange-500/20' : 'border-white/20'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${color === 'orange' ? 'text-orange-400' : 'text-white'}`}>{name}</p>
                <p className="text-zinc-300 text-sm leading-relaxed">{tyre.description}</p>
              </div>
            ) : null
          ))}
        </div>
      )}

      {(Object.keys(tyre1Ratings).length > 0 || Object.keys(tyre2Ratings).length > 0) && (
        <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_1fr] bg-zinc-950/80 border-b border-white/10 px-4 md:px-6 py-3 gap-4">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Performance Metric</div>
            <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest text-center w-12 md:w-auto">{tyre1Name}</div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest text-center w-12 md:w-auto">{tyre2Name}</div>
          </div>

          {Object.keys(RATING_LABELS).map((key, i) => {
            const v1 = tyre1Ratings[key] ?? null;
            const v2 = tyre2Ratings[key] ?? null;
            if (v1 === null && v2 === null) return null;

            const maxVal = 5;
            const pct1 = ((v1 || 0) / maxVal) * 100;
            const pct2 = ((v2 || 0) / maxVal) * 100;
            const v1Wins = v1 !== null && v2 !== null && v1 > v2;
            const v2Wins = v1 !== null && v2 !== null && v2 > v1;

            return (
              <div key={key} className={`px-4 md:px-6 py-3 border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-zinc-900/30'}`}>
                <div className="grid grid-cols-[3fr_auto_auto] md:grid-cols-[2fr_1fr_1fr] items-center gap-4">
                  <div>
                    <p className="text-[11px] md:text-xs font-bold text-zinc-300 mb-1.5">{RATING_LABELS[key]}</p>
                    <div className="flex gap-1.5 items-center">
                      {/* Orange bar (left, RTL fill) */}
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                        <div
                          className={`h-full rounded-full ${v1Wins ? 'bg-orange-500' : 'bg-orange-500/40'}`}
                          style={{ width: `${pct1}%` }}
                        />
                      </div>
                      <div className="w-px h-3 bg-white/20 shrink-0" />
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${v2Wins ? 'bg-white' : 'bg-white/40'}`}
                          style={{ width: `${pct2}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs md:text-sm font-black text-center w-12 md:w-auto ${v1Wins ? 'text-orange-400' : 'text-zinc-400'}`}>
                    {v1 !== null ? v1 : '—'}
                    {v1Wins && <span className="text-[8px] ml-1">▲</span>}
                  </div>
                  <div className={`text-xs md:text-sm font-black text-center w-12 md:w-auto ${v2Wins ? 'text-white' : 'text-zinc-400'}`}>
                    {v2 !== null ? v2 : '—'}
                    {v2Wins && <span className="text-[8px] ml-1">▲</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {((tyre1?.frontSizes?.length > 0 || tyre1?.rearSizes?.length > 0) || (tyre2?.frontSizes?.length > 0 || tyre2?.rearSizes?.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ tyre: tyre1, name: tyre1Name, color: 'orange' }, { tyre: tyre2, name: tyre2Name, color: 'white' }].map(({ tyre, name, color }) => (

            <div key={name} className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${color === 'orange' ? 'border-orange-500/20' : 'border-white/20'} flex flex-col justify-between`}>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${color === 'orange' ? 'text-orange-400' : 'text-white'}`}>{name} — Available Sizes</p>
                {tyre?.frontSizes?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Front</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tyre.frontSizes.map(s => (
                        <span key={s} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${color === 'orange' ? 'text-orange-300 bg-orange-500/10 border-orange-500/20' : 'text-white bg-white/10 border-white/20'}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {tyre?.rearSizes?.length > 0 && (
                  <div>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Rear</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tyre.rearSizes.map(s => (
                        <span key={s} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${color === 'orange' ? 'text-orange-300 bg-orange-500/10 border-orange-500/20' : 'text-white bg-white/10 border-white/20'}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className='pt-4'>
                <WhatsAppButton
                  text="Secure My Fitment Size"
                  value={`I was checking the ${name} tyre sizes and I'm interested in buying it for my bike. Can you help me with availability, pricing, and fitment for my motorcycle?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {(tyre1?.choose_if?.length > 0 || tyre2?.choose_if?.length > 0) && (
        <div className="rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-2 bg-zinc-950/80 border-b border-white/10">
            <div className="py-3 px-5 text-[10px] font-black text-orange-400 uppercase tracking-widest border-r border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              Choose {tyre1Name.split(' ').slice(-2).join(' ')} If
            </div>
            <div className="py-3 px-5 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Choose {tyre2Name.split(' ').slice(-2).join(' ')} If
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="p-5 space-y-2.5">
              {(tyre1?.choose_if || []).map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheck className="text-orange-400 shrink-0 mt-0.5" size={13} />
                  <p className="text-zinc-300 text-xs leading-snug">{item}</p>
                </div>
              ))}
            </div>
            <div className="p-5 space-y-2.5">
              {(tyre2?.choose_if || []).map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheck className="text-white shrink-0 mt-0.5" size={13} />
                  <p className="text-zinc-300 text-xs leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(tyre1?.best_use_case?.length > 0 || tyre2?.best_use_case?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ tyre: tyre1, name: tyre1Name, color: 'orange' }, { tyre: tyre2, name: tyre2Name, color: 'white' }].map(({ tyre, name, color }) => (
            tyre?.best_use_case?.length > 0 ? (
              <div key={name} className={`rounded-xl md:rounded-2xl border bg-zinc-900/60 backdrop-blur-xl p-5 ${color === 'orange' ? 'border-orange-500/20' : 'border-white/20'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${color === 'orange' ? 'text-orange-400' : 'text-white-400'}`}>{name} — Best For</p>
                <div className="flex flex-wrap gap-2">
                  {tyre.best_use_case.map(u => (
                    <span key={u} className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${color === 'orange' ? 'bg-orange-500/15 text-orange-300 border border-orange-500/25' : 'bg-white/15 text-white-300 border border-white/25'}`}>{u}</span>
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WhatsAppButton
          text={`Get ${tyre1Name} Deal`}
          value={`Hi Torque Block! I was comparing tyres and I'm interested in getting the best deal on the ${tyre1Name} tyre. Can you assist me with stock, price, and fitment?`}
        />

        <WhatsAppButton
          text={`Get ${tyre2Name} Deal`}
          value={`Hi Torque Block! I was comparing tyres and I'm interested in getting the best deal on the ${tyre2Name} tyre. Can you assist me with stock, price, and fitment?`}
        />
      </div>



      {(tyre1Gallery.length > 0 || tyre2Gallery.length > 0) && (
        <FitmentGalleryClient
          tyre1Gallery={tyre1Gallery}
          tyre2Gallery={tyre2Gallery}
          tyre1Name={tyre1Name}
          tyre2Name={tyre2Name}
        />
      )}

      {compatibleBikes.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FiZap className="text-orange-400" size={16} />
            <h2 className="text-lg font-black text-white uppercase tracking-widest">Compatible Bikes</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto w-full scroll-smooth">
            {compatibleBikes.map((bike, index) => (
              <BikeCard key={bike?._id} brand={bike} index={index} className='w-[260px] md:w-[360px] shrink-0' />
            ))}
          </div>
        </div>
      )}

      <div className="relative rounded-xl md:rounded-[1.5rem] overflow-hidden border border-orange-500/20 bg-zinc-950/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
              <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Expert Support Online</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
              Can't Decide Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500">Weapon?</span>
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-md">
              Skip the guesswork. Our tyre specialists will help you pick the perfect match for your ride & style.
            </p>
          </div>
          <div className="w-full md:max-w-[300px] shrink-0">
            <WhatsAppButton text="Get Expert Advice" value={waMessage} />
          </div>
        </div>
      </div>

    </div>
  );
}
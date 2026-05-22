"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ items = [], className = "", separator = <IoIosArrowForward size={16} />, }) => {


  return (
    <nav aria-label="Breadcrumb" className={`w-full  ${className}`}>
      <ol className="flex items-center  gap-2 line-clamp-1 overflow-x-auto text-sm md:text-[15px] text-zinc-500">

        <Link href="/" className="transition-all text-xs md:text-sm duration-200 text-white/70 hover:text-orange-500">Home</Link>
        <span className="text-zinc-400"> {separator} </span> {items?.map((item, index) => {

          const isLast = index === items.length - 1;
          const formattedName = item.label.replace(/-iii$/i, " III").split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

          return (
            <li key={index} className="flex items-center gap-1" >


              {!isLast ? (
                <Link href={item.href || "#"} className="text-xs md:text-sm transition-all duration-200 text-white/70 hover:text-orange-500">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-white font-semibold truncate text-xs md:text-sm"
                >
                  {formattedName}
                </span>
              )}

              {!isLast && (
                <span className="text-zinc-400">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
"use client"
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle, MdOutlineShoppingCart , MdClose, MdOutlineSearch } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuColumns = string[][];
type Item = { name: string; path: string; menu?: MenuColumns };

export function SearchBar() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const active = focused || value.length > 0;

  return (
    <div className="flex items-center w-64 gap-2">
      {/* Search icon always to the left */}
      <MdOutlineSearch size={22} className="text-white shrink-0" />

      {/* Input box */}
      <div
        className={`flex items-center w-full rounded px-2 -translate-x-2 py-1 ${
          active ? "bg-white text-black" : "bg-transparent text-white"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search"
          className={`flex-1 bg-transparent outline-none ${
            active
              ? "text-black placeholder-gray-500"
              : "text-white placeholder-white/90"
          }`}
        />

        {/* Clear button only when active; invisible spacer otherwise to prevent shift */}
        {active ? (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear search"
            className="p-1"
          >
            <MdClose size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        ) : (
          <span aria-hidden className="p-1 w-[22px]" />
        )}
      </div>
    </div>
  );
}

export function TopBar() {
  return (
    <div className="bg-[#6E8EBE] h-24 text-white flex items-center justify-between px-6">
      
      {/* Left - Search bar */}
      <SearchBar />

      {/* Center - Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/" passHref>
          <Image
            src="/assets/UniQ.webp"
            alt="UniQ Logo"
            width={100}
            height={100}
            style={{ pointerEvents: "none" }}
          />
        </Link>
      </div>

      {/* Right - Account + Cart */}
      <div className="flex items-center space-x-6">
        <Link href="/account" className="flex items-center space-x-2 cursor-pointer">
          <span>Account</span>
          <MdAccountCircle size={30} />
        </Link>
        <Link href="/cart" className="flex items-center space-x-2 cursor-pointer">
          <span>Cart</span>
          <MdOutlineShoppingCart size={30} />
        </Link>
      </div>
    </div>
  )
}


export function BottomBar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const items: Item[] = [
    { name: "Home", path: "/" },
    { name: "New Arrivals", path: "/new-arrivals" },

    // Example mega menus (3 columns like your screenshot).
    {
      name: "Course Books",
      path: "/course-books",
      menu: [
        ["Arts", "Business and Economics", "Creative Arts and Industries"],
        ["Education and Social Work", "Engineering", "Law"],
        ["Medicine & Health Science", "Science"],
      ],
    },
    {
      name: "Notebooks & Pads",
      path: "/notebooks",
      menu: [
        ["A4 Pads", "A5 Pads", "Dot Grid"],
        ["Hardcover Notebooks", "Softcover Notebooks"],
        ["Sticky Notes", "Index Tabs"],
      ],
    },
    {
      name: "Writing Supplies",
      path: "/writing-supplies",
      menu: [
        ["Ballpoint", "Gel", "Fountain"],
        ["Highlighters", "Fineliners"],
        ["Pencils", "Erasers", "Sharpeners"],
      ],
    },
    {
      name: "Other",
      path: "/other",
      menu: [
        ["Calculators", "Rulers"],
        ["Folders & Files", "Binders"],
        ["Staplers", "Scissors", "Glue"],
      ],
    },
  ];

  const isActivePath = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const current = items.find((i) => i.name === hovered);

  return (
    // Wrap bar + panel so leaving both closes the dropdown
    <div
      className="relative"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Tabs */}
      <div className="bg-[#FFDBC2] h-14 flex justify-center items-center gap-10">
        {items.map((item) => {
          const isActive = isActivePath(item.path);
          const hasMenu = !!item.menu;

          return (
            <Link
              key={item.path}
              href={item.path}
              onMouseEnter={() => setHovered(hasMenu ? item.name : null)}
              className={`
                relative h-full flex items-center px-4
                text-xl text-[#385684] translate-y-[1px]
                after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
                after:bg-[#385684] after:h-[4px]
                after:scale-x-0 after:transition-transform after:duration-300 after:origin-center
                hover:after:scale-x-100
                ${isActive ? "after:scale-x-100" : ""}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Dropdown panel (full width, anchored to bar bottom) */}
      {current?.menu && (
        <div
          className="
            absolute left-0 right-0 top-full z-20
            bg-white text-[#385684] border-t border-[#385684]/20 shadow-sm
            animate-[fadeIn_120ms_ease-out]
          "
          // keeps panel open while hovering it
          onMouseEnter={() => setHovered(current.name)}
        >
          <div className="px-24 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {current.menu.map((col, ci) => (
                <ul key={ci} className="space-y-3">
                  {col.map((label) => (
                    <li key={label}>
                      {/* For now, every submenu item goes to the parent tab */}
                      <Link
                        href={
                          items.find((i) => i.name === current.name)!.path
                        }
                        className="hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  return (
    <div>
      <TopBar/>
      <BottomBar/>
    </div>
  );
}

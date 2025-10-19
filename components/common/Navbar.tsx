"use client";

import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle, MdOutlineShoppingCart, MdClose, MdOutlineSearch } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/navigation";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface NavigationItem {
  name: string;
  path: string;
  menu?: string[][];
}

interface CartItem {
  label: string;
  icon: React.ComponentType<{ size: number }>;
  href: string;
  showCount?: boolean;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const DEGREE_SLUG_MAPPING: Record<string, string> = {
  'Arts': 'arts',
  'Business and Economics': 'business-and-economics',
  'Creative Arts and Industries': 'creative-arts-and-industries',
  'Education and Social Work': 'education-and-social-work',
  'Engineering': 'engineering',
  'Law': 'law',
  'Medicine & Health Science': 'medicine-and-health-science',
  'Science': 'science'
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Home", path: "/" },
  { name: "New Arrivals", path: "/new-arrivals" },
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
    path: "/notebooks-and-pads",
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

const CART_ITEMS: CartItem[] = [
  {
    label: "Account",
    icon: MdAccountCircle,
    href: "/account",
  },
  {
    label: "Cart",
    icon: MdOutlineShoppingCart,
    href: "/cart",
    showCount: true,
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getDegreeSlug = (degreeName: string): string => {
  return DEGREE_SLUG_MAPPING[degreeName] || 'not-implemented';
};

const isActivePath = (path: string, pathname: string): boolean => {
  if (path === "/") {
    return pathname === "/";
  }
  return pathname === path;
};

const isCourseBooksActive = (pathname: string): boolean => {
  return pathname.startsWith("/course-books");
};

const getMenuItemUrl = (itemName: string, label: string): string => {
  switch (itemName) {
    case "Course Books":
      return `/course-books/${getDegreeSlug(label)}`;
    case "Notebooks & Pads":
      return `/notebooks-and-pads?category=${encodeURIComponent(label)}`;
    case "Writing Supplies":
      return `/writing-supplies?category=${encodeURIComponent(label)}`;
    case "Other":
      return `/other?category=${encodeURIComponent(label)}`;
    default:
      return "/not-implemented";
  }
};

// Helper function to handle navigation with query parameters
const handleSubsectionNavigation = (itemName: string, label: string, pathname: string) => {
  const targetUrl = getMenuItemUrl(itemName, label);
  
  // Use globalThis.location to force navigation
  globalThis.location.href = targetUrl;
};

const getTabClassName = (isActive: boolean): string => {
  const baseClasses = `
    relative h-full flex items-center px-4
    text-xl text-[#385684] translate-y-[1px]
    after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
    after:bg-[#385684] after:h-[4px]
    after:scale-x-0 after:transition-transform after:duration-300 after:origin-center
    hover:after:scale-x-100
  `;
  return `${baseClasses} ${isActive ? "after:scale-x-100" : ""}`;
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Search bar component with dynamic styling based on focus state
 * Provides search functionality with clear button and accessibility features
 */
export function SearchBar() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const isActive = focused || value.length > 0;

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-64 gap-2">
      <button 
        type="submit" 
        aria-label="Search"
        className="shrink-0 hover:opacity-80 transition-opacity"
      >
        <MdOutlineSearch size={22} className="text-white" />
      </button>
        
      <div
        className={`flex items-center w-full rounded px-2 -translate-x-2 py-1 transition-colors ${
          isActive ? "bg-white text-black" : "bg-transparent text-white"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search"
          className={`flex-1 bg-transparent outline-none transition-colors ${
            isActive
              ? "text-black placeholder-gray-500"
              : "text-white placeholder-white/90"
          }`}
        />

        {isActive ? (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear search"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MdClose size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        ) : (
          <span aria-hidden className="p-1 w-[22px]" />
        )}
        </div>
      </form>
    );
  }

  /**
   * Logo component for the top navigation bar
   */
  function Logo() {
    return (
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
  );
}

/**
 * Cart count badge component
 */
function CartCountBadge({ count }: { readonly count: number }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  );
}

/**
 * Individual cart item component
 */
function CartItem({ item, cartCount }: { readonly item: CartItem; readonly cartCount: number }) {
  const Icon = item.icon;
  
  return (
    <Link href={item.href} className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
      <span>{item.label}</span>
      <div className="relative">
        <Icon size={30} />
        {item.showCount && <CartCountBadge count={cartCount} />}
      </div>
    </Link>
  );
}

/**
 * Top navigation bar with search, logo, and user actions
 * Contains search functionality, branding, and account/cart links
 */
export function TopBar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <div className="bg-[#6E8EBE] h-24 text-white flex items-center justify-between px-6">
      <SearchBar />
      <Logo />
      
      <div className="flex items-center space-x-6">
        {CART_ITEMS.map((item) => (
          <CartItem key={item.label} item={item} cartCount={cartCount} />
        ))}
      </div>
    </div>
  );
}

/**
 * Navigation tab component
 */
function NavigationTab({ 
  item, 
  isActive, 
  onMouseEnter 
}: { 
  readonly item: NavigationItem; 
  readonly isActive: boolean; 
  readonly onMouseEnter: (itemName: string, hasMenu: boolean) => void;
}) {
  const hasMenu = !!item.menu;

  return (
    <Link
      key={item.path}
      href={item.path}
      onMouseEnter={() => onMouseEnter(item.name, hasMenu)}
      className={getTabClassName(isActive)}
      aria-current={isActive ? "page" : undefined}
    >
      {item.name}
    </Link>
  );
}

/**
 * Dropdown menu component
 */
function DropdownMenu({ 
  item, 
  onMouseEnter,
  pathname
}: { 
  readonly item: NavigationItem; 
  readonly onMouseEnter: (itemName: string, hasMenu: boolean) => void;
  readonly pathname: string;
}) {
  if (!item.menu) return null;

  return (
    <div
      className="
        absolute left-0 right-0 top-full z-20
        bg-white text-[#385684] border-t border-[#385684]/20 shadow-sm
        animate-[fadeIn_120ms_ease-out]
      "
      onMouseEnter={() => onMouseEnter(item.name, true)}
      role="menu"
      aria-label={`${item.name} submenu`}
      tabIndex={-1}
    >
      <div className="px-24 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {item.menu.map((column, columnIndex) => (
            <ul key={`${item.name}-column-${columnIndex}`} className="space-y-3">
              {column.map((label) => (
                <li key={label}>
                  <button
                    onClick={() => handleSubsectionNavigation(item.name, label, pathname)}
                    className="hover:underline transition-colors hover:text-[#2A4A6B] text-left"
                    type="button"
                    role="menuitem"
                    tabIndex={0}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Bottom navigation bar with main menu categories and dropdowns
 * Handles navigation between different product categories with hover menus
 */
export function BottomBar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const currentHoveredItem = NAVIGATION_ITEMS.find(item => item.name === hoveredItem);

  const handleMouseEnter = (itemName: string, hasMenu: boolean) => {
    setHoveredItem(hasMenu ? itemName : null);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const isItemActive = (item: NavigationItem): boolean => {
    if (item.name === "Course Books") {
      return isCourseBooksActive(pathname);
    }
    return isActivePath(item.path, pathname);
  };

  return (
    <nav className="relative" onMouseLeave={handleMouseLeave} aria-label="Main navigation">
      <div className="bg-[#FFDBC2] h-14 flex justify-center items-center gap-10">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationTab
            key={item.path}
            item={item}
            isActive={isItemActive(item)}
            onMouseEnter={handleMouseEnter}
          />
        ))}
      </div>

      {currentHoveredItem && (
        <DropdownMenu
          item={currentHoveredItem}
          onMouseEnter={handleMouseEnter}
          pathname={pathname}
        />
      )}
    </nav>
  );
}

/**
 * Main navbar component combining top and bottom navigation bars
 * Refactored for better maintainability and modularity
 */
export default function Navbar() {
  return (
    <div>
      <TopBar />
      <BottomBar />
    </div>
  );
}
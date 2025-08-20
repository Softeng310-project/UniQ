"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

// Default image for all items
const defaultImage = "/assets/NoteBooks.png";

// Hardcoded list of 8 items
const items = [
  { title: "Super Notebook", price: "$10.00", image: defaultImage },
  { title: "Mega Eraser", price: "$20.00", image: defaultImage },
  { title: "Cool Ruler", price: "$30.00", image: defaultImage },
  { title: "Fancy Scissors", price: "$40.00", image: defaultImage },
  { title: "Art Supplies", price: "$50.00", image: defaultImage },
  { title: "Writing Kit", price: "$60.00", image: defaultImage },
  { title: "Calculator Pro", price: "$70.00", image: defaultImage },
  { title: "Course Book", price: "$80.00", image: defaultImage },
];

export default function NewArrivals() {
  // Index of first visible item, direction and state 
  const [startIdx, setStartIdx] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Animation timer
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Number of visible cards and card width
  const visibleCount = 5;
  const cardWidthVW = 27;

  // Handles carousel slide animation and item shift
  const slide = (dir: "left" | "right") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnimate(true);
    setOffset(dir === "left" ? 1 : -1);
    timeoutRef.current = setTimeout(() => {
      setAnimate(false);
      setStartIdx((prev) =>
        dir === "left"
          ? (prev - 1 + items.length) % items.length
          : (prev + 1) % items.length
      );
      setOffset(0);
      setTimeout(() => setAnimate(true), 50);
    }, 500);
  };

  // Number of extra cards rendered on each side
  const extraLeft = 2;
  const extraRight = 1;
  // Items to render (including peeking cards)
  const visibleItems = Array.from({ length: visibleCount + extraLeft + extraRight }, (_, i) =>
    items[(startIdx + i - extraLeft + items.length) % items.length]
  );

  // Shift carousel so extra left cards are out of view
  const baseShift = -(cardWidthVW * extraLeft);
  // Animation transform for sliding
  const transform =
    offset === 1
      ? `translateX(${baseShift + cardWidthVW}vw)`
      : offset === -1
      ? `translateX(${baseShift - cardWidthVW}vw)`
      : `translateX(${baseShift}vw)`;

  return (
    <div className="left-0 right-0 py-8 bg-white z-10">
      <div className="flex flex-col items-center mb-4 gap-2">
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => slide("left")} className="pt-8 text-xl font-bold">
            &#8592;
          </button>
          <h2 className="pt-8 text-2xl font-semibold text-center">New Arrivals</h2>
          <button onClick={() => slide("right")} className="pt-8 text-xl font-bold">
            &#8594;
          </button>
        </div>
  <span className="mt-2 text-black-700 underline underline-offset-4 cursor-pointer">View All</span>
      </div>
      <div className="overflow-hidden w-screen-5 px-[10vw]">
        <div
          className="flex"
          style={{
            gap: "1.5vw",
            transform,
            transition: animate
              ? "transform 0.5s cubic-bezier(0.2, 0.5, 0.3, 1)"
              : "none",
          }}
        >
          {visibleItems.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="flex flex-col items-center"
              style={{
                minWidth: `${cardWidthVW * 0.945}vw`,
                maxWidth: `${cardWidthVW}vw`,
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="object-cover mb-2 rounded"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="text-lg font-medium mb-1 w-full text-center">
                {item.title}
              </div>
              <div className="text-gray-500 w-full text-center">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

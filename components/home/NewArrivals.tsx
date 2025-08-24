"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const defaultImage = "/assets/NoteBooks.webp";

export default function NewArrivals() {
  const [items, setItems] = useState<{ id: number; title: string; price: number; image: string }[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/books/newest")
      .then((res) => res.json())
      .then((data) => {
        setItems(
          data.map((book: any) => ({
            id: book.id,
            title: book.title,
            price: book.price,
            image: defaultImage,
          }))
        );
      });
  }, []);

  const visibleCount = 5;
  const cardWidthVW = 27;
  const extraLeft = 2;
  const extraRight = 1;
  const visibleItems = Array.from({ length: visibleCount + extraLeft + extraRight }, (_, i) =>
    items.length
      ? items[(startIdx + i - extraLeft + items.length) % items.length]
      : { id: 0, title: "", price: 0, image: defaultImage }
  );

  const baseShift = -(cardWidthVW * extraLeft);
  const transform =
    offset === 1
      ? `translateX(${baseShift + cardWidthVW}vw)`
      : offset === -1
      ? `translateX(${baseShift - cardWidthVW}vw)`
      : `translateX(${baseShift}vw)`;

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
            <Link href={`/book/${item.id}`} key={`${item.title}-${idx}`} className="flex flex-col items-center" style={{
                minWidth: `${cardWidthVW * 0.945}vw`,
                maxWidth: `${cardWidthVW}vw`,
              }}>
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
              <div className="text-gray-500 w-full text-center">
                {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : item.price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

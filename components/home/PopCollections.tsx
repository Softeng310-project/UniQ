import Image from "next/image";

export function Title() {
    return (
        <div>
      <h2 className="text-3xl text-[#385684] text-center mt-2">
        Popular Collections
      </h2>
    </div>
    );
}

export function Collections() {
  const items = [
    { src: "/assets/WritingSupplies.webp", alt: "Writing Supplies", path: "/not-implemented" },
    { src: "/assets/CourseBooks.webp", alt: "Course Books", path: "/course-books" },
    { src: "/assets/ArtSupplies.webp", alt: "Art Supplies", path: "/not-implemented" },
    { src: "/assets/Notebooks.webp", alt: "Notebooks & Pads", path: "/not-implemented" },
    { src: "/assets/Calculators.webp", alt: "Calculators", path: "/not-implemented" },
    { src: "/assets/Erasers.webp", alt: "Erasers", path: "/not-implemented" },
    { src: "/assets/Rulers.webp", alt: "Rulers", path: "/not-implemented" },
    { src: "/assets/Scissors.webp", alt: "Scissors", path: "/not-implemented" },
  ];

  return (
    <div className="px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
        {items.map((item, i) => (
          <a href={item.path} key={i} className="relative w-full h-[200px] cursor-pointer block">
            {/* Image */}
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover rounded"
              style={{ pointerEvents: "none" }}
            />

            {/* Color overlay */}
            <div
              className="absolute inset-0 rounded"
              style={{
                backgroundColor: "#FFDBC2",
                opacity: 0.4,
              }}
            ></div>

            {/* Title box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-500 bg-opacity-20 px-4 py-2 rounded">
                <span className="text-white text-lg font-semibold">
                  {item.alt.toUpperCase()}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}




export default function PopCollections() {
  return (
    <div>
      <Title />
        <div className="mt-7">
            <Collections />
        </div>
    </div>
  );
}
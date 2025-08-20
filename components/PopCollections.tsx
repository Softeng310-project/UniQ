import Image from "next/image";

export function Title() {
    return (
        <div>
      <h2 className="text-3xl text-[#385684] text-center">
        Popular Collections
      </h2>
      <div className="flex justify-center">
      <p className="mt-1 text-sm text-[#385684] text-center underline cursor-pointer hover:text-blue-700">
        VIEW ALL
      </p>
      </div>
    </div>
    );
}

export function Collections() {
  const items = [
    { src: "/assets/WritingSupplies.png", alt: "Writing Supplies" },
    { src: "/assets/CourseBooks.png", alt: "Course Books" },
    { src: "/assets/ArtSupplies.png", alt: "Art Supplies" },
    { src: "/assets/Notebooks.png", alt: "Notebooks & Pads" },
    { src: "/assets/Calculators.png", alt: "Calculators" },
    { src: "/assets/Erasers.png", alt: "Erasers" },
    { src: "/assets/Rulers.png", alt: "Rulers" },
    { src: "/assets/Scissors.png", alt: "Scissors" },
  ];

  return (
    <div className="px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative w-full h-[200px] cursor-pointer"
          >
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
          </div>
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
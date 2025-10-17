"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../../../components/product-results/Breadcrumb";
import { useCart } from "../../../contexts/CartContext";

// Writing supply details page displaying individual product information
// Shows product details, price, description, and quantity controls for purchase
export default function WritingSupplyDetails({ params }: { params: { id: string } }) {
    const [writingSupply, setWritingSupply] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const { addToCart } = useCart();
    const router = useRouter();

    // Fetch writing supply data from API based on ID
    useEffect(() => {
        fetch(`/api/writing-supplies/${params.id}`)
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    throw new Error(error.error || "Failed to fetch writing supply");
                }
                return res.json();
            })
            .then((data) => setWritingSupply(data))
            .catch((err) => setWritingSupply({ error: err.message }));
    }, [params.id]);

    if (!writingSupply) return <div>Loading...</div>;
    if (writingSupply.error) return <div>{writingSupply.error}</div>;

    const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
    const handleIncrease = () => setQuantity((q) => q + 1);

    // Handle adding writing supply to cart
    const handleAddToCart = () => {
        if (writingSupply && !writingSupply.error) {
            addToCart({
                id: params.id,
                title: writingSupply.title,
                price: writingSupply.price,
                category: writingSupply.category,
                description: writingSupply.description,
            }, quantity);

            // Show feedback to user
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    // Generate breadcrumb items
    const getBreadcrumbItems = () => [
        { label: "Home", href: "/" },
        { label: "Writing Supplies", href: "/writing-supplies" },
        { label: writingSupply.title }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <Breadcrumb items={getBreadcrumbItems()} title={writingSupply?.title || "Writing Supply Details"} />

            <div className="px-8 py-6 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <div className="w-72 h-96 flex flex-col items-center justify-center border border-gray-300 bg-orange-100 text-4xl text-gray-700 font-serif">
                            {writingSupply.title
                                ? writingSupply.title.split(" ").map((line: string, idx: number) => (
                                    <div key={idx} className="w-full text-center">{line}</div>
                                ))
                                : <div>No title found</div>
                            }
                        </div>
                    </div>
                    {/* Product Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-2">{writingSupply.title}</h1>
                        <div className="text-2xl text-gray-600 mb-4">${writingSupply.price?.toFixed(2)}</div>

                        {/* Product Details */}
                        <div className="mb-6 space-y-2">
                            <div className="text-gray-700">
                                <span className="font-medium">Category:</span> {writingSupply.category}
                            </div>
                            <div className="text-gray-700">
                                <span className="font-medium">Type:</span> {writingSupply.type}
                            </div>
                            {writingSupply.colour && (
                                <div className="text-gray-700">
                                    <span className="font-medium">Colour:</span> {writingSupply.colour}
                                </div>
                            )}
                            {writingSupply.ink_type && writingSupply.ink_type !== "N/A" && (
                                <div className="text-gray-700">
                                    <span className="font-medium">Ink Type:</span> {writingSupply.ink_type}
                                </div>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-row items-end gap-4 mb-6">
                            <div>
                                <div className="text-base text-gray-700 mb-1">Quantity</div>
                                <div className="flex items-center border border-gray-300 rounded w-fit">
                                    <button
                                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                                        onClick={handleDecrease}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-lg">{quantity}</span>
                                    <button
                                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                                        onClick={handleIncrease}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className={`ml-4 w-[550px] h-[38px] px-8 border border-gray-300 text-lg rounded transition text-center flex items-center justify-center ${addedToCart
                                        ? 'bg-green-500 text-white'
                                        : 'bg-orange-100 text-gray-700 hover:bg-orange-200'
                                    }`}
                            >
                                {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
                            </button>
                        </div>
                        <hr className="my-6" />
                        {/* Description */}
                        <div>
                            <div className="text-lg font-medium text-gray-700 mb-2">Description</div>
                            <div className="text-gray-600 text-base leading-relaxed">{writingSupply.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
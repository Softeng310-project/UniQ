"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../product-results/Breadcrumb";
import { useCart } from "../../contexts/CartContext";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ProductDetailField {
    label: string;
    value: string | number;
}

interface ProductDetailProps {
    productId: string;
    apiEndpoint: string;
    breadcrumbItems: BreadcrumbItem[];
    productName: string;
    renderProductFields?: (product: any) => ProductDetailField[];
}

export default function ProductDetail({
    productId,
    apiEndpoint,
    breadcrumbItems,
    productName,
    renderProductFields,
}: ProductDetailProps) {
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const router = useRouter();

    // Fetch product data from API based on ID
    useEffect(() => {
        fetch(`${apiEndpoint}/${productId}`)
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    throw new Error(error.error || `Failed to fetch ${productName}`);
                }
                return res.json();
            })
            .then((data) => setProduct(data))
            .catch((err) => setProduct({ error: err.message }));
    }, [productId, apiEndpoint, productName]);

    if (!product) return <div>Loading...</div>;
    if (product.error) return <div>{product.error}</div>;

    const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
    const handleIncrease = () => setQuantity((q) => q + 1);

    // Handle adding product to cart
    const handleAddToCart = async () => {
        if (!product || product.error || adding) {
            return;
        }

        setError(null);
        setAdding(true);

        // Require authentication before allowing add to cart
        try {
            const res = await fetch('/api/auth/me', { method: 'GET', credentials: 'include' });
            if (res.status === 401) {
                router.push('/sign-in');
                setAdding(false);
                return;
            }
        } catch {
            router.push('/sign-in');
            setAdding(false);
            return;
        }

        try {
            await addToCart(
                {
                    id: productId,
                    title: product.title,
                    price: product.price,
                    category: product.category || product.type,
                    description: product.description,
                },
                quantity
            );

            // Show feedback to user
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unable to add item to cart.';
            if (message === 'Not authenticated') {
                router.push('/sign-in');
            } else {
                setError(message);
            }
        } finally {
            setAdding(false);
        }
    };

    // Get product-specific fields to display
    const productFields = renderProductFields ? renderProductFields(product) : [];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} title={product?.title || `${productName} Details`} />

            <div className="px-8 py-6 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <div className="w-72 h-96 flex flex-col items-center justify-center border border-gray-300 bg-orange-100 text-4xl text-gray-700 font-serif">
                            {product.title ? (
                                product.title.split(" ").map((line: string, idx: number) => (
                                    <div key={idx} className="w-full text-center">
                                        {line}
                                    </div>
                                ))
                            ) : (
                                <div>No title found</div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-2">{product.title}</h1>
                        <div className="text-2xl text-gray-600 mb-4">${product.price?.toFixed(2)}</div>

                        {/* Product-specific Details */}
                        {productFields.length > 0 && (
                            <div className="mb-6 space-y-2">
                                {productFields.map((field, idx) => (
                                    <div key={idx} className="text-gray-700">
                                        <span className="font-medium">{field.label}:</span> {field.value}
                                    </div>
                                ))}
                            </div>
                        )}

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
                                    ? "bg-green-500 text-white"
                                    : "bg-orange-100 text-gray-700 hover:bg-orange-200"
                                    } ${adding ? "opacity-70 cursor-not-allowed" : ""}`}
                                disabled={adding}
                            >
                                {addedToCart ? "✓ ADDED TO CART" : "ADD TO CART"}
                            </button>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <hr className="my-6" />

                        {/* Description */}
                        <div>
                            <div className="text-lg font-medium text-gray-700 mb-2">Description</div>
                            <div className="text-gray-600 text-base leading-relaxed">{product.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

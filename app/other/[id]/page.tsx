"use client";
import React from "react";
import ProductDetail from "../../../components/product-results/ProductDetail";

export default function OtherItemDetails({ params }: { params: { id: string } }) {
    return (
        <ProductDetail
            productId={params.id}
            apiEndpoint="/api/other"
            breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Other", href: "/other" },
            ]}
            productName="Item"
            renderProductFields={(otherItem) => [
                { label: "Category", value: otherItem.category },
                { label: "Type", value: otherItem.type },
            ]}
        />
    );
}
"use client";
import React from "react";
import ProductDetail from "../../../components/product-results/ProductDetail";

export default function WritingSupplyDetails({ params }: { params: { id: string } }) {
    return (
        <ProductDetail
            productId={params.id}
            apiEndpoint="/api/writing-supplies"
            breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Writing Supplies", href: "/writing-supplies" },
            ]}
            productName="Writing Supply"
            renderProductFields={(writingSupply) => {
                const fields = [
                    { label: "Category", value: writingSupply.category },
                    { label: "Type", value: writingSupply.type },
                ];

                if (writingSupply.colour) {
                    fields.push({ label: "Colour", value: writingSupply.colour });
                }

                if (writingSupply.ink_type && writingSupply.ink_type !== "N/A") {
                    fields.push({ label: "Ink Type", value: writingSupply.ink_type });
                }

                return fields;
            }}
        />
    );
}
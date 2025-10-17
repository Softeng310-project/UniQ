"use client";
import React from "react";
import ProductDetail from "../../../components/product-results/ProductDetail";

export default function NotebookDetails({ params }: { params: { id: string } }) {
    return (
        <ProductDetail
            productId={params.id}
            apiEndpoint="/api/notebooks-and-pads"
            breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Notebooks & Pads", href: "/notebooks-and-pads" },
            ]}
            productName="Notebook"
            renderProductFields={(notebook) => {
                const fields = [
                    { label: "Type", value: notebook.type },
                ];

                if (notebook.cover_type && notebook.cover_type !== "N/A") {
                    fields.push({ label: "Cover", value: notebook.cover_type });
                }

                if (notebook.page_style && notebook.page_style !== "N/A") {
                    fields.push({ label: "Page Style", value: notebook.page_style });
                }

                return fields;
            }}
        />
    );
}

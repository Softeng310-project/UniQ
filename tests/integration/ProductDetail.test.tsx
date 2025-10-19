import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = jest.fn();
const addToCartMock = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: pushMock }),
}));

jest.mock("../../contexts/CartContext", () => ({
    useCart: () => ({ addToCart: addToCartMock }),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ProductDetail = require("../../components/product-results/ProductDetail").default as typeof import("../../components/product-results/ProductDetail").default;

const mockResponse = (init: {
    status: number;
    ok: boolean;
    json?: () => Promise<any>;
}): Response =>
    ({
        status: init.status,
        ok: init.ok,
        json: init.json ?? (async () => ({})),
    } as Response);

const defaultProps = {
    productId: "123",
    apiEndpoint: "/api/products",
    breadcrumbItems: [],
    productName: "Accessory",
};

describe("ProductDetail add to cart flow", () => {
    beforeEach(() => {
        pushMock.mockReset();
        addToCartMock.mockReset();
        (global.fetch as jest.Mock).mockReset();
    });

    it("redirects to sign-in when authentication fails", async () => {
        const fetchMock = global.fetch as jest.Mock;

        // Initial product load
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({
                    title: "Graphing Calculator",
                    price: 89.5,
                    description: "Essential for engineering courses",
                    category: "electronics",
                }),
            })
        );

        // Auth check returns 401
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 401,
                ok: false,
                json: async () => ({ error: "Not authenticated" }),
            })
        );

        render(<ProductDetail {...defaultProps} />);

        await screen.findByText("Essential for engineering courses");

        const addButton = await screen.findByRole("button", { name: /add to cart/i });
        await act(async () => {
            await userEvent.click(addButton);
        });

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/sign-in");
        });

        expect(addToCartMock).not.toHaveBeenCalled();
    });

    it("calls addToCart when the user is authenticated", async () => {
        const fetchMock = global.fetch as jest.Mock;

        // Initial product load
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({
                    title: "Noise Cancelling Headphones",
                    price: 150,
                    description: "Great for focus sessions",
                    type: "electronics",
                }),
            })
        );

        // Auth check success
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({ userId: "user-1" }),
            })
        );

        addToCartMock.mockResolvedValueOnce(undefined);

        render(<ProductDetail {...defaultProps} />);

        await screen.findByText("Great for focus sessions");

        const addButton = await screen.findByRole("button", { name: /add to cart/i });
        await act(async () => {
            await userEvent.click(addButton);
        });

        await waitFor(() => {
            expect(addToCartMock).toHaveBeenCalledWith(
                {
                    id: defaultProps.productId,
                    title: "Noise Cancelling Headphones",
                    price: 150,
                    category: "electronics",
                    description: "Great for focus sessions",
                },
                1
            );
        });

        expect(pushMock).not.toHaveBeenCalled();
    });
});

"use client";

import React, { PropsWithChildren } from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "../../contexts/CartContext";

const wrapper = ({ children }: PropsWithChildren) => <CartProvider>{children}</CartProvider>;

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

describe("CartContext addToCart", () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    beforeEach(() => {
        (global.fetch as jest.Mock).mockReset();
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it("rejects with 'Not authenticated' when the API responds with 401", async () => {
        const fetchMock = global.fetch as jest.Mock;

        // Initial cart refresh
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({ items: [] }),
            })
        );

        // addToCart call
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 401,
                ok: false,
                json: async () => ({ error: "Not authenticated" }),
            })
        );

        const { result } = renderHook(() => useCart(), { wrapper });

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        await act(async () => {
            await expect(
                result.current.addToCart(
                    {
                        id: "abc",
                        title: "Sample Product",
                        price: 25,
                        category: "general",
                        description: "Sample product",
                        condition: "new",
                        degree: "N/A",
                    },
                    1
                )
            ).rejects.toThrow("Not authenticated");
        });
    });

    it("updates the cart when the API responds with new items", async () => {
        const fetchMock = global.fetch as jest.Mock;

        // Initial cart refresh
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({ items: [] }),
            })
        );

        // addToCart success response
        fetchMock.mockResolvedValueOnce(
            mockResponse({
                status: 200,
                ok: true,
                json: async () => ({
                    items: [
                        {
                            id: "xyz",
                            title: "Integration Practice",
                            price: 15,
                            quantity: 2,
                            category: "general",
                            description: "Bundle of items",
                        },
                    ],
                }),
            })
        );

        const { result } = renderHook(() => useCart(), { wrapper });

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        await act(async () => {
            await result.current.addToCart(
                {
                    id: "xyz",
                    title: "Integration Practice",
                    price: 15,
                    category: "general",
                    description: "Bundle of items",
                },
                2
            );
        });

        expect(result.current.items).toEqual([
            {
                id: "xyz",
                title: "Integration Practice",
                price: 15,
                quantity: 2,
                category: "general",
                degree: undefined,
                condition: undefined,
                description: "Bundle of items",
            },
        ]);
    });
});

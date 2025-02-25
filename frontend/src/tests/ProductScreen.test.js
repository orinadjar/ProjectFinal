import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import ProductScreen from "../screens/ProductScreen";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

jest.mock("../slices/productsApiSlice", () => ({
  useGetProductDetailsQuery: jest.fn(),
}));

const mockStore = configureStore([]);

describe("ProductScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { cartItems: [] },
    });
  });

  test("renders error state", async () => {
    useGetProductDetailsQuery.mockReturnValue({
      isLoading: false,
      error: { data: { message: "Product not found" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/product not found/i)).toBeInTheDocument();
  });

  test("renders product details and adds to cart", async () => {
    useGetProductDetailsQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        _id: "1",
        name: "Test Product",
        image: "/images/sample.jpg",
        price: 99.99,
        description: "A great product",
        rating: 4.5,
        numReviews: 10,
        countInStock: 5,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<div>Cart</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/10 reviews/i)).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addToCartButton).toBeEnabled();

    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        { 
          type: "cart/addToCart", 
          payload: expect.objectContaining({ name: "Test Product", qty: 1 }) 
        },
      ]);
    });

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import HomeScreen from "../screens/HomeScreen";
import { useGetProductsQuery } from "../slices/productsApiSlice";


jest.mock("../slices/productsApiSlice", () => ({
  useGetProductsQuery: jest.fn(),
}));

const mockStore = configureStore([]);

describe("HomeScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { cartItems: [] },
    });
  });

  test("renders error message", () => {
    useGetProductsQuery.mockReturnValue({
      isLoading: false,
      error: { data: { message: "Failed to load products" } },
      data: [],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
  });

  test("renders products list", async () => {
    const mockProducts = [
      {
        _id: "1",
        name: "Test Product 1",
        image: "/images/sample1.jpg",
        price: 49.99,
        description: "A great product 1",
      },
      {
        _id: "2",
        name: "Test Product 2",
        image: "/images/sample2.jpg",
        price: 59.99,
        description: "A great product 2",
      },
    ];

    useGetProductsQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockProducts,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/latest products/i)).toBeInTheDocument();
      expect(screen.getByText(/test product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/test product 2/i)).toBeInTheDocument();
    });
  });
});

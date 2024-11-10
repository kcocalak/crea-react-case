import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ProductList from "../../components/Product/ProductList";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Provider } from "react-redux";
import { store } from "../../store";

vi.mock("../../store/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    images: ["https://via.placeholder.com/150"],
    rating: 4.5,
    price: 100,
  },
  {
    id: 2,
    title: "Product 2",
    images: ["https://via.placeholder.com/150"],
    rating: 3.5,
    price: 200,
  },
];

describe("ProductList Component", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  beforeEach(() => {
    useAppDispatch.mockReturnValue(mockDispatch);
  });

  it("should render the loading skeleton when loading", () => {
    useAppSelector.mockReturnValue({ products: [], loading: true });

    render(
    <Provider store={store}>
    <ProductList />
    </Provider>);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(16); 
  });

  it("should render the products when loading is complete", async () => {
    useAppSelector.mockReturnValue({ products: mockProducts, loading: false });

    render(<ProductList />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  it("should call localStorage.setItem when a product is clicked", () => {
    useAppSelector.mockReturnValue({ products: mockProducts, loading: false });

    render(<ProductList />);

    const productLink = screen.getByText("Product 1").closest("a");
    fireEvent.click(productLink);

    expect(localStorage.setItem).toHaveBeenCalledWith("selectedProductId", 1);
  });

  it("should not show 'Add to Cart' button on mobile screens", () => {
    useAppSelector.mockReturnValue({ products: mockProducts, loading: false });

    global.innerWidth = 500;
    render(<ProductList />);

    const addToCartButton = screen.queryByText(/Add to Cart/i);
    expect(addToCartButton).toBeNull();
  });

  it("should render the 'Add to Cart' button on larger screens", async () => {
    useAppSelector.mockReturnValue({ products: mockProducts, loading: false });

    window.innerWidth = 800;
    global.dispatchEvent(new Event('resize'));
    render(<ProductList />);

    const addToCartButton = await screen.findAllByText(/Add to Cart/i);
  expect(addToCartButton.length).toBeGreaterThan(0);
  expect(addToCartButton[0]).toBeInTheDocument();
  });
});

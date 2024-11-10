import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Product from '../../components/Product/ProductPage'; 
import { useAppSelector, useAppDispatch } from '../../store/hooks'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock("../../store/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

const mockProduct = {
  id: 1,
  title: "Product 1",
  price: 100,
  images: ["image1.jpg"],
  rating: 4.5,
  reviews: [
    { comment: "Great product!", rating: 5, reviewerName: "user", date: new Date() }
  ],
};

describe('Product Component', () => {
  it("should render the product details correctly", async () => {

    useAppSelector.mockReturnValue({
      product: mockProduct,
      loading: false
    });

    useLocation.mockReturnValue({
      pathname: "/product/1"
    });

    const dispatch = vi.fn();
    useAppDispatch.mockReturnValue(dispatch);

    render(<Product />);

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();

    expect(screen.getByText(/US \$100/i)).toBeInTheDocument();

    // // Product rating
    expect(screen.getByTestId("slider-image")).toBeInTheDocument();

    // Rating component
    expect(screen.getByTestId("product-rating")).toBeInTheDocument();
});

  it("should display loading state when product is being fetched", async () => {
    // useAppSelector'ı loading true olarak mockla
    useAppSelector.mockReturnValue({
      product: null,
      loading: true
    });

    render(<Product />);

    // Loading element should be present
    expect(screen.getAllByTestId("skeleton")).toHaveLength(16)
  });

  it("should handle tab change correctly", async () => {
    useAppSelector.mockReturnValue({
      product: mockProduct,
      loading: false
    });

    const dispatch = vi.fn();
    useAppDispatch.mockReturnValue(dispatch);

    render(<Product />);

    // Check that initially "The Details" tab is selected
    const detailsTab = screen.getByText('The Details');
    expect(detailsTab).toHaveClass('Mui-selected');

    // Simulate tab click to "Rating & Reviews"
    const reviewsTab = screen.getByText('Rating & Reviews');
    fireEvent.click(reviewsTab);

    // Check that "Rating & Reviews" tab is selected now
    expect(reviewsTab).toHaveClass('Mui-selected');
  });

  it("should redirect to product list if no product is selected", async () => {
    useAppSelector.mockReturnValue({
      product: null,
      loading: false
    });

    const dispatch = vi.fn();
    useAppDispatch.mockReturnValue(dispatch);
    
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    useLocation.mockReturnValue({
      pathname: "/product/999" // Non-existent product
    });

    render(<Product />);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/products");
    });
  });
});

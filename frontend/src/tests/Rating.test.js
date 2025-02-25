import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProductScreen from '../screens/ProductScreen';
import productReducer from '../slices/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

test('renders ProductScreen', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/product/1"]}>
        <ProductScreen />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Product Details/i)).toBeInTheDocument();
});

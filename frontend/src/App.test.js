import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('la barre de recherche est affichée', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const searchInput = screen.getByPlaceholderText(/rechercher/i);
  expect(searchInput).toBeInTheDocument();
});

test('le titre Film App est affiché', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = screen.getByText(/Film App/i);
  expect(title).toBeInTheDocument();
});
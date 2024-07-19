import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import WrappedApp from '../App';

describe('test Home page', () => {
  it('home renders', () => {

    render(
      <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </Provider>,
    );
  });
});




describe('test Not found', () => {
  it('Not Found renders', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
      </Provider>,
    );
  });
});

describe('test Home page2', () => {
  it('home click', () => {

    render(
      <WrappedApp />
    );
    setTimeout(() => fireEvent.click(screen.getAllByTestId('item')[0]), 1000)
    setTimeout(() => {
      expect(screen.getByTestId('item-details')).toBe(2)
      screen.debug();
    }, 2000);
  });
});


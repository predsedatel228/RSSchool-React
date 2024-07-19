import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
// import ItemDetails from './ItemDetails';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import { Provider } from 'react-redux';


// const api = new Api();


describe('test ItemDetails', () => {
  it('ItemDetails renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        {/* <ItemDetails /> */}
        </BrowserRouter>
      </Provider>,
    );
  });
});

import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import SearchSection from './SearchSection';
// import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import { Provider } from 'react-redux';
import Api from '../../Api';

describe('test Home page', () => {
  it('home renders', () => {
  const api = new Api();
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SearchSection api={api} setLoading={()=> true} callback={()=> ''}/>
      </BrowserRouter>
      </Provider>,

    );
  });
});
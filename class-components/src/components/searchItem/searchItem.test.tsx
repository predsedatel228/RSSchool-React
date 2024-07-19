import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import SearchItem from './SearchItem';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import { Provider } from 'react-redux';
import Api from '../../Api';

const api = new Api();

describe('test SearchItem', () => {
  it('SearchItem renders', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SearchItem name='Bulbasaur' url='https://pokeapi.co/api/v2/pokemon/1/' api={api} setRightTabHandler={() => 1} rightTabHandler={true} setItemUrl={() => 'https://pokeapi.co/api/v2/pokemon/1/'}/>
      </BrowserRouter>
      </Provider>,

    );
  });
});


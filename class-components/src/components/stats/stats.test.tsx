import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Stats from './Stats';

describe('test Stats', () => {
  it('Stats renders', () => {
    render(<Stats name="Bulbasaur" value={1} />);
  });
});

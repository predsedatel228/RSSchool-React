import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import WrappedApp from './App';

describe('test App', () => {
  it('App renders', () => {
    render(
      <WrappedApp />
    );
  });
});


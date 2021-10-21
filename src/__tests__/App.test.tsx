/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

afterEach(cleanup);

describe('<App />', () => {
  it('renders without errors', () => {
    const { container } = render(<App />);
    // a标签含有data-testid='aNoDisabled',进行检查
    expect(getByTestId(container, 'aNoDisabled')).not.toBeDisabled();
  });
});

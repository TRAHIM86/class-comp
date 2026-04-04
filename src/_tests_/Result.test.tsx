import { render, screen } from '@testing-library/react';
import { Result } from '../components/result-bottom/results';
import { heroes } from './test-utils/dataForTests';

const error404 = {
  isError: true,
  errorStatus: '404',
};

describe('Result tests', () => {
  test('Error result test', () => {
    render(<Result heroes={heroes} stateError={error404} />);

    expect(screen.getByText(/Error. Status: 404/i)).toBeInTheDocument();
  });
});

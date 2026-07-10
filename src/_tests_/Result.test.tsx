import { render, screen } from '@testing-library/react';
import { Result } from '../components/result-bottom/results';
import { heroesResponse } from './test-utils/dataForTests';

const error404 = {
  name: 'error404',
  message: '404',
};

describe('Result tests', () => {
  test('Error result test', () => {
    render(
      <Result
        heroes={heroesResponse}
        error={error404}
        renderError={[1]}
        errorRequest={null}
      />
    );

    expect(screen.getByText(/Error. Status: 404/i)).toBeInTheDocument();
  });
});

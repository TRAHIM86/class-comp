import { render, screen } from '@testing-library/react';
import { TableResult } from '../components/result-bottom/tableresult';
import { heroes } from './test-utils/dataForTests';

describe('TableResult test', () => {
  test('Length of heroes', () => {
    render(<TableResult heroes={heroes} />);

    const quantityHeroes = screen.getAllByTestId(/hero-item/i);
    expect(quantityHeroes).toHaveLength(2);
  });

  test('Names  of heroes', () => {
    render(<TableResult heroes={heroes} />);

    const quantityHeroes = screen.getAllByTestId(/hero-item/i);
    expect(quantityHeroes[0]).toHaveTextContent('r2-d2');
    expect(quantityHeroes[1]).toHaveTextContent('Padme Amidala');
  });

  test('All description of hero', () => {
    render(<TableResult heroes={heroes} />);

    const quantityHeroes = screen.getAllByTestId(/hero-item/i);
    expect(quantityHeroes[0]).toHaveTextContent('r2-d2');
    expect(quantityHeroes[0]).toHaveTextContent('Gender: robot');
    expect(quantityHeroes[0]).toHaveTextContent('B.y.: 1140');
    expect(quantityHeroes[0]).toHaveTextContent('Height: 100');
  });
});

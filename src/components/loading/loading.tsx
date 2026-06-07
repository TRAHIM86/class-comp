import { useEffect, useState } from 'react';
import { dotLoad, dotLoadActive, dotsBlock } from '../../styles/styles';

/*
export class Loading extends React.Component<
  { quantity: number },
  { activeDot: number }
> {
  state = {
    activeDot: 0,
  };

  intervalId: number | null = null;

  changeDots() {
    this.intervalId = setInterval(() => {
      this.setState((prev) => ({
        activeDot:
          prev.activeDot + 1 === this.props.quantity ? 0 : prev.activeDot + 1,
      }));
    }, 100);
  }

  componentDidMount(): void {
    this.changeDots();
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const range = Array.from({ length: this.props.quantity }, (_, i) => i);
    return (
      <div data-testid="loading" className={dotsBlock}>
        {range.map((_, index) => {
          return (
            <div
              data-testid="dot"
              key={index}
              className={
                index === this.state.activeDot ? dotLoadActive : dotLoad
              }
            ></div>
          );
        })}
      </div>
    );
  }
}
*/

export const Loading = ({ quantity }: { quantity: number }) => {
  const [activeDot, setActiveDote] = useState<number>(0);

  // создать из quantity массив индексов, например [0,1,2,3,4,5]
  const arrRange = Array.from({ length: quantity }, (_, ind) => ind);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveDote((prev) => (prev + 1 === quantity ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [quantity]);

  return (
    <div data-testid="loading" className={dotsBlock}>
      {arrRange.map((_, index) => {
        return (
          <div
            data-test="dot"
            key={index}
            className={index === activeDot ? dotLoadActive : dotLoad}
          ></div>
        );
      })}
    </div>
  );
};

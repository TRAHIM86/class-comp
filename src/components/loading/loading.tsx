import React from 'react';
import { dotLoad, dotLoadActive, dotsBlock } from '../../styles/styles';

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
      <div className={dotsBlock}>
        {range.map((_, index) => {
          return (
            <div
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

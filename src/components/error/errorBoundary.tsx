import React, { type ReactNode } from 'react';
import type { ChildProps, StateErrorBoundary } from '../../types';

export class ErrorBoundary extends React.Component<
  ChildProps,
  StateErrorBoundary
> {
  constructor(props: ChildProps) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError(): StateErrorBoundary {
    return { isError: true };
  }

  render(): ReactNode {
    if (this.state.isError) {
      return (
        <div>
          SORRY!!! A simulated rendering error occurred. To remove this text,
          please submit a hero request.
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

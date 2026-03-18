import React, { type ReactNode } from 'react';
import type { ChildProps, StateError } from '../../../types';

export class ErrorBoundary extends React.Component<ChildProps, StateError> {
  constructor(props: ChildProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): StateError {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
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

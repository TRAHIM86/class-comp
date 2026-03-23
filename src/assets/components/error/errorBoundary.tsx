import React, { type ReactNode } from 'react';
import type { ChildProps, StateError } from '../../../types';

export class ErrorBoundary extends React.Component<ChildProps, StateError> {
  constructor(props: ChildProps) {
    super(props);
    this.state = { isError: false, errorStatus: '' };
  }

  static getDerivedStateFromError(): StateError {
    return { isError: true, errorStatus: 'Render error' };
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

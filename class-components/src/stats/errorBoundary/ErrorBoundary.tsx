import { Component, ReactNode } from 'react';
interface ErrorBoundaryPropsI {
  children: ReactNode;
}
interface ErrorI {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryPropsI, ErrorI> {
  constructor(props: ErrorBoundaryPropsI) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Houston, we have a problem</div>
    }
    return this.props.children
  }
}

export default ErrorBoundary;


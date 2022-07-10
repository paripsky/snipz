import { Box } from '@chakra-ui/react';
import { Component, ErrorInfo } from 'react';

type Props = {
  children: React.ReactNode;
  resetKey?: string;
  onErrorStateChanged?: (error: Error | null) => void;
};

class ErrorBoundary extends Component<Props, { hasError: boolean; error: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    this.setState({ error: error.message });
    this.props?.onErrorStateChanged?.(error);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
      this.props?.onErrorStateChanged?.(null);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Box>{this.state.error}</Box>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

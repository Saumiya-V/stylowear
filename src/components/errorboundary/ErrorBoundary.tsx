import React from "react";
import type { ErrorState, Props } from "@/types/type";
import { container, details, heading } from "@/styles/errorStyles";


export class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Caught by ErrorBoundary", error, errorInfo);
    this.setState({ error, errorInfo });
     console.log(this.state.error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={container}>
          <h2 className={heading}>Something went wrong.</h2>
          {this.state.error && (
            <details className={details}>
              <summary className="cursor-pointer">View error details</summary>
              {this.state.error.toString()}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

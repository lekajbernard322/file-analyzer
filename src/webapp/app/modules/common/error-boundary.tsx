import React from 'react';

interface IErrorBoundaryProps {
    readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
    readonly error: any;
    readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    readonly state: IErrorBoundaryState = { error: undefined, errorInfo: undefined };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        const { errorInfo } = this.state;
        if (errorInfo) {
            return (
                <div>
                    <h2 className="error">An unexpected error has occurred.</h2>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

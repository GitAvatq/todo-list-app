import React from 'react';
interface State {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логируем в консоль — позже можно отправлять на сервер
    // чтобы получить детальный ошибки вывод ошыбки
    //  removeChild потипу этих
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-root">
          <h2>Произошла ошибка в приложении</h2>
          <pre className="error-boundary-pre">{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}


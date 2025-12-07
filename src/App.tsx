import ErrorBoundary from './Error';
import { LogicaHousting } from './todo_list/LofisticaHTTPS/logistica';
import HostingHTTPS from './todo_list/LofisticaHTTPS/hosting';

import './App.css';

function App() {

  return (
    <>
      <div>
        <HostingHTTPS/>
        <h1>Начинаем верстку</h1>
            <ErrorBoundary>
          <LogicaHousting />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;

import ErrorBoundary from './Error';
import { LogicaHousting } from './todo_list/LofisticaHTTPS/logistica';
import HostingHTTPS from './todo_list/LofisticaHTTPS/hosting';
import Burgermenu from './todo_list/BurgerMenu/BergerMenu';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Burgermenu/>
      <div>
        <HostingHTTPS/>
        <h1>Начинаем верстку</h1>
            <ErrorBoundary>
          <LogicaHousting />
        </ErrorBoundary>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;

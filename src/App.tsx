import ErrorBoundary from './Error';
import { LogicaHousting } from './todo_list/LofisticaHTTPS/logistica';
import HostingHTTPS from './todo_list/LofisticaHTTPS/hosting';
import BurgerMenu from './todo_list/BurgerMenu/BergerMenu';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
function App() {

  return (
    <BrowserRouter>
      <BurgerMenu />
      <div>
        <HostingHTTPS />
        <ErrorBoundary>
          <LogicaHousting />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;

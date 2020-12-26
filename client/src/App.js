import Main from './components/mainComponent';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';
import './App.css';


const store = configureStore();

function App() {
  return (
    <Provider store = {store}>
        <BrowserRouter>
          <div >
            <Main />
          </div>
        </BrowserRouter>
    </Provider>
    
  );
}

export default App;

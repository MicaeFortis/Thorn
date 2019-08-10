import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import { stores } from './store/Stores';

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>
    , document.getElementById('root'));
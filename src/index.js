import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import ScrollToTop from './helpers/ScrollToTop'
import App from './components/app'
import 'semantic-ui-css/semantic.min.css';
import './index.css';

//

let render = () => {
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
if (module.hot) {
  module.hot.accept('./components/app', () => {
    setTimeout(render);
  });
}
}


store.firebaseAuthIsReady.then(() => {
  render();
  registerServiceWorker();
})

//React
import React from 'react'
import ReactDOM from 'react-dom/client'

//Redux
import { Provider } from 'react-redux';
import Store from './Redux/Store.jsx';


//component
import App from './App.jsx'




//intl
import { IntlProvider } from 'react-intl';

//languages
import Arabic from './Lang/Messages/Arabic.js';
import English from './Lang/Messages/English.js';

const lang = Store.getState().langSlice.lang

const messages = {
  ar: Arabic,
  en: English,
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
      <IntlProvider locale={lang} messages={messages[lang]}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </IntlProvider>
  </Provider>,
)

//React
import { useEffect } from "react";
//Redux
import { Provider } from 'react-redux';
import Store from './Redux/Store.jsx';
//style
import "./Assets/Styles/App.css"
import CustomThemeProvider from "./Theme/CustomThemeProvider";
//Components
import CustomRouterProvider from "./Router/CustomRouterProvider";
import { CustomSnackBar } from "./Components";
//intl
import { IntlProvider } from 'react-intl';
//languages
import Arabic from './Lang/Messages/Arabic.js';
import English from './Lang/Messages/English.js';
//get page language
const lang = Store.getState().langSlice.lang

const messages = {
  ar: Arabic,
  en: English,
}

function App() {
  //direction
  const direction = lang === 'ar' ? 'rtl' : 'ltr'; 
  useEffect(() => {
    document.dir = direction
  }, [direction])
  return (
    <Provider store={Store}>
      <IntlProvider locale={lang} messages={messages[lang]}>
        <CustomThemeProvider>
            {/* Router provider */}
            <CustomRouterProvider />
            {/* Snack Bars */}
            <CustomSnackBar />
        </CustomThemeProvider>
      </IntlProvider>
    </Provider>
  )
}
export default App

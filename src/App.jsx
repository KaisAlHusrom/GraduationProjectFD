//React
import { useEffect } from "react";


//material UI
// import {
//   Typography
// } from "@mui/material"

//style
import "./Assets/Styles/App.css"
import CustomThemeProvider from "./Theme/CustomThemeProvider";



//redux
import { useSelector } from "react-redux";
import CustomRouterProvider from "./Router/CustomRouterProvider";



//set page direction
const getDirection = (lang) => {
  // You can adjust this logic based on your requirements.
  return lang === 'ar' ? 'rtl' : 'ltr';
};


function App() {
  //lang
  const lang = useSelector(state => state.langSlice.lang)

  //direction
  const direction = getDirection(lang); 
  useEffect(() => {
    document.dir = direction
  }, [direction])



  return (
      <CustomThemeProvider>
        <CustomRouterProvider />
      </CustomThemeProvider>
  )
}

export default App

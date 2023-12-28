//React
import { useEffect } from "react";

//router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//material UI
// import {
//   Typography
// } from "@mui/material"

//style
import "./Assets/Styles/App.css"
import CustomThemeProvider from "./Theme/CustomThemeProvider";

//components
import {
  CustomLinearProgress,
  CustomCircularProgress
} from "./Components"

//pages
import { Admin, DesignControlPage } from "./Pages";

//redux
import { useSelector } from "react-redux";



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

  //download progresses
  const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)
  const openCircularProgress = useSelector(state => state.downloadPageSlice.openCircularProgress)

  return (
    <CustomThemeProvider>
      {
        openLinearProgress && <CustomLinearProgress />
      }
      {
        openCircularProgress && <CustomCircularProgress />
      }
      <Router>
        <Routes>
          <Route exact path="/admin-dashboard" element={<Admin />} />
          <Route path="/admin-dashboard/design-control" element={<DesignControlPage />} />
        </Routes>
      </Router>
      

      {/* <Typography variant="h1" mb={theme.spacing()}>h1</Typography>
      <Typography variant="h2">h2</Typography>
      <Typography variant="h3">h3</Typography>
      <Typography variant="h4">h4</Typography>
      <Typography variant="h5">h5</Typography>
      <Typography variant="h6">h6</Typography>
      <Typography variant="subtitle1">subtitle1</Typography>
      <Typography variant="subtitle2">subtitle2</Typography>
      <Typography variant="body1">body1</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography variant="button">button</Typography><br />
      <Typography variant="caption">caption</Typography> <br />
      <Typography variant="overline">overline</Typography> <br /> */}
    </CustomThemeProvider>

  )
}

export default App

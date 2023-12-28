import React , {createContext , useContext, useState} from "react";



const StateContext = createContext();



const initialState = {
chat:false, 
cart : false,
userProfile: false,
notification:false
}


export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (clicked) => {
    setIsClicked((prevIsClicked) => ({ ...initialState, [clicked]: true }));
  };

  const [screenSize, setScreenSize] = useState()

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, handleClick, isClicked, setIsClicked  , screenSize , setScreenSize}}
    >
      {children}
    </StateContext.Provider>
  );
};


export const UseStateContext = ()=> useContext(StateContext)
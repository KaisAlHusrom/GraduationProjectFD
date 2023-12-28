import React , {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'

import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import avatar from '../data/avatar.jpg'
import {Cart , Chat , Notification , UserProfile} from '.'
import { UseStateContext } from '../context/ContextProvider'

const NavButton = ({title , customFunc , icon , dotColor , color })=> (
  <TooltipComponent
  content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} 
    style={{color}}
    className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span style={{backgroundColor:dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />

      {icon}

     
    </button>
  </TooltipComponent>
)


const Navbar = () => {

  const {activeMenu , setActiveMenu , handleClick , isClicked , setIsClicked , screenSize , setScreenSize} = UseStateContext(); 


  useEffect(() => {
    const handleResize = ()=> setScreenSize(window.innerWidth)
    window.addEventListener('resize' , handleResize)
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() =>{
    if(screenSize <=900) {
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  }, [screenSize])


  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
    <NavButton title="Menu" customFunc={()=> setActiveMenu((prev) => !prev)} 
    color="blue" 
    icon={<AiOutlineMenu /> }
    dotColor='none' 
    />
    <div className="flex">


  
    <NavButton title="Cart" customFunc={() => handleClick('cart')} 
    color="blue" 
    icon={<FiShoppingCart /> } 
    dotColor='none' 

    />

  <NavButton title="Chat" customFunc={() => handleClick('chat')} 
    color="blue" 
    dotColor="#03c9d7"
    icon={<BsChatLeft /> } 
    />

  <NavButton title="Notifications" customFunc={() => handleClick('notification')} 
    color="blue" 
    dotColor="#03c9d7"
    icon={<RiNotification3Line /> } 
    />
      <TooltipComponent content='Profile' position='BottomCenter'>
        <div className="flex gap-2 cursor-pointer p-1  hover:bg-light-gray rounded-lg items-ceneter"
          onClick={()=> handleClick('userProfile')}
        > 
        <img src={avatar} className='rounded-full w-8 h-8 '  alt="" />
        <p>
          <span className='text-gray-400 text-14'>Hi , </span>
          {' '}
          <span className='text-gray-400 font-bold ml-1 text-14'>Abdullah</span>
        </p>
        <MdKeyboardArrowDown className='text-gray-400  text-14'></MdKeyboardArrowDown>
        </div>
      </TooltipComponent>

    {isClicked.cart && (<Cart />)}
    {isClicked.chat && (<Chat />)}
    {isClicked.notification && (<Notification />)}
    {isClicked.userProfile && (<UserProfile />)}

    </div>

    </div>
  )
}

export default Navbar
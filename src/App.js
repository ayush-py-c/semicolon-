import React from 'react'
import FalloutSurvivalNetwork from './appy';
import GlowingButton from './glowbutton';

 const App = () => {

  return (
    <div>
    <div className='bg-black nosc'>
       <div className='fixed z-50 scale-[25%] left-[29.3rem] top-96'>
        <GlowingButton ClickEvent={()=>{
            window.location.href = "#survival"
        }}/>
       </div>
       <div className='fixed z-50 scale-[25%] right-[28.1rem] top-96'>
        <a href='http://127.0.0.1:5000/resources' target='blank'><GlowingButton /></a>
       </div>
       <div className='fixed z-50 scale-[25%] left-[40.0rem] top-96'>
        <a href='http://127.0.0.1:5000/monster_survivors'><GlowingButton /></a>
       </div>
        <img className='w-screen pointer-events-none fixed z-40 h-screen object-fit object-[0%_-0%] bg-' src='bg.png'></img>
    <div className='scale-[60%] translate-x-9 -translate-y-9'>
        <FalloutSurvivalNetwork/>
    </div>
    </div></div>
    
  )
}
export default App;
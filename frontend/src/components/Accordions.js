import {  useEffect, useRef } from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import Accordion from "./Accordion"

function Accordions(props) {
   
    const accordions = useRef(null)
    const ready = useRef(true)
    
    useEffect(()=>{
        if(ready.current){
            
            ready.current = false
            accordions.current.children[0].classList.add('show')
            Array.from(accordions.current.children).forEach(wrapper => {
                if(wrapper.classList.contains('show')){
                 
                    wrapper.querySelector('.content').style.maxHeight = wrapper.querySelector('.content').scrollHeight  + 30 + "px"
                    wrapper.querySelector('.accordion--icon').style.transform  = 'rotate(180deg)'
                }
                wrapper.querySelector('span').addEventListener('click', (e)=>{
                    const parent = e.target.parentElement 
                    const icon = e.target.querySelector('.accordion--icon') 
                    parent.classList.toggle('show')
                    if(parent.classList.contains('show')){
                        parent.querySelector('.content').style.maxHeight = wrapper.querySelector('.content').scrollHeight  + 30 + "px"
                       icon.style.transform  = 'rotate(180deg)'
                    }else{
                        parent.querySelector('.content').style.maxHeight = null
                        icon.style.transform = 'rotate(0deg)'
                    }
                    Array.from(accordions.current.children).forEach(w => {
                        if( w !== parent){
                            w.classList.remove('show')
                            w.querySelector('.accordion--icon').style.transform = 'rotate(0deg)'
                            w.querySelector('.content').style.maxHeight = null
                        }
                    })
                })
            })
        }
    },[])
    
    return (
        <div className="accordion flex justify-center items-center flex-col" ref={accordions}>
            {props.data ?
            props.data.map(item => (
                <Accordion 
                    key={item.title}
                    data={item}
                />
            ))
            :
            (
                <Player
                src= 'https://assets1.lottiefiles.com/packages/lf20_Stt1R6.json'
                className="player"
                loop
                autoplay
              />
            )    
        }

         
          
        </div>
        
    )
}


export default Accordions
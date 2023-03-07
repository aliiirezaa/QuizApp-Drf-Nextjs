import { useEffect, useRef } from "react";
import Typed from "typed.js";

function TypedText({content}) {
  const el = useRef(null)
  useEffect(()=>{
    const typed = new Typed(el.current, {
      strings: content,
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
      showCursor: true,
    })
    return () => {
      typed.destroy()
    }
  },[])
  return (
    <div ref={el} className="text-6xl text-[#FAFAFA]"></div>
  )
}

export default TypedText
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../feature/authy/AuhSlice'
import { useRouter } from 'next/router'

function Navbar() {
    const router = useRouter()
   const dispatch = useDispatch()
   const {accessToken} = useSelector((state)=> state.auth)

   const [activeScrollTop, setActiveScrollTop] = useState(false)
   const handleLogout = (e) => {
    dispatch(logout())
    router.push('/login')
   }
   
    useEffect(()=>{
        const handelScroll = (e) => {
                if (window.scrollY > 150) {
                    setActiveScrollTop(true)
                }else {
                    setActiveScrollTop(false)
                }

           
        } 
        window.addEventListener('scroll', handelScroll)
        return () => {
            window.removeEventListener('scroll', handelScroll)
        }
    },[])
  return (
    <div className={activeScrollTop ? 'sticky top-0 left-0 w-full h-10 flex justify-between items-center shadow-lg px-8 py-12 z-10 bg-white transition-all duration-500': 'sticky top-0 left-0 w-full h-10 flex justify-between items-center  px-6 py-10 z-10 bg-[#4fc3f7] transition-all duration-500'}>
        <div className="navbar--logo relative w-[70px] h-[70px] overflow-hidden ">
            <div className="image absolute top-0 left-0 w-full h-full object-cover cursor-pointer">
                <Link href={'/'}>
                    <Image src="/image/logo.png" width={70} height={70} priority={true} alt="logo" />
                </Link>
            </div>
        </div>
        {accessToken != "" ?  
        (
            <div className="navbar--siginIn">
                <button className='px-8 py-2 rounded-sm bg-[#2196F3] text-[#FAFAFA]' onClick={handleLogout}>
                    خروج
                </button>
            </div>
        )
        :
        (
            <div className="navbar--siginIn">
                <button className='px-8 py-2 rounded-sm bg-[#2196F3] text-[#FAFAFA]' >
                    <Link href="/login">ورود</Link>
                </button>
            </div>
        )
        }
        
    </div>
  )
}

export default Navbar
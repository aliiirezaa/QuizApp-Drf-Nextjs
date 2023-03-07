import Layout from "@/layout/Layout"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { clientId } from "@/config"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "feature/authy/AuhSlice"


function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {accessToken, isLoading, isError, isSuccess} = useSelector(state=> state.auth)

    const loginButton = useRef(null)
    const ready = useRef(true)
    const handleCredentialResponse = (response) => {
        const access = response.credential
        dispatch(login(access))
    }
    useEffect(() => {
        if (ready.current){
            ready.current = false

        
            if (window) {
                window?.google?.accounts.id.initialize({
                    client_id: clientId ,
                    callback: handleCredentialResponse
                });
                window?.google?.accounts.id.renderButton(
                    loginButton.current,
                    {
                        them: 'outline',
                        text: "ورود با اکانت گوگل"
                    }
                )
            }
        }


    }, [])
    useEffect(()=>{
       
        if(isSuccess && !isLoading && !isError){
            dispatch(reset())
            const previosuPage = router.back()
            previosuPage ? router.back(): router.push('/')
           
        }
    },[isSuccess, accessToken])
    return (
        <Layout title="ورود">
            {isLoading ? 
            null
            :
            (<div className="login--google absolute top-0 left-0 w-full h-screen flex justify-center items-center" ref={loginButton}></div>)
            }

        </Layout>
    )
}

export default Login
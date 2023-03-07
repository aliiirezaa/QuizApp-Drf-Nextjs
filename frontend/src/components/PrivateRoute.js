import {useEffect, Fragment} from 'react' 
import { useSelector } from 'react-redux'
import { useRouter } from "next/router"

export default function PrivateRoute({children}) {
    const {accessToken} = useSelector((state)=> state.auth)
    const router = useRouter()
    useEffect(()=>{
        if(accessToken == ""){
            router.push('/login')
        }
    },[])
    
    return(
        <Fragment>
            {accessToken != "" ? 
            (
                <>
                {children}
                </>
            )
            :
            null
            }

        </Fragment>
    )
}

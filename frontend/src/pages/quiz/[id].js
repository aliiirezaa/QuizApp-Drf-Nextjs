import { Fragment } from "react"
import Layout from "@/layout/Layout"
import PrivateRoute from "@/components/PrivateRoute"
import QuizBox from "@/components/QuizBox"
import AxiosInstance from "@/api/AxiosInstance"
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router'

function Quiz(props) {
  const router = useRouter()
  const {id} = router.query

  return (
    <Fragment>
        <Layout title="کوییز">
         <PrivateRoute>
            <div className="bg-[#81D4FA] absolute top-0 left-0 w-full h-screen overflow-hidden flex justify-center items-center ">
             {props.data? 
             <QuizBox data={props.data} id={id} />
             :
             (
                setTimeout(()=>(
                  <Player
                  src= 'https://assets1.lottiefiles.com/packages/lf20_Stt1R6.json'
                  className="player"
                  loop
                  autoplay
                />
                ),2000)
          )    
             
             }
            </div>
         </PrivateRoute>
          
        </Layout>
    </Fragment>
   
  )
}

export async function getStaticProps(context){
  const param = context.params
  const id = +param.id
  try{

    const response = await AxiosInstance.get(`quiz/${id}/`)
    if(response.status == 200){
      const data = response.data 
      return{
        props:{
          data:data
        }
      }
    }else{

      return {
        props:{
          error:response.data || response.data.message
        }
      }
    }
  }
  catch(error){

    let message = ""
    if (error?.response?.status == 500) {
      message = "خطایی در بخش سرور اتفاق افتاده است"
    }
    else if (error?.response?.status == 400) {
      message = error?.response?.data?.message || error?.response?.data || error.toString()
    }
    else if (error?.response?.status == 404) {
      message = error?.response?.data?.message || error?.response?.data || error.toString()
    }
    else if (error?.response?.status == 405) {
      message = `method ${error.response.status} not Allowed`
    }
    return {
      props: {
        error: message,

      }
    }
  } 
}
export async function getStaticPaths(){
  
  const response = await AxiosInstance.get('quizes/')
  if(response.status == 200){
    const quizes = response.data
    const ids = quizes.map(item => item.id)
    const pathWithParams = ids.map(id => ({params:{id:id.toString()}}))
    return {
        paths:pathWithParams,
        fallback:true
    }
  }
  
  
}

export default Quiz
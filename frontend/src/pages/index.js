import Layout from "../layout/Layout"
import TypedText from "@/components/TypedText"
import Accordions from "@/components/Accordions"
import AxiosInstance from "@/api/AxiosInstance"
export default function Home(props) {

  const contents = ['کوییـــزی ', 'خودت رو به چالـــش بکش', 'ورزشی', 'ریاضیات', 'عمومی']
  return (

    <Layout title="خانه">
      <section className='relative -top-[80px] left-0 w-full h-screen p-x-[35px] p-y-[20px] bg-[#4FC3F7]' id="home" >
        <div className="absolute top-[40%] left-[0] w-full max-h-full flex justify-center items-center">
          <TypedText content={contents} />
        </div>

        <div className="wave absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,32L6.2,58.7C12.3,85,25,139,37,160C49.2,181,62,171,74,192C86.2,213,98,267,111,261.3C123.1,256,135,192,148,181.3C160,171,172,213,185,229.3C196.9,245,209,235,222,202.7C233.8,171,246,117,258,106.7C270.8,96,283,128,295,122.7C307.7,117,320,75,332,80C344.6,85,357,139,369,165.3C381.5,192,394,192,406,186.7C418.5,181,431,171,443,154.7C455.4,139,468,117,480,112C492.3,107,505,117,517,122.7C529.2,128,542,128,554,133.3C566.2,139,578,149,591,176C603.1,203,615,245,628,245.3C640,245,652,203,665,202.7C676.9,203,689,245,702,250.7C713.8,256,726,224,738,197.3C750.8,171,763,149,775,165.3C787.7,181,800,235,812,234.7C824.6,235,837,181,849,165.3C861.5,149,874,171,886,186.7C898.5,203,911,213,923,208C935.4,203,948,181,960,165.3C972.3,149,985,139,997,144C1009.2,149,1022,171,1034,165.3C1046.2,160,1058,128,1071,96C1083.1,64,1095,32,1108,26.7C1120,21,1132,43,1145,74.7C1156.9,107,1169,149,1182,149.3C1193.8,149,1206,107,1218,106.7C1230.8,107,1243,149,1255,144C1267.7,139,1280,85,1292,90.7C1304.6,96,1317,160,1329,181.3C1341.5,203,1354,181,1366,181.3C1378.5,181,1391,203,1403,197.3C1415.4,192,1428,160,1434,144L1440,128L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path></svg>
        </div>
      </section>

      <section className="section" id="main">
        <div className="title text-center mb-8">
          <span className="relative text-[#81D4FA] text-[22px]  before:content-[''] before:absolute before:-bottom-2 before:left-0 before:w-full before:h-1 before:bg-[#81D4FA] ">دسته بندی</span >
        </div>
        {props.data ?
           <Accordions data={props.data} />
           :
           props.error ?
           (
            <p className="text-red-500" >{props.error}</p>  
           )
           :
           null
      }
       
      </section>
    </Layout>

  )
}

export async function getStaticProps() {

  try {
    const response = await AxiosInstance.get('categories/')
    if(response.status == 200){
      return {
        props:{
          data:response.data
        }
      }
    }else {
      return {
        notFound:true
      }
    }
    

  }
  catch (error) {

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
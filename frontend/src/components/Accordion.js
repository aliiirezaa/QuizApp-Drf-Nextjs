import { useRouter } from "next/router"
import { Fragment} from "react"

export default function Accordion(props) {

    const router = useRouter()
    
    const infoBox = (e) => {
        let title = e.target.dataset.title 
        let qeCount = e.target.dataset.count 
        let time = e.target.dataset.time
        let difficulty = e.target.dataset.difficulty
        let requireToPass =  e.target.dataset.requiretopass
        let url = e.target.dataset.url
        difficulty = difficulty == 'easy' ? 
                        "آسان"
                        :
                        difficulty == 'medium' ? 
                        "متوسط"
                        :
                        difficulty == 'hard' ? 
                        "سخت"
                        :
                        null

        const wrapper = document.createElement('div')
        const wrapperClass = ['wrapper' ,'fixed', 'z-10', 'top-0' ,'left-0', 'w-full', 'h-full', 'bg-[#000]', 'opacity-50', 'overflow-hidden', 'transition-all','duration-700', ]
        wrapper.classList.add(...wrapperClass)
        const infoBox = document.createElement('div')
        const infoBoxClass = ['info--box', 'fixed', 'z-50', 'top-[50%]', 'right-[50%]', 'translate-x-[50%]', 'translate-y-[-50%]', 'w-[400px]','max-h-fill', 'bg-white', 'p-6', 'rounded-md'] 
        infoBox.classList.add(...infoBoxClass)
        infoBox.innerHTML = `
                <div class="info--title text-[22px] mb-3  text-[#0288D1]">${title}</div>
                    <ul class="info--list space-y-4 text-[#212121]">
                        <li class="info--item">شما مجاز به انتخاب یک گزینه هستید</li>
                        <li class="info--item">تعداد سوالات شما ${qeCount} هست</li>
                        <li class="info--item">سطح سوالات ${difficulty}</li>
                        <li class="info--item text-[#E53935]">برای هر سوال ${time} ثانیه وقت دارید</li>
                        <li class="info--item text-[#E53935]">حداقل امتیاز قبولی در این آزمون ${requireToPass} از 100 میباشد</li>

                    </ul>
                    <div class="buttons mt-7 mb-2">
                        <button class="continue outline-none  px-5 py-3 rounded-md ml-3 text-white bg-[#388E3C]">ادامه میدهم</button>
                        <button class="exit outline-none px-5 py-3 rounded-md text-white bg-[#C62828]">انصراف</button>
                    </div>
                </div>
        
        `
        document.body.append(wrapper)     
        document.body.append(infoBox) 
        infoBox.classList.add('scale-100')   
        const continueButton = infoBox.querySelector('.buttons .continue')
        const exitButton = infoBox.querySelector('.buttons .exit')
        exitButton.addEventListener('click', (e)=>{
            document.body.removeChild(wrapper)
            document.body.removeChild(infoBox)
        })
        continueButton.addEventListener('click', (e)=>{
            document.body.removeChild(wrapper)
            document.body.removeChild(infoBox)
            router.push(`/quiz/${url}/`)
        })
     
    }
 
    return (
        <div className='relative shadow-lg rounded-lg text-[white] mb-3 bg-[#81D4FA] max-w-[700px] w-[700px]'>
            <span className="px-[16px] py-[22px] flex flex-row justify-between items-center cursor-pointer">
                <h3 className="text-[22px] block pointer-events-none">{props.data.title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 accordion--icon transition-all duration-700 pointer-events-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        
            <div className="content px-[16px]  max-h-[0] overflow-hidden transition-all duration-700 ">
                {props.data.content.map(item => 
                
                    (
                        <Fragment key={item.id}>
                        <div  className="title" >عنوان: {item.title}</div>
                        <div className="difficulty">
                            سطح دشواری: 
                            {item.difficulty == 'easy'?
                             "آســان"
                             :
                             item.difficulty == 'medium' ?
                             "متوســط"
                             :
                             item.difficulty == 'hard' ?
                             "سخت"
                             :
                             null
                             }
                        </div>
                        <button className="outline-none px-5 py-2 rounded-md bg-white text-[#81D4FA] mb-3 mt-4" 
                            data-title={item.title}
                            data-difficulty={item.difficulty}
                            data-count={item.number_of_questions}
                            data-time={item.time}
                            data-requiretopass={item.require_to_pass}
                            data-url={item.id}
                            onClick={infoBox}
                            >ورود
                            </button>
                        </Fragment>
                    )
                )}
                
            </div>
        </div>
    )
}

import { useRef, useEffect, useState, Fragment } from 'react'
import Chart from './Chart'
import Link from 'next/link'
import axios from 'axios'

function QuizBox(props) {
    const [data, setData] = useState(props.data)
    const [resultData, setResultData] = useState()
    const [show, setShow] = useState(true)

    const ready = useRef(true)
    const quizBox = useRef(null)
    const title = useRef(null)
    const timerQuiz = useRef(null)
    const timeLine = useRef(null)
    const question = useRef(null)
    const optionList = useRef(null)
    const nextButton = useRef(null)
    const queTotal = useRef(null)
    const resultBox = useRef(null)

    const correctIcon = `<span class="w-6 h-6 rounded-full bg-green-500 p-1 text-white flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>
                        `
    const inCorrectIcon = `<span class="w-6 h-6 rounded-full bg-red-500 p-1 text-white flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
  
                        </span>
                        `
    let counter = useRef()
    let counterLine = useRef()
    let que_count = 0
    let que_total = 1



    useEffect(() => {
        if (ready.current) {
            ready.current = false
           
            let formData = {}
            const timerCounter = (time) => {

                timerQuiz.current.querySelector('.timer_sec').textContent = time
                counter.current = setInterval(timer, 1000)
                async function timer() {
                    time--
                    timerQuiz.current.querySelector('.timer_sec').textContent = time
                    if (time <= 9) {
                        let zeroTime = timerQuiz.current.querySelector('.timer_sec').textContent

                        timerQuiz.current.querySelector('.timer_sec').textContent = "0" + zeroTime
                    }
                    if (time < 0) {
                        clearInterval(counter.current)
                        const q = question.current.querySelector('span').innerText
                        const correctedAnswer = await (async () => {
                            const content = {
                                'question': q
                            }
                            const response = await axios.post('/api/correctAnswer', content)
                            return response.data.corrent_answer

                        })()
                        timerQuiz.current.querySelector('.timer_sec').textContent = "00"
                        timerQuiz.current.querySelector('.timer--left').textContent = "اتمام زمان"
                        const option_list = [...optionList.current.children]

                        option_list.forEach(option => {

                            if (option.innerText == correctedAnswer) {
                                option.classList.add('text-white')
                                option.classList.add('bg-green-300')
                                option.insertAdjacentHTML('beforeend', correctIcon)
                            }
                        })
                        formData[q] = null
                        if (que_total >= data.length) {
                            nextButton.current.textContent = 'اتمام'
                            nextButton.current.click()
                            nextButton.current.classList.add('disable')

                        } else {
                            nextButton.current.textContent = 'بعدی'

                        }
                        nextButton.current.classList.add('active_next_button')


                    }
                }
            }

            const timeLineCounter = (value) => {

                timeLine.current.style.width = 0 + "px"
                counterLine.current = setInterval(timer, 35)
                function timer() {
                    value++
                    timeLine.current.style.width = value + "px"
                    if (value >= quizBox.current.clientWidth) {
                        clearInterval(counterLine.current)
                    }

                }

            }

            const questionCounter = (count, total) => {

                const totalQuestionCount = `<span>${count} از ${total}</span>`
                queTotal.current.innerHTML = totalQuestionCount
            }

            const selectedOptions = async (e) => {
                clearInterval(counter.current)
                clearInterval(counterLine.current)

                const userAnswer = e.target.innerText
                const correctedAnswer = await (async () => {
                    const content = {
                        'question': question.current.querySelector('span').textContent
                    }
                    const response = await axios.post('/api/correctAnswer', content)
                    return response.data.corrent_answer

                })()

                let q = question.current.querySelector('span').textContent

                if (userAnswer == correctedAnswer) {

                    e.target.classList.add('text-white')
                    e.target.classList.add('bg-green-300')
                    e.target.insertAdjacentHTML('beforeend', correctIcon)
                    formData[q] = e.target.innerText

                }
                else {

                    formData[q] = e.target.innerText
                    e.target.classList.add('text-white')
                    e.target.classList.add('bg-red-300')
                    e.target.insertAdjacentHTML('beforeend', inCorrectIcon)
                    Array.from(optionList.current.children).forEach(el => {

                        if (el.innerText == correctedAnswer) {

                            el.classList.add('text-white')
                            el.classList.add('bg-green-300')
                            el.insertAdjacentHTML('beforeend', correctIcon)
                        }
                    })

                }
                Array.from(optionList.current.children).forEach(el => {

                    el.classList.add('disable')
                })
                if (que_total >= data.length) {
                    nextButton.current.textContent = 'اتمام'
                    nextButton.current.click()
                    nextButton.current.classList.add('disable')

                } else {
                    nextButton.current.textContent = 'بعدی'

                }
                nextButton.current.classList.add('active_next_button')

            }

            const showQuestion = (index, que_total) => {
                const quizData = data[index]
                timerQuiz.current.querySelector('.timer_sec').textContent = quizData.time

                timerCounter(quizData.time, quizData.answer)
                timeLineCounter(0)
                questionCounter(que_total, quizData.number_of_questions)
                title.current.textContent = quizData.topic
                const queTag = `سوال: <span>${quizData.text}</span> `
                question.current.innerHTML = queTag
                optionList.current.innerHTML = ""
                quizData.options.forEach((option) => {
                    const liTag = ` <li class="option--item bg-[#EEEEEE] rounded-md p-2 mb-2 cursor-pointer flex justify-between">
                                            ${option}
                                        </li>`
                    optionList.current.innerHTML += liTag
                })
                const option_list = [...optionList.current.children]
                option_list.forEach(option => {

                    option.addEventListener('click', selectedOptions)
                })


            }

            const handelnextButton = async (e) => {
               
                if (que_count < data.length - 1) {
                    que_count++
                    que_total++
                    showQuestion(que_count, que_total)

                    nextButton.current.classList.remove('active_next_button')
                }
                else {

                    clearInterval(counter.current)
                    clearInterval(counterLine.current)
                  
                    const resultQuiz = await (async () => {
                        const response = await axios.post(`/api/result/${props.id}`, formData)
                        if (response.status == 200) {
                            return response.data
                        }
                    })()
                    quizBox.current.classList.add('hidden')
                    setResultData(resultQuiz)
                    setShow(false)  
                }
            }
            nextButton.current.addEventListener('click',handelnextButton )
            showQuestion(0, 1)
           
            
        }
    }, [])



    return (
        <Fragment>
            {show ?
                (<div className="quiz--box scale-90 text-[#0288D1] w-[450px]  bg-white rounded-t-sm" ref={quizBox}>
                    <header className="relative h-10 px-5 py-8 flex justify-between items-center shadow-md">
                        <div className="title text-[18px] flex-1" ref={title}></div>
                        <div className="timer flex justify-center items-center p-2 bg-[#81D4FA] rounded-md text-white" ref={timerQuiz}>
                            <div className="timer--left text-[14px] ml-2">
                                زمان باقیمانده:
                            </div>
                            <div className="timer_sec p-1 bg-[#0288D1] rounded-md"></div>
                        </div>
                        <div className='timeline absolute bottom-0 right-0 w-[0px] h-[3px] bg-[#0288D1]' ref={timeLine}></div>
                    </header>
                    <section className="mt-4 mb-3 px-5">
                        <div className="question--text mb-3" ref={question}></div>
                        <ul className="option--list" ref={optionList}>

                        </ul>
                    </section>
                    <footer className="mt-2 shadow-md border-t-2 border-[#EEE] px-5 py-3 flex justify-between items-center">
                        <button className="next--button  px-4 py-2 bg-[#81D4FA] text-white outline-none border-none rounded-md " ref={nextButton}></button>
                        <div className="que--tota" ref={queTotal}></div>
                    </footer>
                </div>
                )
                :
                (
                    <div className="result--box transition-all duration-500 text-[#0288D1] w-[450px]  bg-white rounded-t-sm" ref={resultBox}>
                        <header>
                            <div className="title h-15 shadow-md px-3 py-5">مشاهده نتیجه</div>
                        </header>
                        <div className="chart w-[300px] h-[300px] block text-center mx-auto mt-3 mb-4">
                            <Chart labels={["درستی", "اشتباه", "خالی"]} data={[resultData?.score_correct,resultData?.score_incorrect, resultData?.score_null]} />
                        </div>
                        <div className="des px-3">
                            <h3 className="title">حداکثر امتیاز ممکن {resultData?.require_to_pass} </h3>
                            <h3 className="title"> امتیاز شما {resultData?.score_correct} </h3>
                            <p className={resultData?.passed ? 'text-green-500':'text-red-500'}>
                                {resultData?.passed ? "شما این آزمون رو با موفقیت سپری کردید":"متاسفانه در این آزمون قبول نشدید"}
                            </p>
                        </div>
                        <button className='mt-3 px-3 py-3 w-full h-[15] border-t-2 border-[#E0E0E0]'>
                            <Link href='/'>برگشت به صفحه اصلی</Link>
                        </button>
                        

                    </div >
                )
            }



        </Fragment >
    )
}

export default QuizBox
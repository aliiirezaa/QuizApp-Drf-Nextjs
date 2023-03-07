import AxiosInstance from "@/api/AxiosInstance";

export default async function handler(req, res){
    if(req.method === 'POST'){
        const body = req.body
        try{
            const response = await AxiosInstance.post('quiz/correct/answer/', body)
        if (response.status == 200){
            return res.status(200).json(response.data)
        }else{
            return res.status(response.status).json({'data':response.data || response.data.message ,'status':response.status})
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
            return res.status(error.response.status).json({'error':message})
        }
    } else{
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({error:`method ${req.method} not allowed`})
    }
}
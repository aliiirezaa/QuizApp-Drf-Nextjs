import cookie from 'cookie'

export default function handler(req, res){
    if(req.method == 'POST'){
        const data = req.body
        if (data){
           
            return res.status(200).json(data)
        }else{
            return res.status(400).json({'message':'Bad request'})
        }
    }
    else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({'message':`method ${req.method} is not Allowed`})
    }
}
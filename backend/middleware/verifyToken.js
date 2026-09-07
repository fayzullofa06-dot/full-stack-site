const jwt=require('jsonwebtoken')


const verifyToken=(req,res,next)=>{
try {
    console.log(req.header)
const header=req.headers.authorization

    if(!header){
     return     res.status(400).json({
            success:false,
            message:'No token'
        })
    }
    const token=header.split(' ')[1]
    if(!token){
        return res.status(400).json({
            success:false,
            message:'Invalid authorization header'
        })
    }

    const verify=jwt.verify(token,process.env.PASSWORD)
 req.user=verify
 console.log(req.header)
 console.log(req.user)
 next()
    
} catch (error) {
    return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
}

    
}

module.exports={verifyToken}
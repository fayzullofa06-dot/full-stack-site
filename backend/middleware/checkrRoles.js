const checking=(...roles)=>{
     return (req,res,next)=>{

      /*   console.log('USER:', req.user);
        console.log('ALLOWED:', roles); */
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:'No user has been found'
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:'Forbidden'
            })
        }
        next()
     }
}

module.exports={checking}
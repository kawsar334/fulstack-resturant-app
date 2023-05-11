import jwt from "jsonwebtoken";


export const verifyToken = async(req, res, next)=>{
    const token = req.cookies.token; 
    if(token){
             jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({
                message: "token is not valid !",
                success:false,
            });
        }else{
            req.user = user;
            next();
        }
    })
    }else{
        return res.status(401).json({
            message: "you are not authenticated !",
            success:false,
        })
    };
};


//VERIFYTOKEN AND AUTHORIZATION 
export const veritokenAndAutorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        console.log(req.user.id)
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({
                message: "you are not allowed!",
                success:false
            });
        }
    })
}


//VERIFY TOKEN AND ADMIN 
export const verifyTokenAndAdmin = (req, res, next)=>{
        verifyToken(req, res, ()=>{
            if(req.user.isAdmin){
                next();
            }else{
                return res.status(403).json({
                    message: "you are not allowed!",
                    success:false,
                });
            }
        })
}


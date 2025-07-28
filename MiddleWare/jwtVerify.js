import jwt, { decode } from 'jsonwebtoken';

export const ensureJwtValidation=(req,res,next)=>{

const auth=req.headers.authorization;
if(!auth||!auth.startsWith("Bearer ")){
    return res.status(403).json({msg:"Unauthorized user error"});
}

try {

    const token=auth.split(" ")[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    
} catch (error) {
    return res.status(403).json({ msg: "Unauthorized user error" });

}


}
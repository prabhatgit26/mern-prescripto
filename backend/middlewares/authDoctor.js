import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {

        const { token } = req.headers;
        console.log("token : ",token);
        
        if (!token) {
            return res.json({success:false, message:"Not Authorized Doctor Login Again"});
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.docId = token_decode.id;
        next();
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message}); 
    }
}

export default authDoctor;
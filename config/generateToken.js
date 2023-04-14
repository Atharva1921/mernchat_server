import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';


const generateToken = async (id) => {
    try {
        const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'},)
        const userWithToken = await User.findByIdAndUpdate(id,{token}, {new: true});
        return userWithToken.token  ;
    } catch (error) {
        console.log(error);
    }
    
}


export default generateToken;
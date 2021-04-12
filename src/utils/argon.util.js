  
import {hash,verify} from 'argon2';

const hashPassword = async(password) => {
    try{
     return hash(password);
    }
    catch(e){
        throw e;
    }
}

const verifyPassword = async(hashedPassword,password) => {
    const hash = await verify(hashedPassword, password);
    return hash;
}
export {hashPassword, verifyPassword};
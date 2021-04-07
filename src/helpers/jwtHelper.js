import {sign, decode} from 'jsonwebtoken';
require('dotenv').config();

const _jwt_key =  process.env.JWT_KEY;
const signToken = (payloads) => {
    const token  = sign(JSON.parse(JSON.stringify(payloads)), _jwt_key, { expiresIn: 60 * 60 * 5 });
    return token;
}

const decodeToken = (token) => {
    try{
      let decodes = decode(token, _jwt_key);
      return decodes;
      
    }
    catch(e) {
    //   throw e;
      return false;
    }
}

export {signToken, decodeToken  }
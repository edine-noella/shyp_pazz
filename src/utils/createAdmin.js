import models from '../database/models';
import {config} from 'dotenv';
import {hashPassword} from './argon.util';
import {uuiSigner} from './signUniqueId';
config();

const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;
const adminUserName = process.env.ADMIN_USERNAME;
const adminPhone = process.env.ADMIN_PHONE;
const adminName = process.env.ADMIN_NAME;
const adminCountry = process.env.ADMIN_COUNTRY;
const createAdmin = async() => {
    const password = await hashPassword(adminPassword);
    
    const uuid = await uuiSigner();
    const user = {
        id: uuid,
        name: adminName,
        email: adminEmail,
        password: password,
        username: adminUserName,
        phone: adminPhone,
        country: adminCountry,
        userType: 'ADMIN',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
 
    try{
      let adminUser = await models.User.create(user);
      if(!adminUser)
        return console.log('Error occured admin not created');
       console.log("Admin created successfully");
    }
    catch(e){
        console.log('Error occured admin not created, error: '+e);

    }
}
createAdmin();

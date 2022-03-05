// upload file
// download file
const rootDir = require('../utils/rootDir')
const fs = require('fs/promises')
const path = require('path')
const Receiver = require('../database/models/receiver')
const File = require('../database/models/file')


// TODO: check file types.
const uploadFile = async(user_id, fileObject, fileType) => {
    try {
        const filename = fileObject.name
        const tmpPath = fileObject.path
        
        // generate unique filename.
        newName = `${fileType}_${user_id}_${Date.now()}_${filename}`
        
        // join dirs for new Path.
        const newPath = path.join(rootDir, 'files', newName);
        
        // rename file
        await fs.rename(tmpPath, newPath)
        
        
        // insert a row in database.
        const file = await File.create({
            link: newName,
            type: fileType
        })
        return file.id
    } catch(err) {
        console.log(err)
    }
}

const getFile = async(filename) => {
    
    // return final link to file.
    try {
        file = await fs.realpath(path.join(rootDir, 'files', filename))
        return `${process.env.URL}/files/${filename}`
    } catch(err) {
        console.log("ERROR: ", err)
        return null
    }
}

const getFileById = async(file_id) => {
    // console.log({file_id})
    // return final link to file.
    const file = await File.findOne({where: {id: file_id}})
    const filename = file.link
    try {
        const fileExists = await fs.realpath(path.join(rootDir, 'files', filename))
        if(!fileExists) {
            return `${process.env.URL}/files/no-image.png`
        }
        return `${process.env.URL}/files/${filename}`
    } catch(err) {
        console.log("ERROR: ", err)
        return null
    }
}


// user is a receiver also
const getProfile = async(receiverId) => {
    try {
        const receiver = await Receiver.findOne({where: {id: receiverId}, attributes: ['type', 'profileId']})

        if(receiver.profileId == null) {
            return await getFile(receiver.type + '-defaultProfile.png')
        } else {
            return await getFileById(file.link)
        }

    } catch(err) {
        console.log(err)
        return null
    }
}

module.exports = {
    getFile, 
    getFileById,
    getProfile,
    uploadFile
}
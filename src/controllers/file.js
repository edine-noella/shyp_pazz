const formidable = require('formidable')
const FileService = require('../services/file')
const rootDir = require('../utils/rootDir')
const path = require('path')

exports.getFile = async(req, res) => {
    const { filename } = req.params
    const file = await FileService.getFile(filename)

    if(file) {
        const fileLink = path.join(rootDir, 'files', filename) 

        res.sendFile(fileLink)  
    }
    else 
        res.status(404).json({message: 'file not found'})
}

exports.uploadFile = (req, res) => {
    try {
        const form = new formidable.IncomingForm()
        form.uploadDir = path.join(rootDir,'files')
        form.parse(req, async(err, fields, files) => {
            if(err) {
                console.log(err)
            }
            if(!files.file || !fields.type) {
                res.status(400).json({message: 'please fill all fields'})
            }
            const fileId = await FileService.uploadFile(req.user.id, files.file, fields.type)
            
            // return file object to client
            res.status(200).json({id: fileId})
        
        })

    } catch(err) {
        console.log(err)
    }
}
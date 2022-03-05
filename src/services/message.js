const Message = require('../database/models/message')
const FileService = require('./file')
const TextMessage = require('../database/models/textMessage')
const FileMessage = require('../database/models/fileMessage')
const File = require('../database/models/file')
const Op = require('sequelize').Op
const Receiver = require('../database/models/receiver')
const Member = require('../database/models/member')
const socket = require('../utils/socket.io')()


const sendTextMessage = async(messageId, text) => {
	try {
		const result = await TextMessage.create({id: messageId, text})
		return {
			type: 'text',
			text: text
		}
	} catch(err) {
		console.log(err.message)
	}
}


const sendFileMessage = async(messageId, type, file) => {
	try {
		const result = await FileMessage.create({id: messageId, fileId: file})
		return {
			type: messageType,
			[messageType]: await FileService.getFileById(result.fileId)
		}
	} catch(err) {
		console.log(err.message)
	}
}


const sendMessage = async(sender, receiverId, message) => {
	try {
		
		const receiver = await Receiver.findOne({where: {id: receiverId}});
		if(!receiver) {
			return [null, {status:404, message: "group or user not found"}]
		}

		if(receiver.type === 'group') {
			const member = await Member.findOne({where: {user: sender, group: receiverId, isBlocked: false}});
			if(!member) {
				return [null, {status: 405, message: "you are not member of this group to send messages"}]
			}
		}
		// file messages 
		if (message.type !== 'text') {
			//  check if file exists
			const file = await File.findOne({where: {id: message[message.type]}})
			if(!file) {
				return [null, {status: 400, message: "please upload " + message.type + " then send request here"}]
			}
		}

		const msg = await Message.create({sender, receiverId, type: message.type, reply_to: message.reply_to || null})
		
		const messageObj = {
			id: msg.id,
			sender: msg.sender,
			receiver: msg.receiverId,
			createdAt: msg.createdAt,
			updatedAt: msg.updatedAt
		};
		switch(message.type) {
			case 'text':
				messageObj.message = await sendTextMessage(msg.id, message.text)
				break;
			case 'video': 
			case 'image': 
			case 'audio': 
			case 'file': 
				messageObj.message = await sendFileMessage(msg.id, message.type, message[message.type])
				break;
			default: 
				return [null, {status: 400, message: "invalid message"}]
		}


		// send message with socket.io
		socket.sendMessage(messageObj)

		return [messageObj, null]
	} catch(err) {
		console.log(err)
	}
}



// receiverId
const getMessages = async(selfId, receiverId) => {

	try{
		
		const receiver = await Receiver.findOne({where: {id: receiverId}});
		let result;
		if(!receiver) {
			return [null, {status: 404, message: "group or user don't exists"}]
		}
		if(receiver.type === 'user') {

			
			result = await Message.findAll({
				where: {
					[Op.or]: [{
						sender: selfId,
						receiverId: receiverId 
					}, {
						sender: receiverId,
						receiverId: selfId
					}]
				},
				orderBy: ['createdAt', 'desc'],
				limit: 20
			})
		} else {
			// group messages.
			// see if selfId is a member of group
			const membership = await Member.findOne({where: {user: selfId, group: receiverId, isBlocked: false}})
			if(!membership) {
				return [null, {status: 405, message: "You are not member of this group"}]
			}
			result = await Message.findAll({
				where: {receiverId: receiverId},
				orderBy: ['createdAt', 'desc'],
				limit: 20
			})
		}
		
		const messages = await Promise.all(result.map(async message => {
			return await getMessage(message.id)
		}))
		return [messages, null]
	}
	catch(err) {
		console.log(err)

	}
}


const getMessage = async(id) => {
	
	const message = await Message.findOne({where: {id: id}})

	const result = {
		id: message.id,
		sender: message.sender,
		receiver: message.receiverId,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt,
	}

	// load content of message
	if(message.type === 'text') {
		const textMessage = await TextMessage.findOne({where: {id: id}})
		result.message = {
			type: 'text',
			text: textMessage.text
		}
	} else {
		const fileMessage = await FileMessage.findOne({where: {id: id}});
		result.image = {
			type: message.type,
			[message.type]: await FileService.getFileById(fileMessage.fileId)
		}
	} 

	return result;
}

// console.log({sendMessage, getMessages})
module.exports = {
	sendMessage, 
	getMessages, 
	getMessage, 
}
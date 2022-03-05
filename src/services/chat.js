const Op = require('sequelize').Op
const Message = require('../database/models/message')
const MessageService = require('./message')
const Receiver = require('../database/models/receiver')
const FileService = require('./file')
const Member = require('../database/models/member')

const getChat = async(selfId, id) => {
	try {
		const receiver = await Receiver.findOne({where: {id: id}, include: ['group', 'user']});
		if(!receiver) {
			console.log("ERROR: cannot find chat")
		}
		
		let lastMessage;
		if(receiver.type === 'user') {
			
			lastMessage = await Message.findOne({
				where: {
					[Op.or]: [{
						sender: selfId, receiverId: id
					}, {
						sender: id, receiverId: selfId
					}]
				}, 
				order: [['id', 'DESC']],
				
			})
		} else {
			lastMessage = await Message.findOne({
				where: {
					receiverId: id
				},
				order: [['createdAt', 'DESC']]
			})
		}
		
		
		const result = {
			id: receiver.id,
			name: receiver.name,
			unique_name: receiver.unique_name,
			profile: await FileService.getProfile(receiver.id),
		}
		if(lastMessage) {
			result.lastMessage = await MessageService.getMessage(lastMessage.id)
		}
		return result;
	} catch(err) {
		console.log(err)
	}
}


const getChats = async(id, paging) => {
	try {
		const limit = paging.limit || 20;
		const before = paging.before || Date.now()

		// only get id's of users and groups and insert into an array
		const chats = [];
		const groups = await Member.findAll({where: {user: id}});
		groups.forEach((group) => {
			// add groupId to chats;
			chats.push(group.group)
		})

		
		const messages =await Message.findAll({
			where: {
				[Op.or]: [{
					sender: id
				}, {
					receiverId: id
				}],
				createdAt: {
					[Op.lt]: before
				},
				// only get last message of each chat
				
			},
			limit: limit
		})
		
		messages.forEach(message => {
			const other = (message.sender ===id) ? message.receiverId : message.sender;
			// push other user's id
			if(!chats.find(chat => chat === other))
				chats.push(other)
			console.log(chats)
		})
		
		const result = await Promise.all(chats.map(async chat => {
			console.log(id, chat)
			// getChat returns Array, first item is result and second is error
			return await getChat(id, chat); 
		}))

		const sorted = result.sort((a, b) => {
			// sort function is based on lastMessage.createdAt
			if(a.lastMessage.createdAt < b.lastMessage.createdAt) {
				return 1
			} else {
				return -1
			}
		})
		return [sorted, null]
	
    } catch(err) {
		console.log(err)
	}
}

// TODO: add pagination support
const search = async(id, name) => {
	// return list of users and groups which match this query.

	try {
		getChat(id, 1);
		const chats = await Receiver.findAll({
			where: {
				[Op.or]: [{
					name: {
						[Op.like]: `%${name|| ''}%`
					},
					type: 'group'
				}, {
					type: 'user',
					[Op.or]: [{
						unique_name: name
					},{
						name: name
					}]
				}]
			}
		})
		return await Promise.all(chats.map(async chat => {
			return await getChat(id, chat.id)
		}))
	} catch(err) {
		console.log(err)
	}
}

module.exports = {search, getChats}
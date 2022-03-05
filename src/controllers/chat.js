const ChatService = require('../services/chat')

exports.getChats = async(req, res) => {
	try {
		const {limit, before} = req.query;
		const [chats,error] = await ChatService.getChats(req.user.id, {limit, before})
		
		if(chats)
			return res.status(200).json(chats)
		else 
			return res.status(error.status).json({message: error.message})
    } catch(err) {
		console.log(err)
	}
}

exports.searchChats = async(req, res) => {
	try {	
		const chats = await ChatService.search(req.user.id, req.query.name)

		res.status(200).json(chats)
	} catch(err) {
		console.log(err)
	}
}
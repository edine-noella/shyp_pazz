const MessageService = require('../services/message')


exports.getMessages = async (req, res) => {
	const chat_id = req.params.chat_id
	const [messages,error] = await MessageService.getMessages(req.user.id, chat_id);

	if(messages)
		res.status(200).json({messages})
	else {
		res.status(error.status).json(error.message)
	}
}


exports.getAllMessages = async (req, res) => {		
	const messages = await MessageService.getAllMessages(req.user.id);

	res.json({success: true, messages})
}

exports.sendMessage = async (req, res) => {
	const {chat_id} = req.params;

	const message = req.body;
	if(!message.type) {
		if(message.image) {
			message.type = 'image'
		} else if( message.file) {
			message.type = 'file'
		} else if(message.video) {
			message.type = 'video'
		} else if(message.audio) {
			message.type = 'video'
		} else if(message.text) {
			message.type = 'text'
		} else {
			return res.status(400).json({message: "error: message is invalid"})
		}
	}
	// send message then notify all users that need that message.
	const [result,error] = await MessageService.sendMessage(req.user.id, chat_id, message);
	
	if(result) {
		res.status(201).json(result)
	} else {
		res.status(error.status).json({message: error.message})
	}

}
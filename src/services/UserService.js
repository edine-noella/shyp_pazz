
const Receiver = require('../database/models/receiver')
const RecieverService = require('./receiver')
const FileService = require('./file')
import models from '../database/models';

const getSelf = async(id) => {
	const receiver = await models.Receiver.findOne({
		where: {id: id},
		attributes: ['id', 'unique_name', 'name'],
		include: ['user', 'profile']
	});

	return {
		id: receiver.id,
		name: receiver.name,
		email: receiver.user.email,
		username: receiver.unique_name,
		createdAt: receiver.createdAt,
		profile: await FileService.getProfile(receiver.id)
	}
}

module.exports = {
 getSelf
}
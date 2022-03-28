const Group = require("../database/models/group");
const Receiver = require("../database/models/receiver");
const FileService = require('./file')
const Member = require('../database/models/member')
import models from '../database/models';

const createGroup = async(creatorId, name, unique_name) => {
    try {

        const receiver = await models.Receiver.create({
            unique_name,
            name,
            type: 'group'
        })
        if(!receiver) {
            // user or group exists 
            return [null, "a user or group with this unique_name exists"];
        }
        const group = await models.Group.create({
            id: receiver.id,
            creatorId: creatorId,
        })
        // add user to members list
        await models.Member.create({
            user: creatorId,
            group: group.id,
            isAdmin: true,
            isBlocked: false
        });
        return [group];
    } catch(err) {
        if(err.message === "Validation error") {
            // 
            return [null, "user or group with this unique_name exists"]
        }
        return [null, err.message]
    }
}

const getUser = async(id) => {
    // return user if type of receiver is user
    // else return null
    const receiver = await models.Receiver.findOne({where: {id: id}, include: ['user']});
    if(receiver.user) {
        return {
            id: receiver.id,
            name: receiver.name,
            username: receiver.unique_name,
            profile: await FileService.getProfile(receiver.id)
        }
    } else {
        return null;
    }
}

const getGroup = async(id) => {
    // return user if type of receiver is user
    // else return null
    const receiver = models.Receiver.findOne({where: {id: id}, include: ['user']});
    if(receiver.user) {
        return {
            id: receiver.id,
            name: receiver.name,
            unique_name: receiver.unique_name,
            profile: await getProfile(receiver.id),
            creatorId: receiver.group.creatorId,
            description: receiver.group.description
        }
    }
}

const getReceiver = async(id) => {
    const receiver = models.Receiver.findOne({where: {id: id}})
    if(receiver.type === 'user') {
        return await {type: 'user', ...getUser(id)}
    } else {
        return await {type: 'group', ...getGroup(id)}
    }
}

const updateGroup = async(userId, groupId, editedGroup) => {
    try {
        // check premissions
        
        const receiver = await Receiver.findOne({where: {id: groupId, type: 'group'}})
        if(!receiver) {
            // group not found
            return [null, {status: 404, message: 'group with this id does not exits'}];
        }
        const group = await Group.findOne({where: {id: receiver.id}});

        const member = await Member.findOne({where: {user: userId, group: groupId}})
        if(!member) {
            return [null, {status: 405, message: "you are not member of this group"}];
        }
        if(!member.isAdmin) {
            // non-admin users cannot edit group. 
            return [null, {status: 405, message: "you don't have permissions to do this"}]
        }

        // admin can change: 
        // - name
        // - description
        // - profileId
        const name = editedGroup.name || receiver.name;
        const description = editedGroup.description || group.description
        const profileId = editedGroup.profileId || receiver.profileId

        receiver.name = name;
        receiver.profileId = profileId
        group.description = description
        
        // creator can change:
        // - unique_name
        // - creatorId
        if(group.creatorId === userId) {
            const newCreatorId = editedGroup.creatorId || group.creatorId
            const newCreatorMember = await Member.findOne({where: {user: newCreatorId, group: groupId}});
            if(!newCreatorMember) {
                return [null, {status: 405, message: "you cannot change owner of this group to a non-member user"}]
            }
            const unique_name = editedGroup.unique_name || receiver.unique_name
        } else {
            if( userId   !== group.creatorId ||
                editedGroup.unique_name !== receiver.unique_name) {
                return [null, {status: 405, message: "you cannot change unique_name or creatorId"}]
            }
        }

            const updatedGroup = await group.save();
            const updatedReceiver = await receiver.save();

            return [{
                id: updateGroup.id,
                name: updatedReceiver.name,
                unique_name: updatedReceiver.unique_name,
                profile: await FileService.getProfile(updatedReceiver.id),
                creatorId: updatedGroup.creatorId,
            createdAt: updatedGroup.createdAt,
            updatedAt: updatedGroup.updatedAt
        }, null]
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    getReceiver,
    getUser,
    createGroup,
    updateGroup
}
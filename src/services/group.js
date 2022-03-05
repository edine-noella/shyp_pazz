const User = require('../database/models/allusers')
const Group = require('../database/models/group')
const Member = require('../database/models/member')
const Receiver = require('../database/models/receiver')
const FileService = require('./file')
const ReceiverService = require('./receiver')
// group service

// create group (creator, name, unique_name)
const createGroup = async(creatorId, name, unique_name) => {
    const [group, error] = await ReceiverService.createGroup(creatorId, name, unique_name)

    if(!group)
        return [null,error] 
    else 
        return [{
            id: group.id,
            name: name,
            unique_name: unique_name,
            profile: await FileService.getProfile(group.id),
            creatorId: creatorId
        }, null]
}

// update group (groupId, user(who want to update), {data})
const updateGroup = async(userId, groupId, editedGroup) => {
    return ReceiverService.updateGroup(userId, groupId, editedGroup)
}

// get groups ({where: ...})
const getGroup = async(groupId) => {
    try {
        const receiver = await Receiver.findOne({where: {id: groupId, type: 'group'}, include: ['group']});
        if(!receiver) {
            return [null, {status: 404, message: "group does not exists"}]
        }
        console.log(receiver)
        return [{
            idm: receiver.id,
            nae: receiver.name,
            unique_name: receiver.unique_name,
            description: receiver.group.description,
            creatorId: receiver.group.creatorId,
            profile: await FileService.getProfile(receiver.id),
            createdAt: receiver.createdAt,
            updatedAt: receiver.updatedAt
        }, null]
    } catch(err) {
        console.log(err)
    }
}

// delete group (groupId, user)
const deleteGroup = async(userId, groupId) => {
    // delete group
    // delete receiver
    // must delete all members;
    const member = await Member.findOne({where: {user: userId, group: groupId}});
    if(!member) {
        return [null, {status: 405, message: "you are not member of this group"}]
    }
    const group = await Group.findOne({where: {id: groupId}})
    if(!group) {
        return [null, {status: 404, message: "group does not exits"}]
    } 

    console.log(group)
    if(group.creatorId !== userId) {
        console.log(group.creatorId, userId)
        return [null, {status: 405, message: "you are not creator of this group"}]
    } else {
        // delete group and receivers
        await group.destroy()
        const receiver = await Receiver.findOne({where: {id: groupId}})
        await receiver.destroy();

        const members = await Member.findAll({where: {group: groupId}})
        await members.forEach(member => {
            member.destroy();
        })
        return [{message: "group deleted successfully"}]
    }
}

const getMembers = async(userId, groupId) => {
    
    const group = await Group.findOne({where: {id: groupId}});
    if(!group) {
        return [null, {status: 404, message: "group does not exits"}]
    }
    // return members only if reader user is member of group and not blocked in that group
    const member = await Member.findOne({
        where: {
            user: userId, 
            group: groupId
        }
    })
    // TODO: users can read messages and members without joining group.
    if(!member) {
        return [null, {status: 405, message: "you don't have permissions to read list of members of this group"}]
    }
    // TODO: pagination
    const members = await Member.findAll({where: {group: groupId}, attributes: ['user', 'isAdmin', 'isBlocked']});
    if(members) {
        return [members,null]
    } 

}


const joinGroup = async(userId, groupId) => {
    try {

        // check if group exists
        const group = await Group.findOne({where: {id: groupId}});
        if(!group) {
            return [null, {status: 404, message: "group does not exists"}]
        }
        
        // check if user is not member of group
        const membership = await Member.findOne({where: {user: userId, group: groupId}})
        if(membership) {
            if(membership.isBlocked) {
                return [null, {status: 405, message: "you are blocked from this group, you cannot join now"}]
            } else {
                return [null, {status: 409, message: "you are already a member of this group"}]
            }
        }
        
        
        // join group
        await Member.create({
            user: userId,
            group: groupId,
            isAdmin: false,
            isBlocked: false
        })
        // successfully joined
        return [true]
    } catch(err) {
        console.log(err)
    }
}

const leaveGroup = async(userId, groupId) => {
    try {

        // check if group exits
        const group = await Group.findOne({where: {id: groupId}})
        if(!group) {
            return [null, {status: 404, message: "group does not exists"}]
        }
        
        
        
        // check if user is a member of group
        // blocked user cannot leave group
        const member = await Member.findOne({where: {user: userId, group: groupId, isBlocked: false}})
        if(!member) {
            return [null, {status: 400, message: "you are not member of this group"}]
        }
        
        // leave group
        await member.destroy()
        reutrn [true]
    } catch(err) {
        console.log(err)
    }
}

const kickMember = async(userId, groupId, memberId) => {
    // check if group exists
    const group = await Group.findOne({where: {id: groupId}})
    if(!group) {
        return [null, {status: 404, message: "group does not exists"}]
    }

    // check if member exists in group

    const member = Member.findOne({where: {user: memberId, group: groupId}});
    if(!member) {
        return [null, {status: 404, message: "user is not a member of this group"}]
    }
    // check if userId is admin
    
    const admin = await Member.findOne({where: {user: userId, group: groupId, isAdmin: true}});
    if(!admin) {
        return [null, {status: 405, message: "you cannot remove anyone from this group"}]
    }

    if(member.isAdmin && group.creatorId !== userId) {
        return [null, {status: 405, message: "only creator (owner) can kick admins"}]
    }

    // finally remove user
    await member.destroy();
    return [true, null]

}

// returns member object.
// {user: , group: , isAdmin: , isBlocked: }
const addMember = async(userId, groupId, memberId) => {
    try {
        console.log(userId, memberId, groupId)
        // check if group exists
        const group = Group.findOne({where: {id: groupId}});
        if(!group) {
            return [null, {status: 404, message: "group does not exists"}]
        }
        // memberId must not be member of group
        const memberUser = await User.findOne({where: {id: memberId}});
        if(!memberUser) {
            return [null, {status: 404, message: "user does not exists"}]
        }
        const member = await Member.findOne({where: {user: memberId, group: groupId}})
        if(member) {
            return [null, {status: 409, message: "user is already a member of this group"}]
        }
        // userId must be admin
        const user = await Member.findOne({where: {user: userId, group: groupId, isAdmin: true}})
        if(!user) {
            return [null, {status: 405, message: "you don't have permissions to add user to this group"}]
        }
        
        // add member
        const newMember = await Member.create({
            user: memberId,
            group: groupId,
            isAdmin: false,
            isBlocked: false
        })
        return [{
            user_id: newMember.user, 
            is_admin: newMember.isAdmin, 
            is_blocked: newMember.isBlocked
        
        }, null];
    } catch(err) {
        console.log(err)
    }
}

const editMembership = async(userId, groupId, memberId, admin, block) => {
    try {

        // console.log(userId, groupId, memberId, admin, block)
        
        // check group exists
        const group = await Group.findOne({where: {id: groupId}})
        if(!group) {
            return [null, {status: 404, message: "group does not exists"}]
        }
        // check member exists
        const member = await Member.findOne({where: {user: memberId, group: groupId}})
        console.log(member)
        if(!member) {
            return [null, {status: 404, message: "user is not member of this group"}]
        }
        
        // admin changed or block?
        const user = await Member.findOne({where: {user: userId, group: groupId, isAdmin: true}})
        if(!user) {
            return [null, {status: 405, message: "you don't have permissions to do this"}]
        }
        
        if(admin === true || admin === false) {
            // for this job user must be creator of group
            if(userId !== group.creatorId) {
                return [null, {status: 405, message: "You are not owner of this group to do this"}]
            }
        }

        let message= "success: nothing changed"
        if(member.isAdmin && admin == 'false') {
            message = "demoted admin to regular user"
        }
        if(!member.isAdmin && admin == 'true') {
            message = "promote user to admin"
        }
        // console.log(member)
        // console.log(member.isBlocked, member.isAdmin, block, admin)
        if(member.isBlocked && block == 'false') {
            message = "member is not blocked now"
        }
        // console.log(member.dataValues.isBlocked === true, !member.dataValues.isBlocked === true)
        if(member.isBlocked === false && block == 'true') {
            message = "member is blocked now"
        }

        // console.log(message)
        member.isBlocked = block || member.isBlocked
        member.isAdmin = admin || member.isAdmin

        if(memberId === group.creatorId) {
            return [null, {status: 405, message: "you cannot change info of group owner"}]
        }
        await member.save();
        return [message];
    
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    getMembers,
    joinGroup,
    leaveGroup,
    kickMember,
    addMember,
    editMembership
}
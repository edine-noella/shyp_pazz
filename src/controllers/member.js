const GroupService = require('../services/group')

exports.joinGroup = async(req, res) => {
    const {groupId} = req.params;

    const [result, error] = await GroupService.joinGroup(req.user.id, groupId)
    if(result) {
        res.status(200).json({message: "successfully joined group"})
    } else {
        res.status(error.status).json({message: error.message})
    }
}

exports.leaveGroup = async(req, res) => {
    const {groupId} = req.params;
    const [result, error] = await GroupService.leaveGroup(req.user.id, groupId)
    if(result) {
        res.status(200).json({message: "successfully left from group"})
    } else {
        res.status(error.status).json({message: error.message})
    }
}

exports.addMember = async(req, res) => {
    const { groupId } = req.params
    const { userId }  = req.body

    if(!userId) {
        return res.status(400).json({message: "userId does not exists"})
    }
    const [result, error] = await GroupService.addMember(req.user.id, groupId, userId);
    if(result) {
        // return add member message.
        // 'another' added 'first' to group.
        res.status(201).json(result)
    } else {
        res.status(error.status).json({message: error.message})
    }
}

exports.kickMember = async(req, res) => {
    const { groupId, userId } = req.params;

    const [result, error] = await GroupService.kickMember(req.user.id, groupId, userId); 

    if(result) {
        res.status(200).json({message: "user removed from group"});
    } else {
        res.status(error.status).json({message: error.message})
    }
}


exports.getMembers = async(req, res) => {
    const groupId = req.params.groupId
    // pagination
    const [members, error] = await GroupService.getMembers(req.user.id, groupId)

    if(members) {
        res.status(200).json(members)
    } else {
        res.status(error.status).json({message: error.message})
    }
}

exports.editMembership = async(req, res) => {
    const groupId = req.params.groupId

    const userId = req.params.userId
    const admin  = req.body.admin 
    const block  = req.body.block

    if(typeof admin === 'undefined' && typeof block === 'undefined') {
        return res.status(400).json({message: "please fill admin or block field"})
    }

    if(!userId) {
        return res.status(400).json({message: "fill userId field"})
    }

    const [result, error] = await GroupService.editMembership(req.user.id, groupId, userId, admin, block)
    if(result) {
        res.status(200).json({message: result})
    } else {
        res.status(error.status).json({message: error.message})
    }
}
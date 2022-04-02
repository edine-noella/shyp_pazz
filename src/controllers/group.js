const GroupService = require('../services/group')

exports.createGroup = async(req, res) => {
    // creator = req.user
    // title
    // const creatorId = req.params.userId;
    console.log(req.params.userId);
    try {
        const {name, unique_name} = req.body;
        if(!name || !unique_name) {
            return res.status(400).json({message: "please fill all fields"});
        }

        const [result, error] = await GroupService.createGroup(req.params.userId, name, unique_name)

        console.log({result, error})
        if(result)
            res.status(201).json(result)
        else 
            res.status(409).json({message: error})
    } catch(err) {
        console.log(err)
    }
}

// list of groups for joining.
// exports.getAllGroups = async(req, res) => {
//     try {
//         // pagination
//         // req.query   page=3,4,... limit=20   sort=+name....  
//         const groups = await GroupController.getAllGroups();

//         res.json({success: true, groups});
//     } catch(err) {
//         console.log(err)
//     }
// }

// details of group
exports.getGroup = async(req, res) => {
    try {
        const {groupId} = req.params
        const [group, error] = await GroupService.getGroup(groupId);
        if(group)
            res.status(200).json(group)
        else 
            res.status(error.status).json({message: error.message})
        
    } catch(err) {
        console.log(err)
    }
    
}

exports.editGroup = async(req, res) => {
    try {
        // check permissions of user.
        // only admins can kick or add members.
        // only creator can promote or demote admins.
        // only admins can change name, profile and description of group,
        // creator can change unique_name.
        const {name, profileId, description, unique_name, creatorId} = req.body;
        const groupId = req.params.groupId;
        if(!groupId) {
            res.status(400).json({message: "groupId field is empty"});
        }
        //the userId of user who is editing the group
        const [result, error] = await GroupService.updateGroup(req.params.userId, groupId, {
            name,
            profileId,
            description,
            unique_name,
            creatorId
        });

        if(result) {
            res.status(200).json(result)
        } else {
            res.status(error.status).json({message: error.message})
        }
        
    } catch(err) {
        console.log(err)
    }
}

exports.deleteGroup = async(req, res) => {
    try {
        const {groupId} = req.params;
        const [result, error] = await GroupService.deleteGroup(req.params.userId, groupId)
        if(result)
            res.status(410).json({message: "group deleted successfully"})
        else
            res.status(error.status).json({message: error.message})
        // res.end("delete group with id: " + req.params.id)
    } catch(err) {
        console.log(err)
    }
}
import express from 'express';
import {createGroup } from '../../controllers/group';
import {getAllGroups} from '../../controllers/group';
import {getGroup} from '../../controllers/group';
import {editGroup} from '../../controllers/group';
import {deleteGroup} from '../../controllers/group';

import { joinGroup } from '../../controllers/member';
import { leaveGroup } from '../../controllers/member';
import { addMember } from '../../controllers/member';
import { kickMember } from '../../controllers/member';
import { getMembers } from '../../controllers/member';
import { editMembership } from '../../controllers/member';
const router = express.Router();

router.post('/createGroup/:userId',createGroup);
// router.get('/getAllGroups',getAllGroups);
// router.get('/getGroup/:groupId',getGroup);
router.put('/editGroup/:groupId/user/:userId',editGroup);
router.delete('/deleteGroup/:groupId/user/:userId',deleteGroup);

//un tested apis
router.post('joinGroup/:groupId/join',joinGroup);
router.post('/leaveGroup/:groupId/leave',leaveGroup);
router.post('/addMember/:groupId/member',addMember);
router.delete('/kickMember/:groupId/member/:userId',kickMember);
router.get('/getMembers/:groupId',getMembers);
router.put('/editMembership/:groupId/member/:userId',editMembership);

module.exports = router;
const { Router } = require('express');

const teacher = Router();

const { getAll, getOne, create, update, remove } = require('../controller/teacher.controller');
const {removeTeacherMe,getTeachersMe,UPdateTeacherMe}=require('../controller/me.controller')
const{promoteToTeachers}=require('../controller/promoteController')

const {verifyToken}=require('../middleware/verifyToken');
const { checking } = require('../middleware/checkrRoles');
teacher.get('/',verifyToken ,/* checking('admin') */ getAll);
teacher.post('/promote', verifyToken,checking('admin'),promoteToTeachers)
teacher.get('/:id',verifyToken ,checking('admin'), getOne);
teacher.post('/', create);
teacher.patch('/:id', verifyToken ,checking('admin'),update);
teacher.delete('/:id', verifyToken ,checking('admin'),remove);

teacher.get('/me',verifyToken,getTeachersMe)
teacher.delete('/me',verifyToken,removeTeacherMe)
teacher.patch('/me',verifyToken,UPdateTeacherMe)

module.exports = { teacher };

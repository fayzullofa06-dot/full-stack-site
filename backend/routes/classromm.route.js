const { Router } = require('express');

const {
    create,
    getAll,
    getOne,
    update,
    remove
} = require('../controller/classromm.controller');
const{checking}=require('../middleware/checkrRoles')

const {verifyToken}=require('../middleware/verifyToken')
const classroom = Router();

classroom.get('/',verifyToken, checking('admin'),getAll);
classroom.post('/', verifyToken,checking('teacher','admin'), create);
classroom.get('/:id',verifyToken ,checking('admin'), getOne);
classroom.patch('/:id', verifyToken,checking('teacher','admin'), update);
classroom.delete('/:id',verifyToken, checking('admin'), remove);

module.exports = { classroom };
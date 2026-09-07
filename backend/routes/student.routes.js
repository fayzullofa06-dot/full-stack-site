const{Router}=require('express')

const student=Router()

const{getAll,getOne,update,remove,create}=require('../controller/student.controller')
const {getStudentsMe,UpdateStudentMe,removeStudentMe}=require('../controller/me.controller')
const { checking } = require('../middleware/checkrRoles')
const {verifyToken}=require('../middleware/verifyToken')



student.get('/', verifyToken,getAll)
student.get('/me',verifyToken,getStudentsMe)
student.patch('/me',verifyToken,UpdateStudentMe)
student.delete('/me',verifyToken,removeStudentMe)

student.post('/',verifyToken,create)
student.delete('/:id',verifyToken,checking('admin'),remove)

student.get('/:id' ,verifyToken,checking('admin'),getOne)
student.patch('/:id',  verifyToken,checking('admin'),update)

module.exports={student} 
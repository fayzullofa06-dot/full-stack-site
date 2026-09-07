const{Router}=require('express')

const enroll=Router()

const{create,getEnrollments,getOne,remove,update}=require('../controller/enrollment.controller')
const{checking}=require('../middleware/checkrRoles')

const {verifyToken}=require('../middleware/verifyToken')
const { removeEnrollMe, UpdateEnrollments, getEnrollMe } = require('../controller/me.controller')

enroll.post('/', verifyToken,create)
enroll.get('/me',verifyToken,getEnrollMe)
enroll.patch('/me',verifyToken,UpdateEnrollments)
enroll.delete('/me/:id',verifyToken,removeEnrollMe)
enroll.get('/',verifyToken,getEnrollments)
enroll.get('/:id',verifyToken,checking('admin'),getOne)
enroll.delete('/:id',verifyToken,checking('admin'),remove)
enroll.patch('/:id',verifyToken,checking('admin'),update)

module.exports={enroll}
const{Router}=require('express')

const department=Router()

const{getAll,searching,update,remove,create,getOne}=require('../controller/department.controller')
const {verifyToken}=require('../middleware/verifyToken')

const{checking}=require('../middleware/checkrRoles')
department.get('/',verifyToken, checking('admin')/* checking('admin') */,getAll)
department.get('/',checking('admin'),searching)

department.post('/',verifyToken,checking('admin'),create)
department.delete('/:id',verifyToken,checking('admin'),remove)

department.get('/:id',verifyToken,checking('admin'),getOne)
department.patch('/:id',verifyToken,checking('admin'),update)
module.exports={department} 
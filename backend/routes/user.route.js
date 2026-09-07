    const{Router}=require('express')
    const user=Router()

    const{registerUser,login,get, update, remove}=require('../controller/user.controller')
    const { checking } = require('../middleware/checkrRoles')
    const {verifyToken}=require('../middleware/verifyToken')
    const{getMe,UpdateMe,removeMe}=require('../controller/me.controller')

    user.get('/',verifyToken , checking('admin'), get)
    user.get('/me',verifyToken ,getMe)
    user.delete('/me',verifyToken,removeMe)
    user.patch('/me',verifyToken,UpdateMe)

    user.post('/',registerUser),
    user.post('/login',login)
    user.patch('/:id',verifyToken, checking('admin'),update)
    user.delete('/:id',verifyToken, checking('admin'),remove)


    module.exports={user}
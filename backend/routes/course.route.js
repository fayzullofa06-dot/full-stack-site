const { Router } = require('express');
const {
    create,
    getAll,
    getOne,
    update,
    remove
} = require('../controller/course.controller');

const course = Router();
const{checking}=require('../middleware/checkrRoles')
const {verifyToken}=require('../middleware/verifyToken');
const { getCourseMe, removeCourseMe, UpdateCourseMe } = require('../controller/me.controller');

course.get('/', getAll);
course.get('/me',verifyToken,getCourseMe)
course.delete('/me',verifyToken,removeCourseMe)
course.patch('/me',verifyToken,UpdateCourseMe)
course.post('/',verifyToken ,create);
course.get('/:id',checking('admin'), getOne);
course.patch('/:id',checking('admin'), update);
course.delete('/:id',checking('admin'), remove);

module.exports = { course };
const { Router } = require('express');

const {
    create,
    getAll,
    getOne,
    update,
    remove
} = require('../controller/schdule.controller');
const { checking } = require('../middleware/checkrRoles');
const { verifyToken } = require('../middleware/verifyToken');
const { getScheduleMe } = require('../controller/me.controller');

const schedule = Router();


schedule.get('/me',verifyToken,getScheduleMe)

schedule.get('/',checking('admin'), getAll);
schedule.post('/',checking('admin'), create);
schedule.get('/:id', checking('admin') ,getOne);
schedule.patch('/:id',checking('admin') ,update);
schedule.delete('/:id',checking('admin'),remove);

module.exports = { schedule };
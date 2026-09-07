const express = require('express');
const { sequelize } = require('./config/database.config');
require('dotenv').config();
require('./middleware/Association');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const { department } = require('./routes/department.route');
const { student } = require('./routes/student.routes');
const { teacher } = require('./routes/teacher.routes');

const{course}=require('./routes/course.route')
const{enroll}=require('./routes/enrollment.routes');
const{classroom}=require('./routes/classromm.route')
const{schedule}=require('./routes/schedule.routes')
const {user}=require('./routes/user.route');



app.use('/user', user);
app.use('/department', department);
app.use('/classroom',classroom)
app.use('/course',course)
app.use('/student', student);
app.use('/teacher', teacher);
app.use('/enroll',enroll)
app.use('/schedules', schedule);

async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Postgres has been connected successfully');
    } catch (error) {
        console.error(error.message);
    }
}
connection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

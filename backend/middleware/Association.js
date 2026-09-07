const { Department } = require('../model/department.model')
const { Student } = require('../model/students.model')
const { Teachers } = require('../model/teacher.model')
const {Enrollments}=require('../model/enrollment.models')
const { Schedule } = require('../model/schdule.model');
const {Classroom}=require('../model/classromm.model')
const{User}=require('../model/user.model')

const{Course}=require('../model/courses.model')

Student.belongsTo(Department, {
    foreignKey: 'department_id',
    as: 'department'
})

Department.hasMany(Student, {
    foreignKey: 'department_id',
    as: 'students'
})

Teachers.belongsTo(Department, {
    foreignKey: 'department_id',
    as: 'department'
})

Department.hasMany(Teachers, {
    foreignKey: 'department_id',
    as: 'teachers'
})
Course.belongsTo(Department,{
    foreignKey:'department_id',
    as:'department'
}
)
Course.belongsTo(Teachers,{
    foreignKey:'teacher_id',
    as:"teacher"
})
Teachers.hasMany(Course,{
    foreignKey:'teacher_id',
    as:'Courses'
})

Enrollments.belongsTo(Course,{
    foreignKey: 'course_id',
    as:'Course'
})
Course.hasMany(Enrollments,{
    foreignKey:'course_id',
    as:"Enrollments"
})
Enrollments.belongsTo(Student,{
    foreignKey:'student_id',
    as:'Student'
})
Student.hasMany(Enrollments,{
    foreignKey:'student_id',
    as:'Enrollments'
})

Schedule.belongsTo(Course, {
    foreignKey: 'courses_id',
    as: 'course'
});

Course.hasMany(Schedule, {
    foreignKey: 'courses_id',
    as: 'schedules'
});

Schedule.belongsTo(Classroom, {
    foreignKey: 'classroom_id',
    as: 'classroom'
});

Classroom.hasMany(Schedule, {
    foreignKey: 'classroom_id',
    as: 'schedules'
});


Student.belongsTo(User,{
    foreignKey:'user_id',
    as:'User'
})
Teachers.belongsTo(User,{
    foreignKey:'user_id',
    as:'User'
})
User.hasMany(Student,{
    foreignKey:"user_id",
    as:'Students'
})
User.hasMany(Teachers,{
    foreignKey:"user_id",
    as:'Teachers'
})
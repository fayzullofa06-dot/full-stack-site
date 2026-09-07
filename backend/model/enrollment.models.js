const {DataTypes}=require('sequelize')
const{sequelize}=require('../config/database.config')


const Enrollments= sequelize.define("Enrollment",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    course_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    student_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    enrolled_at:{
     type:DataTypes.DATEONLY,
     allowNull:false
    },
    
},
{
    timestamps:true,
    tableName:"Enrollment"
}
)

module.exports={Enrollments}
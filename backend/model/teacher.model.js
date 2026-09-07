const{sequelize}=require('../config/database.config')
const{DataTypes}=require('sequelize')
const bcrypt=require('bcrypt')

const Teachers= sequelize.define('Teacher',{
    id:{
     type:DataTypes.INTEGER,
     autoIncrement:true,
     unique:true,
     primaryKey:true
    },
    department_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hire_date:{
     type:DataTypes.DATEONLY,
     allowNull:false
    },
    status:{
        type:DataTypes.ENUM('active','fired','vacation')
    },
    role:{
        type:DataTypes.ENUM('teacher'),
        allowNull:false
    }
},
{
    timestamps:true,
    tableName:"Teachers"
}
)

/* Teachers.beforeCreate(async(teacher)=>{
    teacher.password=await bcrypt.hash(teacher.password,Number(process.env.SALT))
})
Teachers.beforeUpdate(async(teacher)=>{
    teacher.password=await bcrypt.hash(teacher.password,Number(process.env.SALT))
}) */

module.exports={Teachers}
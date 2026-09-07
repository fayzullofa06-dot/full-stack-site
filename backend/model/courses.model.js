const{sequelize}=require('../config/database.config')
const{DataTypes}=require("sequelize")

const Course=sequelize.define("Courses",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    department_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    teacher_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    status:{
       type: DataTypes.ENUM(
    'available',
    'full',
    'completed',
    'cancelled'
),
defaultValue:'available',
        allowNull:false
    },

    capacity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:10
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:true,
    tableName:'Course'
})


module.exports={Course}
const {sequelize}=require('../config/database.config')
const {DataTypes}=require('sequelize')


const Department=sequelize.define('Department',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    department_field:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    department_specification:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    
},
{
    tableName:'Departments',
    timestamps:true
}
)

module.exports={Department}
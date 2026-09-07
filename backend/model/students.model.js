    const {sequelize}=require('../config/database.config')
    const{Department}=require('../model/department.model')
    const {DataTypes}=require('sequelize')
    const bcrypt=require('bcrypt')

    const Student = sequelize.define('Student', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
      
        user_id:{
            type:DataTypes.INTEGER,
        
        },
        phone: {
            type: DataTypes.STRING
        },

        dateOfBirth: {
            type: DataTypes.DATEONLY
        },

        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        department_id: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'Students',
        timestamps: true
    });

/* Student.beforeCreate(async(user)=>{
user.password= await bcrypt.hash(user.password,Number(process.env.SALT ))
})
Student.beforeUpdate(async(user)=>{
    user.password= await bcrypt.hash(user.password,Number(process.env.SALT ))
}) */
    module.exports={Student}
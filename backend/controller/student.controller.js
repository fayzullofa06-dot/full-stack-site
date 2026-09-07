const { Department } = require('../model/department.model')
const { Student } = require('../model/students.model')
require('../middleware/Association')
const bcrypt=require('bcrypt')
const { User } = require('../model/user.model')

const create = async (req, res) => {
    try {
         /*  if (req.body.password) {
            req.body.password = await bcrypt.hash(
                req.body.password,
                Number(process.env.SALT)
            )
        } */
        const student = await Student.create(req.body)
       
    const studentAssocitation= await Student.findByPk(student.id,{
        include:[
            {
                model:Department,as:'department',
            },
            {
                model:User , as:"User"
            }
        ]
    })
        res.status(201).json({
            success: true,
            message: 'Student has been created successfully',
            data: studentAssocitation
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAll = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{ model: Department, as: 'department' },
                {
                    model:User,
                    as:'User'
                }
            ]
        })
        if(!students){
            return res.status(404).json({
                success:false,
                message:'not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Students have been returned successfully',
            data: students
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getOne = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include:[ { model: Department, as: 'department' },

              {
                    model:User,
                    as:'User'
                }]
        })
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
        res.status(200).json({
            success: true,
            data: student,
            message: 'Student has been returned successfully'
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: { model: Department, as: 'department' }
        })
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
        await student.destroy()
        res.status(200).json({
            success: true,
            message: 'Student has been deleted successfully',
            deletedInfo: student
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id)
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
       /*  if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password,Number(process.env.SALT))
        } */
        await student.update(req.body)
        res.status(200).json({
            success: true,
            message: 'Student has been updated successfully',
            updatedData: student
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { create, getOne, getAll, remove, update }
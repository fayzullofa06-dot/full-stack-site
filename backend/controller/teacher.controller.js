const { Department } = require('../model/department.model');
const { Teachers } = require('../model/teacher.model');
const{User}=require('../model/user.model')
require('../middleware/Association');
const bcrypt=require('bcrypt');

const getAll = async (req, res) => {
    try {
const teachers = await Teachers.findAll({
    include: [
        {
            model: Department,
            as: "department"
        },
        {
            model: User,
            as: "User",
            attributes: [
                "id",
                "email",
                "firstName",
                "lastName"
            ]
        }
    ]
});

//so for the email and fistnma and other things that are gonn be the th firstly  firsly we need a div then we use table for that all and then we use thead for like table headers th-means that and then we use tr for the table road they are the headres of our info what there will be then in those table road we have to write what we wil hvae it will be also in tr then insdide we will write the td
        res.status(200).json({
            success: true,
            data: teachers,
        });
        console.log(req.headers)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getOne = async (req, res) => {
    try {
        const teacher = await Teachers.findByPk(req.params.id, {
       include:[ { model: Department, as: 'department' },
           {
                    model:User,
                    as:"User"
                }
       ]
        });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }
        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
       /*  if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password,Number(process.env.SALT))
        } */
        const teacher = await Teachers.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Teacher created successfully',
            data: teacher
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const teacher = await Teachers.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }
         /* if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password,Number(process.env.SALT))
        } */
        await teacher.update(req.body);
        res.status(200).json({
            success: true,
            message: 'Teacher updated successfully',
            data: teacher
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const teacher = await Teachers.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }
        await teacher.destroy();
        res.status(200).json({
            success: true,
            message: 'Teacher deleted successfully'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getAll, getOne, create, update, remove };

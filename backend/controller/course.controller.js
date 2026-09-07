const { Course } = require('../model/courses.model');
const{Department}=require('../model/department.model')
const{Teachers}=require('../model/teacher.model')
const bcrypt=require('bcrypt')
const create = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include:[
                {
                    model:Department,
                    as:'department'
                },
                {
                    model:Teachers,
                    as:'teacher'
                },
            ]

            
        });

        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOne = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id,{
             include:[
                {
                    model:Department,
                    as:'department'
                },
                {
                    model:Teachers,
                    as:'teacher'
                },
            ]

        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await course.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await course.destroy();

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove
};
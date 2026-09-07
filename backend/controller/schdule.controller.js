const { Schedule } = require('../model/schdule.model');
const { Course } = require('../model/courses.model');
const { Classroom } = require('../model/classromm.model');

const create = async (req, res) => {
    try {
        const schedule = await Schedule.create(req.body);

        const result = await Schedule.findByPk(schedule.id, {
            include: [
                { model: Course, as: 'course' },
                { model: Classroom, as: 'classroom' }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: result
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            include: [
                { model: Course, as: 'course' },
                { model: Classroom, as: 'classroom' }
            ]
        });

        res.status(200).json({
            success: true,
            data: schedules
        });
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
        const schedule = await Schedule.findByPk(req.params.id, {
            include: [
                { model: Course, as: 'course' },
                { model: Classroom, as: 'classroom' }
            ]
        });

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        res.status(200).json({
            success: true,
            data: schedule
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
        const schedule = await Schedule.findByPk(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        await schedule.update(req.body);

        const result = await Schedule.findByPk(schedule.id, {
            include: [
                { model: Course, as: 'course' },
                { model: Classroom, as: 'classroom' }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Schedule updated successfully',
            data: result
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
        const schedule = await Schedule.findByPk(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        await schedule.destroy();

        res.status(200).json({
            success: true,
            message: 'Schedule deleted successfully',
            data: schedule
        });
    } catch (error) {
        console.error(error.message);

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
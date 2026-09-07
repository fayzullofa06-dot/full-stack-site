const { Classroom } = require('../model/classromm.model');

const create = async (req, res) => {
    try {
        const classroom = await Classroom.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Classroom created successfully',
            data: classroom
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
        const classrooms = await Classroom.findAll();

        if(classrooms.length===0){
    return  res.status(200).json({
            success: false,
            message:"failed to find"
        });
        }
        res.status(200).json({
            success: true,
            data: classrooms
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
        const classroom = await Classroom.findByPk(req.params.id);

        if (!classroom) {
            return res.status(404).json({
                success: false,
                message: 'Classroom not found'
            });
        }

        res.status(200).json({
            success: true,
            data: classroom
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
        const classroom = await Classroom.findByPk(req.params.id);

        if (!classroom) {
            return res.status(404).json({
                success: false,
                message: 'Classroom not found'
            });
        }

        await classroom.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Classroom updated successfully',
            data: classroom
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
        const classroom = await Classroom.findByPk(req.params.id);

        if (!classroom) {
            return res.status(404).json({
                success: false,
                message: 'Classroom not found'
            });
        }

        await classroom.destroy();

        res.status(200).json({
            success: true,
            message: 'Classroom deleted successfully',
            data: classroom
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
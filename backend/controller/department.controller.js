const { Department } = require('../model/department.model')
require('../middleware/Association')

const getAll = async (req, res) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json({data:departments});   
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const create= async(req,res)=>{
    try {
        const { department_field,
            department_specification,
            description}=req.body
            if (
                !department_field ||
                !department_specification ||
                !description
            ) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const create= await Department.create({ department_field,
                department_specification,
                description})

              res.status(201).json(create);
            

    } catch (error) {
           res.status(500).json({
            message: error.message
        });
    }
}


const getOne=async(req,res)=>{
    try {
        const {id}=req.params
        const takeOne= await Department.findByPk(id)

          if (!takeOne) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }

        res.status(200).json(takeOne);
    } catch (error) {
        
          res.status(500).json({
            message: error.message
        });
    
    }
}

const remove =async(req,res)=>{
    try {
        const deleting= await Department.findByPk(req.params.id)


        if (!deleting) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }
         await deleting.destroy()


        res.status(200).json({
            message: 'Department deleted successfully'
        });

    } catch (error) {
 res.status(500).json({
            message: error.message
        });        
    }
}

const update= async(req,res)=>{
    try {
        const update= await  Department.findByPk(req.params.id)
 

if (!update) {
    return res.status(404).json({
        message: 'Department not found'
    });
}
 await update.update(req.body)

 res.status(200).json(update);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
                message: error.message
        })
    }
}

const {Op}=require('sequelize')

const searching=async(req,res)=>{
    try {
        const{query}=req.query
        const searching= await Department.findAll({
            where:{
                    department_specification:{
                        [Op.like]:`%${query}%`
                    }
            }
        })

        res.status(200).json(searching);
    } catch (error) {

          res.status(500).json({
            message: error.message
        });
        
    }
}


module.exports={getAll,create,getOne,remove,update,searching}
const { Course } = require('../model/courses.model')
const{Enrollments}=require('../model/enrollment.models')
const { Student } = require('../model/students.model')
const { sequelize } = require('../config/database.config');

const create = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { course_id } = req.body;

        const student = await Student.findOne({
            where: {
                user_id: req.user.id
            },
            transaction
        });

        if (!student) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const course = await Course.findByPk(course_id, {
            transaction
        });

        if (!course) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.capacity <= 0) {
            await transaction.rollback();

            return res.status(400).json({
                success: false,
                message: "Course is full"
            });
        }

        const enrollment = await Enrollments.create({
            course_id: course.id,
            student_id: student.id,
            enrolled_at: new Date()
        }, {
            transaction
        });

        await course.decrement("capacity", {
            by: 1,
            transaction
        });

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Enrollment has been created successfully",
            data: enrollment
        });

    } catch (error) {
        await transaction.rollback();

        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getEnrollments=async(req,res)=>{
    try {
        const takeInfo= await Enrollments.findAll(
            {
                include:[
                    
                   { model:Student,
                    as:'Student'
                },
                   {
                    model: Course,
                    as:"Course"
                   }
                ]
                
            }
        )
       
      
        if(takeInfo.length===0){
            return res.status(404).json({
                success:false,
                message:'there is no info inside of the Enrollments'
            })
        }
        res.status(200).json({
            success:true,
            message:'Enrollments are returned successfully',
            information:takeInfo,
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

const getOne=async(req,res)=>{
    try {
        const takeOne= await Enrollments.findByPk(req.params.id,
            {
                include:[
                    {
                        model:Student,
                        as:"Student"
                    },
                    {
                        model:Course,
                        as:"Course"
                    }
                ]
            }
        )
        if(!takeOne){
            res.status(404).json({
                success:false,
                message:"Can not return enrollment by id"
            })
        }
        res.status(200).json({
            success:true,
            message:'Enrollment is successfully returned',
            data:takeOne
        })
    } catch (error) {
        console.error(error.message)
         res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


const remove = async(req,res)=>{
    try {
        const remove= await Enrollments.findByPk(req.params.id)

        if(!remove){
            return res.status(404).json({
                success:false,
                message:'no enrollments to delete'
            })
        }
        await remove.destroy()
        res.status(200).json({
            success:true,
            message:"Enrollment has been deleted successfully",
            deleteInfo:remove
        })
    } catch (error) {
        console.error(error.message)
          res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

const update= async(req,res)=>{
    try {
        const updating= await Enrollments.findByPk(req.params.id)
      if(!updating){
         return res.status(404).json({
                success:false,
                message:'no enrollments to update'
            })
      }
      await updating.update()
      res.status(200).json({
            success:true,
            message:"Enrollment has been Updated successfully",
            UpdateInfo:updating
        })
    } catch (error) {
         console.error(error.message)
          res.status(500).json({
            success:false,
            error:error.message
        })
    }
}






module.exports={create,getEnrollments,getOne,remove,update}
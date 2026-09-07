const {User}=require('../model/user.model')
const{Teachers}=require('../model/teacher.model')
const {Student}=require('../model/students.model')
const { Enrollments } = require('../model/enrollment.models')
const {Schedule}=require('../model/schdule.model')
const { Course } = require('../model/courses.model')


const getMe=async(req,res)=>{
try {
    
    const user= await User.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }


    return res.status(200).json({
        success: true,
        user
    });
} catch (error) {
    console.error(error.message)
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
    
}
}

const removeMe=async(req,res)=>{
    try {
          
    const user= await User.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    await user.destroy()
    res.status(200).json({
        success:true,
        message:'you have delete your own profile'
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const UpdateMe=async(req,res)=>{
    try {
          
    const user= await User.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    await user.update(req.body)
    res.status(200).json({
        success:true,
        message:'you have Updated your own profile',
        data:user
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const getTeachersMe=async(req,res)=>{
try {
    
    const teacher= await Teachers.findByPk(req.user.id)
    if (!teacher) {
        return res.status(404).json({
            success: false,
            message: 'Teacher not found'
        });
    }


    return res.status(200).json({
        success: true,
        teacher:teacher
    });
} catch (error) {
    console.error(error.message)
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
    
}
}

const removeTeacherMe=async(req,res)=>{
    try {
          
    const user= await Teachers.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Teacher not found'
        });
    }
    await user.destroy()
    res.status(200).json({
        success:true,
        message:'you have delete your own profile'
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const UPdateTeacherMe=async(req,res)=>{
    try {
          
    const user= await Teachers.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Teacher not found'
        });
    }
    await user.update(req.body)
    res.status(200).json({
        success:true,
        message:'you have Updated your own profile',
        data:user
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const getStudentsMe=async(req,res)=>{
try {
    
    const student= await Student.findByPk(req.user.id)
    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'student not found'
        });
    }


    return res.status(200).json({
        success: true,
        student:student
    });
} catch (error) {
    console.error(error.message)
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
    
}
}

const removeStudentMe=async(req,res)=>{
    try {
          
    const user= await Student.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }
    await user.destroy()
    res.status(200).json({
        success:true,
        message:'you have deleted your own profile'
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const UpdateStudentMe=async(req,res)=>{
    try {
          
    const user= await Student.findOne(
        {
           where: 
            {user_id:req.user.id}})  
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }
    await user.update(req.body)
    res.status(200).json({
        success:true,
        message:'you have Updated your own profile',
        data:user
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const getEnrollMe = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                user_id: req.user.id
            }
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const enrollments = await Enrollments.findAll({
            where: {
                student_id: student.id
            },
            include: [
                {
                    model: Student,
                    as: "Student"
                },
                {
                    model: Course,
                    as: "Course"
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "My enrollments returned successfully",
            information: enrollments
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}; 
const removeEnrollMe = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                user_id: req.user.id
            }
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const enrollment = await Enrollments.findOne({
            where: {
                id: req.params.id,
                student_id: student.id
            }
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        const course = await Course.findByPk(enrollment.course_id);

        if (course) {
            course.capacity += 1;
            await course.save();
        }

        await enrollment.destroy();

        return res.status(200).json({
            success: true,
            message: "You have been unenrolled successfully"
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const UpdateEnrollments=async(req,res)=>{
    try {
          
    const user= await Enrollments.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }
    await user.update(req.body)
    res.status(200).json({
        success:true,
        message:'you have Updated your own profile',
        data:user
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}


const getCourseMe=async(req,res)=>{
try {
    
    const student= await Course.findByPk(req.user.id)
    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }


    return res.status(200).json({
        success: true,
        student:student
    });
} catch (error) {
    console.error(error.message)
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    })
    
}
}

const removeCourseMe=async(req,res)=>{
    try {
          
    const user= await Course.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }
    await user.destroy()
    res.status(200).json({
        success:true,
        message:'you have deleted your own course'
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
const UpdateCourseMe=async(req,res)=>{
    try {
          
    const user= await Course.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }
    await user.update(req.body)
    res.status(200).json({
        success:true,
        message:'you have Updated your own Course',
        data:user
    })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}



const { Op } = require("sequelize");

const getScheduleMe = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                user_id: req.user.id
            }
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const enrollments = await Enrollments.findAll({
            where: {
                student_id: student.id
            }
        });

        if (enrollments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in any courses"
            });
        }

        const courseIds = enrollments.map(
            (enrollment) => enrollment.course_id
        );

        const schedules = await Schedule.findAll({
            where: {
                courses_id: {
                    [Op.in]: courseIds
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "My schedules returned successfully",
            information: schedules
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={getTeachersMe,removeTeacherMe,UPdateTeacherMe,getMe,UpdateMe,removeMe,UpdateStudentMe,getStudentsMe,removeStudentMe,getEnrollMe,UpdateEnrollments,removeEnrollMe,UpdateCourseMe,removeCourseMe,getCourseMe,getScheduleMe}



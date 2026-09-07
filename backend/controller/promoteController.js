const {Teachers}=require('../model/teacher.model')
const{User}=require('../model/user.model')
const{sequelize}=require('../config/database.config')


const promoteToTeachers=async(req,res)=>{
    const transaction= await sequelize.transaction()
    try {
        const {
            userId, 
            department_id,
            phone,
            hire_date
        } = req.body;
        const user= await User.findOne({
            where:{
                id: userId,
                role:'student'
            },
            transaction
        })


        if (!user) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: 'teacher not found'
            });
        }
        await user.update({
            role:'teacher'
        },
    {
        transaction
    })

    const createTeachers= await Teachers.create({
          user_id: user.id,
                department_id,
                phone,
                hire_date,
                role:'teacher'
    },{
        transaction
    })
       await transaction.commit();
         return res.status(201).json({
            success: true,
            message: 'User has been promoted successfully  to teacher',
            data: createTeachers
        });
    } catch (error) {
     await transaction.rollback();

        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
       
    }
}

module.exports={promoteToTeachers}
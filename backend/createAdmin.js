const {User}=require('./model/user.model')
const{sequelize}=require('./config/database.config')
const { Teachers } = require('./model/teacher.model')


const PromoteTeachers =async()=>{
    const transaction= await sequelize.transaction()
    try {
        await sequelize.authenticate()
        
        const [updated]=await User.update({
            role:'admin'
        },
         {
                where: {
                 email: "michael.johnson@example.com",   
                    role: 'student'
                },
                transaction
            }
    
    )
    console.log(updated)
      if (updated === 0) {
        await transaction.rollback()
            console.log('User not found or is not a student.');
            return;
        }

        const user= await User.findOne({
            where:{
                email: "asad.smith@example.com"
            },
            transaction
        })


    
       await transaction.commit()
        
    } catch (error) {
        await transaction.rollback()
        console.error(error.message)
    }
    finally{
         await sequelize.close()
    }
}

PromoteTeachers()





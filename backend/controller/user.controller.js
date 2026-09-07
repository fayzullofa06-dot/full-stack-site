const {User}=require('../model/user.model')
const { sequelize } = require("../config/database.config");
const { Student } = require("../model/students.model");
const jsonwebToken=require('jsonwebtoken')


const bcrypt=require('bcrypt')


const registerUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;
    console.log(req.body)

    console.log(email)
    const existingUser = await User.findOne({
      where: { email },
      transaction
    });
    console.log(email)

    if (existingUser) {
      await transaction.rollback();

      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    console.log(email)
    const user = await User.create(
      {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "student"
      },
      {
        transaction
      }
    );
    console.log(email)

    const student = await Student.create(
      {
        user_id: user.id,
        department_id: null,
        status: "active"
      },
      {
        transaction
      }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      userData: user,
      studentData: student
    });

  } catch (error) {
    await transaction.rollback();

    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


const login= async(req,res)=>{
    try {
      console.log(req.headers)
        const {email,password}=req.body
        if(!email||!password){
          return res.status(400).json({
           success:false,
            message: 'Email and password are required'
          })
        }
        const user= await User.findOne({where:{email}})
        if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
          return res.status(400).json({
            success:false,
            message:" The password does not match"
          })
        }
        const token=jsonwebToken.sign(
          {id:user.id,email:user.email,role:user.role},
          process.env.PASSWORD,
          {
            expiresIn:process.env.after
          }
        )
        res.status(200).json({
          success:true,
          message:'you have logged in successfully',
          token:token,
          info:user
        })
        console.log(req.headers)
    } catch (error) {
        console.error("LOGIN ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);

        console.error(error.message)
          return res.status(500).json({
            success:false,
            message: error.message });
    }
}

const get=async(req,res)=>{
  try {
    const get=await User.findAll()
    res.status(201).json({
      success:true,
      data:get
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      success:false,
      error:message.error
    })
    
  }
}
const remove=async(req,res)=>{
  try {
    const removing= await User.findByPk(req.params.id)

    if(!removing){
      return res.status(400).json({
        success:false,
        message:'No user found to delete'
      })
    }
    await removing.destroy()
    res.status(200).json({
      success:true,
      message:"U have delete successfully"
    })
  } catch (error) {
   console.error(error.message)
   res.status(500).json({
    success:false,
    message:error.message
   }) 
  }
}
const update=async(req,res)=>{
  try {
    const removing= await User.findByPk(req.params.id)

    if(!removing){
      return res.status(400).json({
        success:false,
        message:'No user found to Update'
      })
    }

    if(req.body.role === 'teacher'){
      return res.status(400).json({
        success:false,
        message:'Use the promote-to-teacher endpoint to make a user a teacher'
      })
    }

    await removing.update(req.body)
    res.status(200).json({
      success:true,
      message:"U have Updated successfully"
    })
  } catch (error) {
   console.error(error.message)
   res.status(500).json({
    success:false,
    message:error.message
   }) 
  }
}
module.exports={registerUser,login,get,remove,update} 
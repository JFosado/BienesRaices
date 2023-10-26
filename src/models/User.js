import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const User=db.define('tbb_users',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },

    token:{
        type: DataTypes.STRING,
        defaultValue:"",
        unique:true
    },
    verified:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    } 
},
{
    hooks:{beforeCreate:async(User)=>{
        const salt= await bcrypt.genSalt(10);
        User.password=await bcrypt.hash(User.password,salt);
    }}
})


export default User;
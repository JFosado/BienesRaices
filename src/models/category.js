import {DataTypes} from "sequelize";
import db from "../config/db.js";

const Category = db.define('tbc_categories',{
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    },status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
})

export default Category
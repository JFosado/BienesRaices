import { DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Property = db.define('tbb_properties',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey: true
    }, 
    title:{
        type:DataTypes.STRING(150),
        allowNull: false
    }, 
    description:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    rooms:{
        type:DataTypes.INTEGER,
        defaultVaue:0,
        allowNull:false
    }, wc:{
        type:DataTypes.INTEGER,
        defaultVaue:0,
        allowNull:false
    }, parkinglots:{
        type:DataTypes.INTEGER,
        defaultVaue:0,
        allowNull:false
    }, street:{
        type: DataTypes.STRING(100),
        allowNull:false
    },lat:{
        type: DataTypes.STRING,
        allowNull:false
    }, lng:{
        type: DataTypes.STRING,
        allowNull:false
    },image:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"Por definir"
    },published:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
})

export default Property
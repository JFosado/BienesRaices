import {exit} from 'node:process';
import Category from '../../models/category.js';
import categories from './categorySeed.js';
import Price from '../../models/price.js'
import prices from './priceSeed.js'
import db from '../../config/db.js';

const importData = async() => {
    try{
        // Autenticar 
        await db.authenticate();
        // Generar las columnas
        await db.sync();
        // Importar los datos


        await Promise.all(
            [
                Category.bulkCreate(categories),
                Price.bulkCreate(prices)
            ]);


    } catch(err) {
        console.log(err);
        exit(1)
    }
}

const deleteData = async() =>{
    try {
        const queryResetCategoryID="ALTER TABLE tbc_categories auto_increment = 1;";
        const queryResetPriceID="ALTER TABLE tbc_prices auto_increment = 1;";
        
        await Promise.all(
            [
                Category.destroy({where:{},truncate:false}),
                Price.destroy({where:{},truncate:false})
            ]);
        await Promise.all(
            [
                db.query(queryResetCategoryID,{raw:true}),
                db.query(queryResetPriceID,{raw:true})
            ]);
        
    } catch (error) {
     console.log(error);  
    }

}
if(process.argv[2]==="-i"){
    importData();
}

if(process.argv[2]==="-d"){
    deleteData();
}
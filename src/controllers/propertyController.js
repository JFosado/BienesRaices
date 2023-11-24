import Property from '../models/property.js'
import Category from '../models/category.js'
import Price from '../models/price.js'
import {check,validationResult} from "express-validator"


const formProperty = async(request,response) => {
    //TODO oObtener los precios y categorias actuales, enviarlos al formulario
    const[categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])
    response.render('properties/create.pug', {
        page: 'New Property',
        showHeader: true,
        categories, prices,
        data: request.body
    })
}

const saveNewProperty = async(request, response) => {
    await check("title").notEmpty().withMessage("The title es required").isLength({min:15, max:150}).withMessage("The title property must have between 15 and 150 characters").run(request)
    await check("description").notEmpty().withMessage("The description is required").run(request)
    await check("category").notEmpty().withMessage("The category is required").isInt({min:1,max:5}).withMessage("The category is unknown").run(request)
    await check("priceRange").notEmpty().withMessage("The price range is required").isInt({min:1,max:8}).withMessage("The price is unknown").run(request)
    await check("nRooms").notEmpty().withMessage("The number of rooms is required").isInt({min:0,max:10}).withMessage("The number is unknown").run(request)
    await check("nwc").notEmpty().withMessage("The number of W.C. is required").isInt({min:0,max:8}).withMessage("The number is unknown").run(request)
    await check("parkingLot").notEmpty().withMessage("The number of rooms is required").isInt({min:0,max:8}).withMessage("The number is unknown").run(request)

    console.log(`lat: ${request.body.lat} y lng: ${request.body.lng}`);
}

export {formProperty, saveNewProperty}
import express from 'express'

const router= express.Router();


//Rutas a traves de GET
//router.get('/',(request,response)=>response.send("Hola web desde GET"))

router.get('/',(request,response)=>response.render("../views/layout/index.pug",{page: "HOME"}))
router.get('/quienEres',(request,response)=> response.send("Soy tu primera App Web en arquitectura SOA"))

router.get('/queUsas',(request,response)=> response.send("Estoy construida en el lenguaje JavaScript y utilizao el microservidor de express"))

router.get('/misDatos',(rq,re)=> re.json({nombre: "Jose Angel Fosado Animas", fechaNacimiento: "1998-09-02", matricula: "221004"}))

router.get('/queDiaEsHoy',(request,response)=>response.send(`${new Date()}`))


//Rutas a traves de POST 
//NOTA: las rutas deben ser unicas por verbo

// router.post('/',(request,response)=>response.send("Hola web desde POST"))
// //Rutas a traves de PUT
// router.put('/',(request,response)=>response.send("You're trying to update some properties of data with PUT"))
// //Rutas a traves de PATCH
// router.patch('/',(request,response)=>response.send("Hi, you're trying to update all data object through PATCH"))
// //Rutas a traves de DELETE
// router.delete('/',(request,response)=>response.send("Are you sure that you eant to DELETE data?"))

export default router;
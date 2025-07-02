//paso 5 crear la funcion que autentica el token JWT
const jwt = require('jsonwebtoken');

// Esta función autentica el token JWT presente en las solicitudes HTTP
function autentifica(req,res,next){ 
    const jwtoken = req.header('Authorization');// Obtiene el token del encabezado de autorización
    if(!jwtoken){//condicion para corroborar si el token se obtuvo 
        return res.status(401).send({error: "No se ha proporcionado un token de autenticación"});
    }

    //'Try catch' para manejar errores al verificar el token
    // Si el token no es válido o ha expirado, se lanzará un error
    try{
        const payload = jwt.verify(jwtoken, 'c0ntr4s3n14');// Verifica el token usando la clave secreta
        req.user = payload; // Almacena el payload en el objeto request para su uso posterior
        next(); // Llama al siguiente middleware o ruta o funcion 
    }
    catch(e){
        res.status(400).send({error: "Token de autenticación inválido"});
    }
}

module.exports = autentifica;
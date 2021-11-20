// este metodo no solo soporta get si no post, put , delete y puedes agregar mas acciones, puedes personalizarlo a tu gusto o lo que mas te sirva de esta manera  todos los desarrolladores  siguen un estandar y controlas esa parte de la escritura de los apis o servicios que deces 
serv.api({
    name: "validate",
    action: "text"
}, "ValidateApiText", async function (req, ValidateApiText, send) {
    const result = await ValidateApiText.get(req.query);
    send(result)

});




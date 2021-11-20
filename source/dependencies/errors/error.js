var errors = {};

errors["NoError"] = { error: "", statusCode: 0 };
errors["noText"] = { error: "El valor ingresado no fue un texto", statusCode: 400 };
errors["textEmpty"] = { error: "No se a ingresado ningun texto valido", statusCode: 401 };
errors["ApiProblem"] = { error: "Existen problemas de procesos en este API", statusCode: 402 };

exports.ErrorHandler = function () {
    return errors;
}
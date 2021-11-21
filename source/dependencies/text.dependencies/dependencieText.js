const ErrorHandler = require("../errors/error").ErrorHandler;
class ValidateApiText {

    // defino mi contructor para inicializar mis objetos
    constructor() {
        this.errors = ErrorHandler();
        this.response = {
            statusCode: 0,
            error: "",
            res: {
                text: "",
                palindrome: false,
            }
        }
    }

    // Creao mi metodo llamado get que es el encargado de gestionar todo mi validacion y procesos de mi api
    get = (model) => {

        var verificar = (text) => {
            const result = validarText(text);
            const resultPalin = palindromeChecker(model.text);
            if (result) {
                this.response.res.text = resultPalin.reverseText
                this.response.res.palindrome = resultPalin.ispolindrome
                this.response.statusCode = 200;
                return this.response
            } else {
                return this.errors["noText"]
            }


        }

        // La siguiente funcion el texto  ingresado 
        var validarText = (text) => {
            // El pattern que vamos a comprobar
            const pattern = new RegExp('[a-zA-Z ]{2,254}');
            // Tercera validacion, si input contiene caracteres diferentes a los permitidos
            return !pattern.test(text) ? false : true

        }

        var palindromeChecker = (str) => {
            const strReversed = str.split("").reverse().join("")
            return { reverseText: strReversed, ispolindrome: strReversed === str ? true : false }
        }

        return new Promise((resolve) => {

            if (model.text !== undefined) {
                var res = verificar(model.text)
                resolve(res)
            } else {

                resolve(this.errors["textEmpty"])
            }

            // resolve(model)
        })
            .catch(() => {
                resolve(this.errors["ApiProblem"])
            })

    }

}

express.dependencies.ValidateApiText = new ValidateApiText();
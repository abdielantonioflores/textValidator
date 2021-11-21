const express = require('express')
var cors = require('cors')
const app = express()
const http = require("http").Server(app);
const fs = require("fs");
app.use(cors('*'))
'use  strict mode'

function Server(port) {
    // DEFINO MIS VARIABLES PARA EL USO DE MIS METODOS  
    var self = this;
    this.webserver = app;
    this.protocol = http
    this.webapis = [];
    this.dependencies = {};
    this.dependencies = {};
    this.middlewareBefore = [];
    this.middlewareAfter = [];
    this.proxyHolder = {};
    this.PATH = "";
    global.serv = this;

    // Mi  metodo api manejara todas las  configuraciones de mis apis siguiendo el estandar definido por el desarrollador, de esta manera   estandariso el manejo y creaciones de mis apis asi seran mas legibles para cada desarrollador.

    this.api = function () {
        if (arguments.length < 2) {
            throw new Error("Arguments required: apiSetting, function");
        }
        const totalArguments = arguments.length;
        let callback = new function () { return {}; };
        let argsOfObj = [];
        let apiName = "";
        let apiAction = "Index";
        let apiPath = undefined;
        let apiType = undefined;


        // Puedo configurar o parametrizar mi respuesta del api
        let apiParent = undefined;

        if (typeof arguments[0] != "object") {
            throw new Error("Missing object parameter");
        }

        let setting = arguments[0];

        if (setting.name === undefined) {
            throw new Error("The webapi name is not defined");
        }

        if (typeof setting.name != "string") {
            throw new Error("The webapi name is not defined");
        }

        if (setting.name.trim() == "") {
            throw new Error("The webapi name is not defined");
        }

        if (setting.action === undefined) {
            throw new Error("The webapi action is not defined");
        }

        if (typeof setting.action != "string") {
            throw new Error("The webapi action is not defined");
        }

        if (setting.action.trim() == "") {
            throw new Error("The webapi action is not defined");
        }

        // if (setting.parent !== undefined) {
        //     if (typeof setting.parent == "string") {
        //         apiParent = setting.parent;
        //     }
        // }

        if (setting.path !== undefined) {
            if (typeof setting.path == "string") {
                apiPath = setting.path;
            }
        }

        if (setting.type !== undefined) {
            if (typeof setting.type == "string") {
                if (setting.type.trim() != "") {
                    apiType = setting.type;
                }
            }
        }

        apiName = setting.name;
        apiAction = setting.action;

        callback = arguments[totalArguments - 1];
        if (typeof callback != "function") {
            throw new Error("The function is not defined");
        }

        if (totalArguments > 2) {
            const args = Array.prototype.slice.call(arguments, 1);
            args.splice(-1, 1);

            args.forEach((element) => {
                if (this.dependencies[element] !== undefined) {
                    argsOfObj.push(this.dependencies[element]);
                }
                else {
                    throw new Error("The dependency '" + element + "' does not exists");
                }
            });
        }

        if (typeof setting.methods === "undefined") {
            setting.methods = {
                get: callback
            };
        }
        else {
            setting.methods.get = callback;
        }

        let webApiObj = {
            "name": apiName.toLowerCase(),
            "action": apiAction.toLowerCase(),
            "path": apiPath,
            "methods": setting.methods,
            "type": apiType,
            "callbackArguments": argsOfObj,
            // "parent": apiParent
        };

        this.addWebApi(webApiObj);
    };

    // metodo encargado de agregar mi  api  siguiento mi objeto definido y ya estandarizado por el desarrollador
    this.addWebApi = function (obj) {

        if (obj.name === undefined) {
            throw new Error("The controller does not define a name");
        }


        if (typeof obj.action != "string") {
            throw new Error("The controller does not define a action string");
        }

        // if (obj.parent === undefined) {
        //     obj.parent = "response";
        // }

        if (obj.path === undefined) {

            obj.path = "/" + obj.name + "/" + obj.action;
        }

        if (typeof obj.path != "string") {
            obj.path = "/" + obj.name + "/" + obj.action;
        }

        if (obj.type === undefined) {
            obj.type = "GET";
        }

        if (typeof obj.type != "string") {
            obj.type = "GET";
        }

        obj.type = obj.type.toUpperCase();

        if (obj.callbackArguments === undefined) {
            obj.callbackArguments = [];
        }

        // Add the controller 
        this.webapis.push({
            "name": obj.name.toLowerCase(),
            "action": obj.action.toLowerCase(),
            "path": obj.path.toLowerCase(),
            "methods": obj.methods,
            "type": obj.type,
            "callbackArguments": obj.callbackArguments,
            // "parent": obj.parent
        });

        // console.log(this.webapis)
    };

    // este metodo  es el encargado de cargar todas mis dependencias de esta manera las tengo centralizada
    this.loadDependeciesOfApis = function () {
        let path = this.PATH + "/source/dependencies";

        if (fs.existsSync(path)) {
            let files = [];
            this.loadFiles(path, files);

            files.forEach((file) => {
                require(file);
            });
        }
    };


    // metodo encargado de cargar mis apis 
    this.loadWebApies = function () {
        let path = this.PATH + "/source/webapi";

        if (fs.existsSync(path)) {
            let files = [];
            // llamo el metodo para cargar el archivo 
            this.loadFiles(path, files);

            files.forEach((file) => {
                require(file);
            });

            // console.log(files)
        }
    };


    // metodo que solo me carga los archivos  de forma  que pueda  leer sincrónicamente el contenido de un directorio determinado.
    this.loadFiles = function (dir, list) {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = "" + dir + "/" + file;
            let stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this.loadFiles(filePath, list);
            }
            else {
                if (file.split(".").pop() === "js") {
                    list.push(filePath);
                }
            }
            // console.log(filePath)
        });
    };


    // metodo para procesar los metodos de mis apis 
    this.processApiMethods = function (req, res, arguments, element) {
        arguments.push(function (model, err) {
            if (err) {
                throw err;
            }
            else {
                self.processApiRequest(req, res, element, model);
            }
        });

        model = element.callback.apply(null, arguments);
        if (model) {
            if (typeof model.then === "function") {
                model.then(function (dataModel) {
                    self.processApiRequest(req, res, element, dataModel);
                }).catch(function (err) {
                    throw err;
                });
            }
            else {
                self.processApiRequest(req, res, element, model);
            }
        }
    };

    // metodo para procesar los request de los metodos definidos y permitidos de mis apis
    this.processWebApiRequest = function (element, req, res, method) {
        let model = {};

        var arguments = [];
        arguments.push(req);
        element.callbackArguments.forEach((item) => {
            arguments.push(item);
        });

        if (typeof element.methods[method] === "undefined") {
            throw new Error(`The method "${method}" is not defined`);
        }

        element.callback = element.methods[method];
        this.processApiMethods(req, res, arguments, element);
    };


    // valida mis apis 
    self.processApiRequest = function (req, res, element, model, next) {
        // if (serv.forceJSON) {
        //     req.params.type = "json";
        // }
        if (req.params.type !== undefined) {
            var responseModel = {};
            responseModel = model;
            res.send(responseModel);

        }
        else {
            throw new Error("The web api response type is not defined");
        }
    }


    // Metodo que inicializa el server y carga todas las dependencias y apis de las mismas, de manera de que no tenga que estar haciendo un require por cada api o  servicio de cada api  que valla escribiendo 
    this.start = function (port, path, logMsg) {
        // Inicializo la data y mis metodos
        this.PATH = path;
        this.loadDependeciesOfApis();
        this.loadWebApies();


        // console.log(this.webserver.route("/webapi" + path + "/:type"))

        // agrega los web apis y los metodos permitidos de cada uno de ellos, de manera si quiero agregar un nuevo metodo puedo hacerzo, de esta menera controlo mis apis
        this.webapis.forEach((element) => {
            const path = element.path;
            this.webserver.route("/webapi" + path + "/:type").get((req, res) => {
                // console.log(res)

                this.processWebApiRequest(element, req, res, "get");
            }).post((req, res) => {
                this.processWebApiRequest(element, req, res, "post");
            }).put((req, res) => {
                this.processWebApiRequest(element, req, res, "put");
            }).delete((req, res) => {
                this.processWebApiRequest(element, req, res, "delete");
            });
        });


        // Valida la cabezera o  el contenido que tendra mi api de esta manera yo puedo configurar mis salidas en diferentes formatos ya sea xml o json  o text  como lo quiera parametrizar 
        this.webserver.use((err, req, res, next) => {
            var errorObj = { Code: 500, Message: err.stack };
            res.set("Content-Type", "application/json");
            var responseModel = {};
            responseModel["Error"] = errorObj;

            res.status(500).send(responseModel);
            next();
        });



        this.webserver.use((req, res) => {

            res.set("Content-Type", "application/json");

            var responseModel = {};
            responseModel["Error"] = { code: 404, message: "la ruta del API no fue encontrada" };

            res.status(404).send(responseModel);
            next();
        });





        // Inicializo mi server 
        logMsg = "APLICATION SERVER is running on port " + port;
        this.protocol.listen(port, () => console.log(logMsg));

    };


}


exports.serv = function () {
    return new Server(app, http);
};
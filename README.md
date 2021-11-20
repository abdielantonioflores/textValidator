> Proyecto que determina si el texto es palindome y te muestra el valor invertido, se utilizo un modulo de mas para manejo de cors en los apis

# Bajar el proyecto

> Para poder ejecutar el proyecto en su maquina debe tener la version 12 de nodejs y seguir los siguientes pasos:

- Abrir la consola de su preferencia y dirigirce a una carpeta especifica en donde quiere clonar este repositorio 

-  Bajar del repositorio para esto debe clonar el este repositorio para ello escriba lo siguiente:   **git clone https://github.com/abdielantonioxd/textValidator.git * este le generara una carpeta llamada **"textValidator"**

- Luego ir a la carpeta que genero el clone que acaba de realizar  mediante la consola de la siguiente manera  **cd textValidator**
-  Una vez esta en la carpeta indicada coloque el siguiente comando **npm install**  este comando le bajara los modulos utilizados que estan definidor en el package.json

> Los modulos necesarios son los siguientes: 
```js
    "dependencies": {
    "express": "^4.17.1"
    },
    "devDependencies": {
        "chai": "^4.3.4",
        "mocha": "^9.1.3",
        "supertest": "^6.1.6"
    }

```

> Una vez que termine esa descarga ya va a disponer del proyecto descargado y listo para ser usado  en su maquina de manera local.

# Ejecucion de pruebas

> Para poder ejecutar las pruebas solo debe ejecutar el siguiente comando

- npm test

> se ejecutaran las pruebas definidas en el archivo de test que se a creado y hara un test al api creado 



# Ejecucion de proyecto

> Para poder ejecutar debe escribir el siguiente comando

- en la consola coloque **npm start**  el respondera lo siguiente **APLICATION SERVER is running on port 5000**

> Una vez el aplicativo back-end este arriba podemos probar el api y poder enviarle valores ya sea directamente en la web o tambien desde Postman, para ello debe escribir en cualquiera de los 2 casos el endpoint del api habilitado en este proyecto en el navegador o postman  **http://localhost:5000/webapi/validate/text/json**  



> Este Api  si lo escribiste tal cual en el navegador te enviara una respuesta como:
```js
    {
        "error": "No se a ingresado ningun texto valido",
        "statusCode": 401
    }
```


> De esta manera sabemos que el api esta respondiendo de manera correcta 

# ----- APIS------
> Este Api te valida si es texto el valor que escribes y te lo debuelve la respuesta invertida y te dice si este texto ingresado es palindrome



> Tenemos publico un api llamado **api/validate/text/json**.
> Puedes pegar directamente este Api en tu navegador **http://localhost:5000/webapi/validate/text/json** y si todo se ejecuto correctamente debe mostrarte la siguiente respuesta :

```js
    {
        "error": "No se a ingresado ningun texto valido",
        "statusCode": 401
    }

```

> Si tenemos esta respuesta quiere decir que el api esta funcionando correctamente.


# Enviar datos a validar 
> Le podemos pasar parametros por get a este api y el respondera si el text es valido o no, un ejemplo seria el siguiente 

> Si colocamos los siguientes parametros en el  navegador como :  **http://localhost:5000/webapi/validate/text/json?text=oso**

> Una respuesta correcta seria la siguiente: 

```js
    {
        "statusCode": 200,
        "error": "",
            "res": {
                "text": "oso",
                "ispalimdrome": true
            }
    }
```

> Puedes colocar cualquier tipo de valor  despues de   **?text=**  y este te validara si el texto o  valor ingresado es valido como tambien te diraa si es palimdromo o no con el flag llamado **ispalimdrome** true si es y false de no serlo


# Manejo de errores
> Este Api retorna  las siguientes posibles respuestas 
```js
errors["NoError"] = { error: "", statusCode: 0 };
errors["noText"] = { error: "El valor ingresado no fue un texto", statusCode: 400 };
errors["textEmpty"] = { error: "No se a ingresado ningun texto valido", statusCode: 401 };
errors["ApiProblem"] = { error: "Existen problemas de procesos en este API", statusCode: 402 };
```
> En este proyecto  trate de probar una libreria que trato de perfecionar  escrita en js para manejo de api con express js, de esta manera obligo a seguir un estandar para la gestion de las apis de manera legible por los desarrrolladores.


conclusion:
     El manejo de apis se puede mejorar aun mas  acepto recomendaciones me ayudarian mucho en mi crecimiento personal y profesional
> Proyecto que determina si el texto es palindome y te muestra el valor invertido

# Bajar el proyecto

> Para poder ejecutar el proyecto en su maquina debe tener la version 12 de nodejs y seguir los siguientes pasos:

-  Bajar del repositorio para esto debe clonar el este repositorio para ello escriba lo siguiente:   **git clone https://github.com/abdielantonioxd/textValidator.git *
-  Una vez clonado abrir el archivo con gitbatch o su consola CMD preferida y ejecutar el comando **npm install**

# Ejecucion de pruebas

> Para poder ejecutar las pruebas solo debe ejecutar el siguiente comando

- npm test

# Ejecucion de proyecto

> Para poder ejecutar debe escribir el siguiente comando

- en la consola coloque **npm start**

> Una vez el aplicativo back-end este arriba podemos probar el api y poder enviarle valores

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


> En este proyecto  trate de probar una libreria que trato de perfecionar  escrita en js para manejo de api con express js, de esta manera obligo a seguir un estandar para la gestion de las apis de manera legible por los desarrrolladores
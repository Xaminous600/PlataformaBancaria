# Plataforma Bancaria

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)

Tabla de contenidos
=================

   * [Aplicación Bancaria Full Stack](#Aplicación-Bancaria-Full-Stack)
     * [Tecnologías empleadas](##Tecnologías-empleadas)
     * [Arquitectura de microservicios](##Arquitectura-de-microservicios)
	 * [Back End](#Back-End)
	   * [Autenticación ](#gh-md-toc)
	    * [JWT (JSON Web Tokens)](#gh-md-toc)
		* [Workflow](#gh-md-toc)
			* [Ejemplo con POSTMAN](#gh-md-toc)
	  * [Implementación](#gh-md-toc)
	 * [Front End](#gh-md-toc)
	    * [Componentes y Custom Hooks](#gh-md-toc)
		* [Implementación](#gh-md-toc)
	 

# Aplicación Bancaria Full Stack
¡Bienvenidos! He desarrollado una aplicación web con una arquitectura de microservicios Y autenticación JWT, que recrea principalmente  la gestión y realización de transferencias bancarias. A continuación, a lo largo de todo el README comentaré todos los aspectos que he implementado y la estructura de la misma. 
## Tecnologías empleadas
Esta aplicación se ha realizado con las siguientes tecnologías:
* **Front-End:**  React, Next.js, HTML, JavaScript y Css.

* **Back-End:**  Java + Spring Boot + JPA, MySQL

## Arquitectura de microservicios
Toda la tecnología empleada para el desarrollo Front-End se ejecutará en el servidor 3000, mientras que toda la tecnología llevada para el funcionamiento del Back-End se ejecuta en el puerto 8080. Inclusive, la base de datos escucha en el puerto 3306. 

LLegado a estas circustancias, la principal duda que nos puede llegar es: **¿Cómo se comunican las distintas partes de la aplicación?**

La respuestas es bastante sencilla y es a través de servicios web. Es por esta razón que la aplicación desarrollada emplea una arquitectura orientada a **microservicios**. Dichos servicios están integrados con el uso de la **arquitectura REST**.

![MicroServicios](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/fa079933-93c8-4d12-93ce-36390c85f4d7)
## Back End
La funcionalidad del Back End se ha llevado a cabo con el uso de  **Java**, uno de los lenguajes de programación más populares y versátiles en la industria del desarrollo de software. Java ofrece una amplia gama de herramientas y frameworks que facilitan la creación de sistemas robustos y escalables, lo que lo convierte en una elección común para la implementación del lado del servidor en aplicaciones web y empresariales.

Para potenciar la eficiencia y la seguridad del sistema se ha empleado **JPA (Java Persistence API)** el cual proporciona una capa de abstracción sobre el acceso a la base de datos, simplificando las operaciones de persistencia de datos. 

Por otro lado, se ha utilizado también **Spring Boot** para crear las API´s y además, también ofrece un conjunto de herramientas y funcionalidades para gestionar la autenticación y la autorización de usuarios de manera robusta y flexible, permitiendo implementar políticas de seguridad personalizadas y adaptadas a los requisitos específicos del proyecto. 
### Autenticación
Uno de los principales problemas que supone el uso de una arquitectura de microservicios es el acceso no autorizado a alguno de estos servicios , debido a que el usuario no disponga los privilegios necesarios. Por ejemplo, un usuario normal no puede visualizar ni modificar datos de otros usuarios.

Por esta razón, se ha implementado un servicio de autenticación, en este caso JWT. Pero, **¿qué es JWT?** 

#### JWT (JSON Web Tokens)
 Los JWT son un estándar abierto que proporciona un método compacto y seguro para transmitir información entre partes como un objeto JSON. 
 
 Se emite después de que un usuario se autentica exitosamente y contiene cierta información **(claims)** que puede ser verificada y confiable debido a su firma digital. 
 
 Un token JWT está compuesto por tres partes separadas por puntos ("."): el encabezado, el cuerpo, y la firma.

* **Encabezado (Header):** El encabezado del token JWT contiene metadatos sobre el tipo de token y el algoritmo de firma utilizado.

* **Cuerpo (Payload):** El cuerpo del token JWT contiene los datos que se desean transmitir. Estos datos se llaman claims y pueden ser cualquier información relevante para la aplicación. 

* **Firma (Signature):** La firma del token JWT se calcula utilizando el encabezado codificado, el cuerpo codificado y una clave secreta conocida solo por el servidor que emite el token. 

![JWT](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/cc926e7b-349c-4a29-ac59-67d66791e691)

#### Workflow
Para iniciar sesión, el usuario envía una petición POST al servicio encargado de autenticar a los usuarios.  A continuación, esta request pasa por el filtro de autenticación el cual es el encargado de comprobar la existencia del token, su desencriptación y validación y por último, añade la configuración necesaria para autorizar la peticion.

En este caso, al iniciar sesión el token es nulo ya que este se genera tras el login. A continuación, se da lugar al controlador de autenticación el cual a su vez llamará al servicio de autenticación. 

Este servicio, buscará en la base de datos al usuario correspondiente y a través del servicio de JWT, se encargará de generar el token correspondiente y lo devolverá de vuelta al cliente en el cuerpo del mensaje con un encabezado de respuesta 200.

En todo momento, cuando queramos consultar un servicio que esté protegido, tendremos que enviar junto a la petición el token generado para que pueda ser validado. Esto supone que en el front end, desde el momento que se hace el login, tengamos que almacenar el token localmente.

![worlFlowJWT](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/7f6681fb-4a8d-42d0-b65b-ac02ea3c82ff)

##### Prueba con POSTMAN
Tal y como podemos observar en la imagen inferior adjuntada, se dispone de una base de datos MySQL en la cual hay almacenados ya dos usuarios. A continuación, vamos a realizar un prueba con POSTMAN para verificar que output se obtiene tras el inicio de sesión.

![image](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/8e822297-6ee5-483f-be4f-05a3919b5e13)

Tras realizar una petición POST al servicio correspondiente con el inicio de sesión y tras la correcta validación del usuario, se ha procedido a su autenticación y generación de JWT.

![image](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/1594ac07-f692-4847-8915-481b757e4a8b)

## Front End
La realización del Front End se ha llevado a cabo con el uso de **React,** el cual es una biblioteca de JavaScript ampliamente usada en el desarrollo web. Es por esta razón, que se ha utilizado también **Next.js,** ya que nos va a permitir navegar entre las distintas rutas sobre las cuales está compuesta la aplicación.

### Componentes y Custom Hooks
Una de las principales características de React es la componetización de la interfaz, es decir, dividir la interfaz en componentes cada uno con sus propios estado.

Tanto el registro como el login se han dividido en dos componentes, cada uno con sus respectivos **custom hooks** y llamadas a los **servicios correspondientes.** Tal y como podemos en la siguiente imagen, la cual representa la división del proyecto:

![estructuraProyecto](https://github.com/Xaminous600/PlataformaBancaria/assets/98296039/668536bb-cc96-46cd-9270-c56f01fe9b7c)

### Registro e Inicio de Sesión
Estos dos componentes principalmente se encargarán de visualización de los formularios y los customs hooks respectivos, de la lógica de los mismos. Es decir, de la verificación de los datos introducidos por el usuario.

Para ello se ha definido un estado que almacenará todos los valores del formulario, otro estado que almacenará los errores arrojados tras la autenticación, una función encargada de recopilar los datos introducidos, una función encargada de comprobar los errores y por último, la función encargada de realizar la llamda al back end.

### Custom Hook Registro
```javascript
'use client'
import { useState } from "react"
import { registroUsuario } from "../services/services";

export default function useFormRegistro(){
    const [values ,setValues] = useState({
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        email: '',
        password: '',
        password2: ''
    })

    const [errors, setErrors] = useState({  
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        email: '',
        password: '',
        password2: ''
    })

    function onChange(e){
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function verificacionRegistro(){...}
    
    async function registro(event){...}

    return{
        values,
        errors,
        onChange,
        registro
    }
}

```
Tras su correcta revisión, se envía una **petición POST** al backend, cada uno a su servicio correspondiente (Login o Registro). 

Tal y como hemos visto anteriormente, tras registrarse simplemente se enviará en el cuerpo de mensaje un encabezado de respuesta **200 (OK)** o en caso de que ya exista un usuario, se enviará un encabezado de respuesta **406 (Validación Fallida).**

En todo momento, el front end tiene que recoger dichas respuestas y notificar al usuario. Ya sea de éxito u error.

Por otro lado, el inicio de sesión se realiza identicamente que el registro pero en este caso se arrojará al usuario un String con el token. Tras recibir este token, tendremos que guardarlo ya que para todos los servicios protegidos, tendremos que enviar dicho token para que el back end lleve a cabo la validación.

### Función encargada de llamar al servicio de Login
```javascript
export async function loginUsuario(email, password){
   const requestOptions = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({ 
         email: email,
         password: password
      })
   }
   
   await fetch('http://localhost:8080/auth/login', requestOptions)
         .then(response => {
            if(!response.ok){
               throw new Error('Usuario o contraseña incorrectos');
            }
            else{
               return response.json();
            }
         })
         .then(data =>  almacenarToken(data.token))
}

function almacenarToken(token){
   localStorage.setItem('token', token); 
}
```


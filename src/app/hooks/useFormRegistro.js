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

    function verificacionRegistro(){
        let errors = {};

        if(!values.email){
            errors.email = 'El campo email es obligatorio'
        }

        if(!values.fechaNacimiento){
            errors.fechaNacimiento = 'El campo fecha de nacimiento es obligatorio'
        }

        if(!values.password){
            errors.password = 'El campo contraseña es obligatorio'
        }

        if(!values.password2){
            errors.password2 = 'El campo repetir contraseña es obligatorio'
        }

        if(!values.nombre){
            errors.nombre = 'El campo nombre es obligatorio'

        }

        if(!values.apellidos){
            errors.apellidos = 'El campo apellidos es obligatorio'
        }

        setErrors(errors);
        
        return errors.email === '' && errors.fechaNacimiento === '' && errors.password === '' && errors.password2 === '' && errors.nombre === '' && errors.apellidos === '';
    }
    
    async function registro(event){
        event.preventDefault();
        
        if(!verificacionRegistro()){
          return;
        }
        
        console.log(values);
        try{
          await registroUsuario(event.target.nombre.value, event.target.apellidos.value, event.target.fechaNacimiento.value, event.target.email.value, event.target.password.value);
          alert('Usuario registrado con éxito');
          setValues({
            nombre: '',
            apellidos: '',
            fechaNacimiento: '',
            email: '',
            password: '',
            password2: ''
          })
        }
        catch(e){
          if(e.message === 'El correo electrónico ya está en uso'){
            alert(e.message);
          }
          else{
            alert('Error en el servidor');
          }
        }
    }

    return{
        values,
        errors,
        onChange,
        registro
    }
}
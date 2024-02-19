'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { loginUsuario } from "../services/services";

export default function useFormLogin(){
  const router = useRouter();

  const [values ,setValues] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
    
  function onChange(e){
      setValues({
          ...values,
          [e.target.name]: e.target.value
      })
  }

  function comprobarErrores(){
    let errors = {};

    if(!values.email){
      errors.email = 'El campo email es obligatorio'
    }

    if(!values.password){
      errors.password = 'El campo contraseña es obligatorio'
    }

    setErrors(errors);
    
    return errors.email || errors.password;
  }

  async function onSubmit(event){
    event.preventDefault();
    
    if(comprobarErrores()){
      return;
    }

    try{
      await loginUsuario(values.email, values.password);
      router.push('/panelUsuario');
    }
    catch(e){
      if(e.message === 'Usuario o contraseña incorrectos'){
        alert('Usuario o contraseña incorrectos');
      }
      else{
        alert('Error en el servidor');
      }
    }
  }

  return {
      values,
      errors,
      onChange,
      onSubmit
  }
}
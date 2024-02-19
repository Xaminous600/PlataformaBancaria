'use client'

import Image from "next/image";
import './page.css';  
import { useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";

export default function Home() {
  const [formLogin, setFormLogin] = useState(true);

  return (
    <main className='main'>
      <div className="contenedor">
        <section className="seccionIzquierda">
          <div>
            <h1>¡Bienvenido a BankHome!</h1>
            <Image src={'/bankHome.gif'} width={460} height={460} alt="Imagen Home Banco"/>
          </div>
        </section>
        <section className="seccionSuperiorMovil">
          <div>
            <h1>Bienvenido</h1>
            <h2>¡Inicia sesión o registrate para comenzar!</h2>
          </div>
        </section>
        <section className="seccionDerecha">
          <div>
            <div className='formulario'>
              <div className="cabecera">
                <button onClick={()=>{setFormLogin(true)}} style={formLogin ? {fontWeight:700} : null}>Iniciar Sesión</button>
                <button onClick={()=>{setFormLogin(false)}} style={formLogin ? null : {fontWeight:700}}>Registrarse</button>
              </div>
              {formLogin && <Login />}
              {!formLogin && <Registro />}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

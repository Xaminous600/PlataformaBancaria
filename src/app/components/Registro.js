'use client'
import {registroUsuario } from "../services/services";
import useFormRegistro from "../hooks/useFormRegistro";
import './Registro.css'

export default function Registro(){
  const {values, errors, onChange, registro} = useFormRegistro();

    return(
        <div className="cuerpoRegistro">
            <form onSubmit={registro}>
              <div>
                <div>
                  <p>Nombre</p>
                  <input type="text" name='nombre' placeholder="Javier" value={values.nombre} onChange={onChange}/>
                  <p style={{color:'red'}}>{errors.nombre}</p>
                </div>
                <div>
                  <p>Apellidos</p>
                  <input type="text" name='apellidos' placeholder="Pérez" value={values.apellidos} onChange={onChange}/>
                  <p style={{color:'red'}}>{errors.apellidos}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Fecha de nacimiento</p>
                  <input type="date" name='fechaNacimiento' value={values.fechaNacimiento} onChange={onChange}/>
                  <p style={{color:'red'}}>{errors.fechaNacimiento}</p>
                </div>

                <div>
                  <p>Correo electrónico</p>
                  <input type="text" name='email' placeholder="javier@gmail.com" value={values.email} onChange={onChange} />
                  <p style={{color:'red'}}>{errors.email}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Contraseña</p>
                  <input type="password" name='password' placeholder="*******" value={values.password} onChange={onChange} />
                  <p style={{color:'red'}}>{errors.password}</p>
                </div>

                <div>
                  <p>Confirmar contraseña</p>
                  <input type="password" name='password2' placeholder="*******" value={values.password2} onChange={onChange}/>
                  <p style={{color:'red'}}>{errors.password2}</p>
                </div>
              </div>
            
              <button type='submit'>Registrarse</button>
            </form>
        </div>
    )
}
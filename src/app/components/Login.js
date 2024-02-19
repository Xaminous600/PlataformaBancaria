import './Login.css';  
import useFormLogin from '../hooks/useFormLogin';

export default function Login(){

    const {values, errors, onChange, onSubmit} = useFormLogin();

    return(
        <div className="cuerpoLogin">
            <form onSubmit={onSubmit}>
                <div>
                    <p>Correo electrónico</p>
                    <input type="text" name='email' placeholder="javier@gmail.com" value={values.email} onChange={onChange}/>
                    <p style={{color:'red'}}>{errors.email}</p>
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" name= 'password' placeholder="*******" value={values.password} onChange={onChange}/>
                    <p style={{color:'red'}}>{errors.password}</p>
                </div>
                <button type='submit'>Ingresar</button>
            </form>
            <button>¿Olvidaste tu contraseña?</button>
      </div>
    )
}
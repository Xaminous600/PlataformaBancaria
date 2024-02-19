export async function peticionBack(){
   const requestOptions = {
      headers: { 
         'Content-Type': 'text/plain',
         'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXBlQHBlcGUuY29tIiwiaWF0IjoxNzA3OTExNjI4LCJleHAiOjE3MDc5MTMwNjh9.9RHLlhtfbFi5ifzrvgtC4seR_AgUFvi6sefAcKv2434",
         "Access-Control-Allow-Origin": "*"
      },
  };

   await fetch('http://localhost:8080/banco/panelUsuario', requestOptions).then(response => response.text()).then(data => console.log(data));
}

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


export async function registroUsuario(nombre, apellidos, fechaNacimiento, email, password){
   const requestOptions={
      method: 'POST',
      headers:{
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
         nombre: nombre,
         apellidos: apellidos,
         fechaNacimiento: fechaNacimiento,
         email: email,
         password: password
      })
   }

   await fetch('http://localhost:8080/auth/registro', requestOptions)
         .then(response => {
            if(!response.ok){
               throw new Error('El correo electrónico ya está en uso');
            }
         })
}
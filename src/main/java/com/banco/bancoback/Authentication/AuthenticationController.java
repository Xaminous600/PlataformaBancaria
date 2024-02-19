package com.banco.bancoback.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//EndPoinsts de acceso público

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private final AuthService authService;

    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        AuthResponse response = authService.login(loginRequest);
        
        if(response.getToken() == null){
            System.out.println("Usuario no autorizado");
            return ResponseEntity.status(401).body(response);
        }
        else{
            return ResponseEntity.ok(response);
        }
    }
    
    @PostMapping("/registro")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){ 
        boolean userRegistered = authService.register(registerRequest);

        if(!userRegistered){
            return ResponseEntity.status(409).body("El usuario ya está registrado");
        }
        else{
            return ResponseEntity.ok("El usuario ha sido registrado con éxito");
        }
    }
    
}

package com.banco.bancoback.Authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.banco.bancoback.Usuarios.Rol;
import com.banco.bancoback.Usuarios.Usuario;
import com.banco.bancoback.Usuarios.UsuarioRepository;
import com.banco.bancoback.config.JwtService;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse login(LoginRequest loginRequest) {

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        }catch (Exception e){
            return new AuthResponse(null);
        }
        
        Usuario usuario= usuarioRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        String token = jwtService.createToken(usuario);
        
        return new AuthResponse(token);
    }

    public boolean register(RegisterRequest registerRequest) {

        if(usuarioRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return false;
        }
        else{
            Usuario usuario = new Usuario(registerRequest.getNombre(), registerRequest.getApellidos(), registerRequest.getEmail(), passwordEncoder.encode(registerRequest.getPassword()), Rol.USER);
            usuarioRepository.save(usuario);
    
            return true;
        }
    }

}

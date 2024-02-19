package com.banco.bancoback.Usuarios;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/banco")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    @GetMapping("/panelUsuario")
    public String panelUsuario() {
        return "Hola Mundo";
    }
    
}

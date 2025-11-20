package pe.ahorrape.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.request.ActualizarUsuarioRequest;
import pe.ahorrape.dto.request.RegistrarUsuarioRequest;
import pe.ahorrape.dto.response.UsuarioResponse;
import pe.ahorrape.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public UsuarioResponse registrar(@Valid @RequestBody RegistrarUsuarioRequest request) {
        return usuarioService.registrarUsuario(request);
    }

    @GetMapping("/{id}")
    public UsuarioResponse obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id);
    }

    @GetMapping
    public List<UsuarioResponse> listar() {
        return usuarioService.listarUsuarios();
    }

    @PutMapping("/{id}")
    public UsuarioResponse actualizar(@PathVariable Long id,
                                      @Valid @RequestBody ActualizarUsuarioRequest request) {
        return usuarioService.actualizarUsuario(id, request);
    }

    @DeleteMapping("/{id}")
    public void desactivar(@PathVariable Long id) {
        usuarioService.desactivarUsuario(id);
    }
}

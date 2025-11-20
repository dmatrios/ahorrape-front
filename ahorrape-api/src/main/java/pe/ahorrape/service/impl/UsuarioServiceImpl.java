package pe.ahorrape.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.request.ActualizarUsuarioRequest;
import pe.ahorrape.dto.request.RegistrarUsuarioRequest;
import pe.ahorrape.dto.response.UsuarioResponse;
import pe.ahorrape.exception.RecursoNoEncontradoException;
import pe.ahorrape.model.Usuario;
import pe.ahorrape.repository.UsuarioRepository;
import pe.ahorrape.service.UsuarioService;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UsuarioResponse registrarUsuario(RegistrarUsuarioRequest request) {

        usuarioRepository.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Ya existe un usuario registrado con ese email.");
                });

        LocalDateTime ahora = LocalDateTime.now();

        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(request.getPassword()) // luego se encripta
                .activo(true)
                .creadoEn(ahora)
                .actualizadoEn(ahora)
                .build();

        usuarioRepository.save(usuario);

        return mapearAUsuarioResponse(usuario);
    }

    @Override
    public UsuarioResponse obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Usuario no encontrado con id: " + id)
                );

        return mapearAUsuarioResponse(usuario);
    }

    @Override
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapearAUsuarioResponse)
                .toList();
    }

    @Override
    public UsuarioResponse actualizarUsuario(Long id, ActualizarUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Usuario no encontrado con id: " + id)
                );

        // Actualizar nombre si vino y no está en blanco
        if (request.getNombre() != null && !request.getNombre().isBlank()) {
            usuario.setNombre(request.getNombre());
        }

        // Actualizar email si vino y no está en blanco
        if (request.getEmail() != null && !request.getEmail().isBlank()) {

            // Si cambió el email, validamos que no lo use otro usuario
            if (!request.getEmail().equalsIgnoreCase(usuario.getEmail())) {
                usuarioRepository.findByEmail(request.getEmail())
                        .ifPresent(u -> {
                            // Si el email pertenece a otro usuario distinto
                            if (!u.getId().equals(id)) {
                                throw new RuntimeException("Ya existe otro usuario con ese email.");
                            }
                        });

                usuario.setEmail(request.getEmail());
            }
        }

        usuario.setActualizadoEn(LocalDateTime.now());

        usuarioRepository.save(usuario);

        return mapearAUsuarioResponse(usuario);
    }

    @Override
    public void desactivarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Usuario no encontrado con id: " + id)
                );

        usuario.setActivo(false);
        usuario.setActualizadoEn(LocalDateTime.now());

        usuarioRepository.save(usuario);
    }

    private UsuarioResponse mapearAUsuarioResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail()
        );
    }
}

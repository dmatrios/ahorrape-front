package pe.ahorrape.service;

import java.util.List;

import pe.ahorrape.dto.request.ActualizarUsuarioRequest;
import pe.ahorrape.dto.request.RegistrarUsuarioRequest;
import pe.ahorrape.dto.response.UsuarioResponse;

public interface UsuarioService {

    UsuarioResponse registrarUsuario(RegistrarUsuarioRequest request);

    UsuarioResponse obtenerPorId(Long id);

    List<UsuarioResponse> listarUsuarios();

    UsuarioResponse actualizarUsuario(Long id, ActualizarUsuarioRequest request);

    void desactivarUsuario(Long id);
}

package pe.ahorrape.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.request.ActualizarTransaccionRequest;
import pe.ahorrape.dto.request.CrearTransaccionRequest;
import pe.ahorrape.dto.response.TransaccionResponse;
import pe.ahorrape.exception.RecursoNoEncontradoException;
import pe.ahorrape.model.Categoria;
import pe.ahorrape.model.TipoTransaccion;
import pe.ahorrape.model.Transaccion;
import pe.ahorrape.model.Usuario;
import pe.ahorrape.repository.CategoriaRepository;
import pe.ahorrape.repository.TransaccionRepository;
import pe.ahorrape.repository.UsuarioRepository;
import pe.ahorrape.service.TransaccionService;

@Service
@RequiredArgsConstructor
public class TransaccionServiceImpl implements TransaccionService {

    private final TransaccionRepository transaccionRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    @Override
    public TransaccionResponse crearTransaccion(CrearTransaccionRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id: " + request.getUsuarioId()));

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría no encontrada con id: " + request.getCategoriaId()));

        TipoTransaccion tipo;
        try {
            tipo = TipoTransaccion.valueOf(request.getTipo().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Tipo de transacción inválido. Debe ser INGRESO o GASTO.");
        }

        LocalDateTime ahora = LocalDateTime.now();

        Transaccion transaccion = Transaccion.builder()
                .usuario(usuario)
                .categoria(categoria)
                .tipo(tipo)
                .monto(request.getMonto())
                .fecha(request.getFecha())
                .descripcion(request.getDescripcion())
                .activa(true)
                .creadoEn(ahora)
                .actualizadoEn(ahora)
                .build();

        transaccionRepository.save(transaccion);

        return mapearATransaccionResponse(transaccion);
    }

    @Override
    public TransaccionResponse obtenerPorId(Long id) {
        Transaccion transaccion = transaccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Transacción no encontrada con id: " + id));

        return mapearATransaccionResponse(transaccion);
    }

    @Override
    public List<TransaccionResponse> listarPorUsuario(Long usuarioId) {
        return transaccionRepository.findByUsuarioIdAndActivaTrue(usuarioId)
                .stream()
                .map(this::mapearATransaccionResponse)
                .toList();
    }

    @Override
    public List<TransaccionResponse> listarPorUsuarioYRangoFechas(Long usuarioId, LocalDate fechaInicio, LocalDate fechaFin) {
        return transaccionRepository
                .findByUsuarioIdAndFechaBetweenAndActivaTrue(usuarioId, fechaInicio, fechaFin)
                .stream()
                .map(this::mapearATransaccionResponse)
                .toList();
    }

    @Override
    public TransaccionResponse actualizarTransaccion(Long id, ActualizarTransaccionRequest request) {
        Transaccion transaccion = transaccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Transacción no encontrada con id: " + id));

        if (request.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Categoría no encontrada con id: " + request.getCategoriaId()));
            transaccion.setCategoria(categoria);
        }

        if (request.getTipo() != null && !request.getTipo().isBlank()) {
            try {
                TipoTransaccion tipo = TipoTransaccion.valueOf(request.getTipo().toUpperCase());
                transaccion.setTipo(tipo);
            } catch (IllegalArgumentException ex) {
                throw new RuntimeException("Tipo de transacción inválido. Debe ser INGRESO o GASTO.");
            }
        }

        if (request.getMonto() != null) {
            transaccion.setMonto(request.getMonto());
        }

        if (request.getFecha() != null) {
            transaccion.setFecha(request.getFecha());
        }

        if (request.getDescripcion() != null) {
            transaccion.setDescripcion(request.getDescripcion());
        }

        transaccion.setActualizadoEn(LocalDateTime.now());

        transaccionRepository.save(transaccion);

        return mapearATransaccionResponse(transaccion);
    }

    @Override
    public void desactivarTransaccion(Long id) {
        Transaccion transaccion = transaccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Transacción no encontrada con id: " + id));

        transaccion.setActiva(false);
        transaccion.setActualizadoEn(LocalDateTime.now());

        transaccionRepository.save(transaccion);
    }

    private TransaccionResponse mapearATransaccionResponse(Transaccion t) {
        return new TransaccionResponse(
                t.getId(),
                t.getUsuario().getId(),
                t.getUsuario().getNombre(),
                t.getCategoria().getId(),
                t.getCategoria().getNombre(),
                t.getTipo().name(),
                t.getMonto(),
                t.getFecha(),
                t.getDescripcion()
        );
    }
}

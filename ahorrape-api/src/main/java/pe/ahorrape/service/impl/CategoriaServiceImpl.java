package pe.ahorrape.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.ahorrape.model.Categoria;
import pe.ahorrape.dto.request.ActualizarCategoriaRequest;
import pe.ahorrape.dto.request.CrearCategoriaRequest;
import pe.ahorrape.dto.response.CategoriaResponse;
import pe.ahorrape.exception.RecursoNoEncontradoException;
import pe.ahorrape.repository.CategoriaRepository;
import pe.ahorrape.service.CategoriaService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Override
    public CategoriaResponse crearCategoria(CrearCategoriaRequest request) {

        categoriaRepository.findByNombreIgnoreCase(request.getNombre())
                .ifPresent(c -> {
                    throw new RuntimeException("La categoría ya existe.");
                });

        Categoria categoria = Categoria.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .activa(true)
                .build();

        categoriaRepository.save(categoria);

        return mapearACategoriaResponse(categoria);
    }

    @Override
    public List<CategoriaResponse> listarCategorias() {
        return categoriaRepository.findAll()
                .stream()
                .map(this::mapearACategoriaResponse)
                .toList();
    }

    @Override
    public CategoriaResponse obtenerPorId(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría no encontrada con id: " + id));

        return mapearACategoriaResponse(categoria);
    }

    @Override
    public CategoriaResponse actualizarCategoria(Long id, ActualizarCategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría no encontrada con id: " + id));

        if (request.getNombre() != null && !request.getNombre().isBlank()) {
            categoria.setNombre(request.getNombre());
        }

        if (request.getDescripcion() != null) {
            categoria.setDescripcion(request.getDescripcion());
        }

        categoriaRepository.save(categoria);

        return mapearACategoriaResponse(categoria);
    }

    @Override
    public void desactivarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoría no encontrada con id: " + id));

        categoria.setActiva(false);
        categoriaRepository.save(categoria);
    }

    private CategoriaResponse mapearACategoriaResponse(Categoria categoria) {
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion()
        );
    }
}

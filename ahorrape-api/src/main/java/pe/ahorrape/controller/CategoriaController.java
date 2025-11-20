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

import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.request.ActualizarCategoriaRequest;
import pe.ahorrape.dto.request.CrearCategoriaRequest;
import pe.ahorrape.dto.response.CategoriaResponse;
import pe.ahorrape.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @PostMapping
    public CategoriaResponse crear(@RequestBody CrearCategoriaRequest request) {
        return categoriaService.crearCategoria(request);
    }

    @GetMapping
    public List<CategoriaResponse> listar() {
        return categoriaService.listarCategorias();
    }

    @GetMapping("/{id}")
    public CategoriaResponse obtenerPorId(@PathVariable Long id) {
        return categoriaService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public CategoriaResponse actualizar(@PathVariable Long id, @RequestBody ActualizarCategoriaRequest request) {
        return categoriaService.actualizarCategoria(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        categoriaService.desactivarCategoria(id);
    }
}

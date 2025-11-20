package pe.ahorrape.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.request.ActualizarTransaccionRequest;
import pe.ahorrape.dto.request.CrearTransaccionRequest;
import pe.ahorrape.dto.response.TransaccionResponse;
import pe.ahorrape.service.TransaccionService;

@RestController
@RequestMapping("/api/transacciones")
@RequiredArgsConstructor
public class TransaccionController {

    private final TransaccionService transaccionService;

    @PostMapping
    public TransaccionResponse crear(@Valid @RequestBody CrearTransaccionRequest request) {
        return transaccionService.crearTransaccion(request);
    }

    @GetMapping("/{id}")
    public TransaccionResponse obtenerPorId(@PathVariable Long id) {
        return transaccionService.obtenerPorId(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<TransaccionResponse> listarPorUsuario(@PathVariable Long usuarioId) {
        return transaccionService.listarPorUsuario(usuarioId);
    }

    // /api/transacciones/usuario/1/rango?inicio=2025-11-01&fin=2025-11-30
    @GetMapping("/usuario/{usuarioId}/rango")
    public List<TransaccionResponse> listarPorUsuarioYRango(
            @PathVariable Long usuarioId,
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) {
        return transaccionService.listarPorUsuarioYRangoFechas(usuarioId, fechaInicio, fechaFin);
    }

    @PutMapping("/{id}")
    public TransaccionResponse actualizar(@PathVariable Long id,
                                          @Valid @RequestBody ActualizarTransaccionRequest request) {
        return transaccionService.actualizarTransaccion(id, request);
    }

    @DeleteMapping("/{id}")
    public void desactivar(@PathVariable Long id) {
        transaccionService.desactivarTransaccion(id);
    }
}

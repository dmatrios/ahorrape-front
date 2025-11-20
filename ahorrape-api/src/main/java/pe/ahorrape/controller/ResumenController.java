package pe.ahorrape.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import pe.ahorrape.dto.response.ResumenMensualResponse;
import pe.ahorrape.service.ResumenService;

@RestController
@RequestMapping("/api/resumen")
@RequiredArgsConstructor
public class ResumenController {

    private final ResumenService resumenService;

    @GetMapping("/usuario/{usuarioId}")
    public ResumenMensualResponse obtenerResumen(
            @PathVariable Long usuarioId,
            @RequestParam int mes,
            @RequestParam int anio
    ) {
        return resumenService.obtenerResumenMensual(usuarioId, mes, anio);
    }
}

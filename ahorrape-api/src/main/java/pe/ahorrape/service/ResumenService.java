package pe.ahorrape.service;

import pe.ahorrape.dto.response.ResumenMensualResponse;

public interface ResumenService {

    ResumenMensualResponse obtenerResumenMensual(Long usuarioId, int mes, int anio);
}

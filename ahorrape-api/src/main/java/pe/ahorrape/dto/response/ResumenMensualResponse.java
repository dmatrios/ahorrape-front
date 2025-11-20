package pe.ahorrape.dto.response;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResumenMensualResponse {

    private BigDecimal totalIngresos;
    private BigDecimal totalGastos;
    private BigDecimal saldo;
    private List<TransaccionResponse> transaccionesDelMes;
}

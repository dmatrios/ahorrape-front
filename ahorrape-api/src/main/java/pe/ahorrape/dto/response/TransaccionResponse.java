package pe.ahorrape.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransaccionResponse {

    private Long id;
    private Long usuarioId;
    private String usuarioNombre;
    private Long categoriaId;
    private String categoriaNombre;
    private String tipo; // "INGRESO" o "GASTO"
    private BigDecimal monto;
    private LocalDate fecha;
    private String descripcion;
}

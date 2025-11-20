package pe.ahorrape.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ActualizarTransaccionRequest {

    private Long categoriaId;

    private String tipo; // opcional: "INGRESO" o "GASTO"

    @Positive(message = "El monto debe ser mayor a 0")
    private BigDecimal monto;

    private LocalDate fecha;

    private String descripcion;
}

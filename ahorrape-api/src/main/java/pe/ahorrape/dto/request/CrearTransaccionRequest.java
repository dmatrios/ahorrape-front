package pe.ahorrape.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CrearTransaccionRequest {

    @NotNull(message = "El id de usuario es obligatorio")
    private Long usuarioId;

    @NotNull(message = "El id de categoría es obligatorio")
    private Long categoriaId;

    @NotNull(message = "El tipo de transacción es obligatorio")
    private String tipo; // "INGRESO" o "GASTO"

    @NotNull(message = "El monto es obligatorio")
    @Positive(message = "El monto debe ser mayor a 0")
    private BigDecimal monto;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    private String descripcion;
}

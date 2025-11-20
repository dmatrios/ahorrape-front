package pe.ahorrape.dto.request;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ActualizarUsuarioRequest {

    private String nombre;

    @Email(message = "El email no tiene un formato válido")
    private String email;
}

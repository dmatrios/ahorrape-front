package pe.ahorrape.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // muchas transacciones pueden pertenecer a un usuario
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // muchas transacciones pueden pertenecer a una categoría
    @ManyToOne(optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransaccion tipo; // INGRESO o GASTO

    @Column(nullable = false)
    private BigDecimal monto;

    @Column(nullable = false)
    private LocalDate fecha;

    private String descripcion;

    @Column(nullable = false)
    private Boolean activa = true;

    @Column(nullable = false)
    private LocalDateTime creadoEn;

    @Column(nullable = false)
    private LocalDateTime actualizadoEn;
}

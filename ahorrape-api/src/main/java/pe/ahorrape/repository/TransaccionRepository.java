package pe.ahorrape.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.ahorrape.model.Transaccion;

public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {

    List<Transaccion> findByUsuarioIdAndActivaTrue(Long usuarioId);

    List<Transaccion> findByUsuarioIdAndFechaBetweenAndActivaTrue(
            Long usuarioId,
            LocalDate fechaInicio,
            LocalDate fechaFin
    );
}

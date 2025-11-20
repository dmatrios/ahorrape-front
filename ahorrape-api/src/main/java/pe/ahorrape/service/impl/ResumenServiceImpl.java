package pe.ahorrape.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.ahorrape.model.Transaccion;
import pe.ahorrape.model.TipoTransaccion;
import pe.ahorrape.dto.response.ResumenMensualResponse;
import pe.ahorrape.dto.response.TransaccionResponse;
import pe.ahorrape.exception.RecursoNoEncontradoException;
import pe.ahorrape.repository.TransaccionRepository;
import pe.ahorrape.repository.UsuarioRepository;
import pe.ahorrape.service.ResumenService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumenServiceImpl implements ResumenService {

    private final TransaccionRepository transaccionRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ResumenMensualResponse obtenerResumenMensual(Long usuarioId, int mes, int anio) {

        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id: " + usuarioId));

        LocalDate inicio = LocalDate.of(anio, mes, 1);
        LocalDate fin = inicio.withDayOfMonth(inicio.lengthOfMonth());

        List<TransaccionResponse> transacciones = transaccionRepository
                .findByUsuarioIdAndFechaBetweenAndActivaTrue(usuarioId, inicio, fin)
                .stream()
                .map(t -> new TransaccionResponse(
                        t.getId(),
                        t.getUsuario().getId(),
                        t.getUsuario().getNombre(),
                        t.getCategoria().getId(),
                        t.getCategoria().getNombre(),
                        t.getTipo().name(),
                        t.getMonto(),
                        t.getFecha(),
                        t.getDescripcion()
                ))
                .toList();

        BigDecimal ingresos = transacciones.stream()
                .filter(t -> t.getTipo().equals("INGRESO"))
                .map(TransaccionResponse::getMonto)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal gastos = transacciones.stream()
                .filter(t -> t.getTipo().equals("GASTO"))
                .map(TransaccionResponse::getMonto)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldo = ingresos.subtract(gastos);

        return new ResumenMensualResponse(
                ingresos,
                gastos,
                saldo,
                transacciones
        );
    }
}

package pe.ahorrape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.ahorrape.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findByNombreIgnoreCase(String nombre);

}
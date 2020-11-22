package io.yencute.repository;

import io.yencute.domain.Category;
import io.yencute.domain.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Product entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select distinct product from Product product left join fetch product.categories",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct product from Product product left join fetch product.categories")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.categories where product.id =:id")
    Optional<Product> findOneWithEagerRelationships(@Param("id") Long id);

    // Tìm kiếm sản phẩm cùng loại
    List<Product> findAllByCategories_Id(@Param("id") Long id);

    // Tìm sản phẩm tên có chứa chuỗi kí tự
    List<Product> findAllByNameContainingIgnoreCase(@Param("name") String name);


}

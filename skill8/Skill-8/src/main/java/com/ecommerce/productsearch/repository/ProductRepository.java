package com.ecommerce.productsearch.repository;

import com.ecommerce.productsearch.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByPriceBetween(double min, double max);

    @Query("SELECT p FROM Product p ORDER BY p.price ASC")
    List<Product> findAllSortedByPrice();

    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findProductsAbovePrice(@Param("price") double price);

    @Query("SELECT p FROM Product p WHERE LOWER(p.category) = LOWER(:category)")
    List<Product> findProductsByCategoryJpql(@Param("category") String category);
}

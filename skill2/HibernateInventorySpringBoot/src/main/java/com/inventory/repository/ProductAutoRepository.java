package com.inventory.repository;

import com.inventory.entity.ProductAuto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAutoRepository extends JpaRepository<ProductAuto, Long> {
}

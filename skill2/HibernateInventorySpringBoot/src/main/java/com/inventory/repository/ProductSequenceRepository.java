package com.inventory.repository;

import com.inventory.entity.ProductSequence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSequenceRepository extends JpaRepository<ProductSequence, Long> {
}

package com.inventory.repository;

import com.inventory.entity.ProductIdentity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductIdentityRepository extends JpaRepository<ProductIdentity, Long> {
}

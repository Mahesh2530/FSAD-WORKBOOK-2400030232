package com.ecommerce.productsearch.config;

import com.ecommerce.productsearch.entity.Product;
import com.ecommerce.productsearch.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductDataLoader {

    @Bean
    CommandLineRunner loadProductData(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                List<Product> sampleProducts = List.of(
                        new Product("iPhone 15", "Electronics", 79999.0),
                        new Product("Bluetooth Headphones", "Electronics", 2999.0),
                        new Product("Office Chair", "Furniture", 6999.0),
                        new Product("Coffee Table", "Furniture", 4599.0),
                        new Product("Running Shoes", "Fashion", 3999.0),
                        new Product("Backpack", "Fashion", 1999.0),
                        new Product("Smart Watch", "Electronics", 11999.0)
                );
                productRepository.saveAll(sampleProducts);
            }
        };
    }
}

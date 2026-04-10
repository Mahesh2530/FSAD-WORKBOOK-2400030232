package com.ecommerce.productsearch.service;

import com.ecommerce.productsearch.entity.Product;
import com.ecommerce.productsearch.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getByPriceRange(double min, double max) {
        return productRepository.findByPriceBetween(min, max);
    }

    public List<Product> getSortedByPrice() {
        return productRepository.findAllSortedByPrice();
    }

    public List<Product> getExpensiveProducts(double price) {
        return productRepository.findProductsAbovePrice(price);
    }

    public List<Product> getByCategoryJpql(String category) {
        return productRepository.findProductsByCategoryJpql(category);
    }
}

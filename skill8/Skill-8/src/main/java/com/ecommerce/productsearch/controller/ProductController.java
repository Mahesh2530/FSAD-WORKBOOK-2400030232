package com.ecommerce.productsearch.controller;

import com.ecommerce.productsearch.entity.Product;
import com.ecommerce.productsearch.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterByPriceRange(@RequestParam double min, @RequestParam double max) {
        if (min > max) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "min should be less than or equal to max"));
        }
        List<Product> products = productService.getByPriceRange(min, max);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<Product>> getSortedProducts() {
        return ResponseEntity.ok(productService.getSortedByPrice());
    }

    @GetMapping("/expensive/{price}")
    public ResponseEntity<List<Product>> getExpensiveProducts(@PathVariable double price) {
        return ResponseEntity.ok(productService.getExpensiveProducts(price));
    }

    @GetMapping("/category-jpql/{category}")
    public ResponseEntity<List<Product>> getProductsByCategoryJpql(@PathVariable String category) {
        return ResponseEntity.ok(productService.getByCategoryJpql(category));
    }
}

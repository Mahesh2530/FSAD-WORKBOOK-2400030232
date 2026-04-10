package com.skill3.demo;

import com.skill3.entity.Product;
import com.skill3.loader.ProductDataLoader;
import com.skill3.util.HibernateUtil;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

public class HQLDemo {

    public static void main(String[] args) {
        SessionFactory factory = HibernateUtil.getSessionFactory();
        Session session = factory.openSession();

        try {
            if (isProductTableEmpty(session)) {
                ProductDataLoader.loadSampleProducts(session);
            }

            sortProductsByPriceAscending(session);
            sortProductsByPriceDescending(session);
            sortProductsByQuantityDescending(session);

            getFirstThreeProducts(session);
            getNextThreeProducts(session);
            getPaginatedProducts(session, 2, 3);

            countTotalProducts(session);
            countProductsInStock(session);
            countProductsByDescription(session);
            findMinMaxPrice(session);

            groupProductsByDescription(session);
            groupProductsWithAggregation(session);

            filterProductsByPriceRange(session, 20.0, 100.0);

            findProductsStartingWith(session, "D");
            findProductsEndingWith(session, "p");
            findProductsContaining(session, "Desk");
            findProductsByNameLength(session, 5);
            findProductsByExactLengthPattern(session, 7);
        } finally {
            session.close();
            factory.close();
        }
    }

    private static boolean isProductTableEmpty(Session session) {
        Query<Long> query = session.createQuery("SELECT COUNT(p) FROM Product p", Long.class);
        return query.uniqueResult() == 0L;
    }

    public static void sortProductsByPriceAscending(Session session) {
        String hql = "FROM Product p ORDER BY p.price ASC";
        Query<Product> query = session.createQuery(hql, Product.class);
        List<Product> products = query.list();

        System.out.println("\n=== Products Sorted by Price (Ascending) ===");
        for (Product product : products) {
            System.out.println(product.getName() + " - $" + product.getPrice());
        }
    }

    public static void sortProductsByPriceDescending(Session session) {
        String hql = "FROM Product p ORDER BY p.price DESC";
        Query<Product> query = session.createQuery(hql, Product.class);
        List<Product> products = query.list();

        System.out.println("\n=== Products Sorted by Price (Descending) ===");
        for (Product product : products) {
            System.out.println(product.getName() + " - $" + product.getPrice());
        }
    }

    public static void sortProductsByQuantityDescending(Session session) {
        String hql = "FROM Product p ORDER BY p.quantity DESC";
        Query<Product> query = session.createQuery(hql, Product.class);
        List<Product> products = query.list();

        System.out.println("\n=== Products Sorted by Quantity (Highest First) ===");
        for (Product product : products) {
            System.out.println(product.getName() + " - Quantity: " + product.getQuantity());
        }
    }

    public static void getFirstThreeProducts(Session session) {
        String hql = "FROM Product p ORDER BY p.id";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setFirstResult(0);
        query.setMaxResults(3);
        List<Product> products = query.list();

        System.out.println("\n=== First 3 Products ===");
        for (Product product : products) {
            System.out.println(product);
        }
    }

    public static void getNextThreeProducts(Session session) {
        String hql = "FROM Product p ORDER BY p.id";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setFirstResult(3);
        query.setMaxResults(3);
        List<Product> products = query.list();

        System.out.println("\n=== Next 3 Products ===");
        for (Product product : products) {
            System.out.println(product);
        }
    }

    public static void getPaginatedProducts(Session session, int pageNumber, int pageSize) {
        String hql = "FROM Product p ORDER BY p.id";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        List<Product> products = query.list();

        System.out.println("\n=== Page " + pageNumber + " (Size: " + pageSize + ") ===");
        for (Product product : products) {
            System.out.println(product);
        }
    }

    public static void countTotalProducts(Session session) {
        String hql = "SELECT COUNT(p) FROM Product p";
        Query<Long> query = session.createQuery(hql, Long.class);
        Long count = query.uniqueResult();

        System.out.println("\n=== Total Number of Products ===");
        System.out.println("Total Products: " + count);
    }

    public static void countProductsInStock(Session session) {
        String hql = "SELECT COUNT(p) FROM Product p WHERE p.quantity > 0";
        Query<Long> query = session.createQuery(hql, Long.class);
        Long count = query.uniqueResult();

        System.out.println("\n=== Products in Stock (Quantity > 0) ===");
        System.out.println("Products in Stock: " + count);
    }

    public static void countProductsByDescription(Session session) {
        String hql = "SELECT p.description, COUNT(p) FROM Product p GROUP BY p.description";
        Query<Object[]> query = session.createQuery(hql, Object[].class);
        List<Object[]> results = query.list();

        System.out.println("\n=== Products Grouped by Description ===");
        for (Object[] result : results) {
            String description = (String) result[0];
            Long count = (Long) result[1];
            System.out.println(description + ": " + count + " products");
        }
    }

    public static void findMinMaxPrice(Session session) {
        String hql = "SELECT MIN(p.price), MAX(p.price) FROM Product p";
        Query<Object[]> query = session.createQuery(hql, Object[].class);
        Object[] result = query.uniqueResult();

        Double minPrice = (Double) result[0];
        Double maxPrice = (Double) result[1];

        System.out.println("\n=== Price Range ===");
        System.out.println("Minimum Price: $" + minPrice);
        System.out.println("Maximum Price: $" + maxPrice);
    }

    public static void groupProductsByDescription(Session session) {
        String hql = "SELECT p.description, p.name, p.price FROM Product p ORDER BY p.description, p.name";
        Query<Object[]> query = session.createQuery(hql, Object[].class);
        List<Object[]> results = query.list();

        System.out.println("\n=== Products Grouped by Description ===");
        String currentDescription = "";
        for (Object[] result : results) {
            String description = (String) result[0];
            String name = (String) result[1];
            Double price = (Double) result[2];

            if (!description.equals(currentDescription)) {
                System.out.println("\n" + description + ":");
                currentDescription = description;
            }
            System.out.println("  - " + name + " ($" + price + ")");
        }
    }

    public static void groupProductsWithAggregation(Session session) {
        String hql = "SELECT p.description, COUNT(p), AVG(p.price), SUM(p.quantity) FROM Product p GROUP BY p.description";
        Query<Object[]> query = session.createQuery(hql, Object[].class);
        List<Object[]> results = query.list();

        System.out.println("\n=== Product Statistics by Category ===");
        for (Object[] result : results) {
            String description = (String) result[0];
            Long count = (Long) result[1];
            Double avgPrice = (Double) result[2];
            Long totalQuantity = (Long) result[3];

            System.out.println(description + ":");
            System.out.println("  Count: " + count);
            System.out.println("  Avg Price: $" + String.format("%.2f", avgPrice));
            System.out.println("  Total Quantity: " + totalQuantity);
        }
    }

    public static void filterProductsByPriceRange(Session session, double minPrice, double maxPrice) {
        String hql = "FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("minPrice", minPrice);
        query.setParameter("maxPrice", maxPrice);
        List<Product> products = query.list();

        System.out.println("\n=== Products Between $" + minPrice + " and $" + maxPrice + " ===");
        for (Product product : products) {
            System.out.println(product.getName() + " - $" + product.getPrice());
        }
    }

    public static void findProductsStartingWith(Session session, String prefix) {
        String hql = "FROM Product p WHERE p.name LIKE :pattern";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("pattern", prefix + "%");
        List<Product> products = query.list();

        System.out.println("\n=== Products Starting with '" + prefix + "' ===");
        for (Product product : products) {
            System.out.println(product.getName());
        }
    }

    public static void findProductsEndingWith(Session session, String suffix) {
        String hql = "FROM Product p WHERE p.name LIKE :pattern";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("pattern", "%" + suffix);
        List<Product> products = query.list();

        System.out.println("\n=== Products Ending with '" + suffix + "' ===");
        for (Product product : products) {
            System.out.println(product.getName());
        }
    }

    public static void findProductsContaining(Session session, String substring) {
        String hql = "FROM Product p WHERE p.name LIKE :pattern";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("pattern", "%" + substring + "%");
        List<Product> products = query.list();

        System.out.println("\n=== Products Containing '" + substring + "' ===");
        for (Product product : products) {
            System.out.println(product.getName());
        }
    }

    public static void findProductsByNameLength(Session session, int length) {
        String hql = "FROM Product p WHERE LENGTH(p.name) = :length";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("length", length);
        List<Product> products = query.list();

        System.out.println("\n=== Products with Name Length " + length + " ===");
        for (Product product : products) {
            System.out.println(product.getName() + " (Length: " + product.getName().length() + ")");
        }
    }

    public static void findProductsByExactLengthPattern(Session session, int length) {
        StringBuilder pattern = new StringBuilder();
        for (int i = 0; i < length; i++) {
            pattern.append("_");
        }

        String hql = "FROM Product p WHERE p.name LIKE :pattern";
        Query<Product> query = session.createQuery(hql, Product.class);
        query.setParameter("pattern", pattern.toString());
        List<Product> products = query.list();

        System.out.println("\n=== Products with Exactly " + length + " Characters ===");
        for (Product product : products) {
            System.out.println(product.getName());
        }
    }
}

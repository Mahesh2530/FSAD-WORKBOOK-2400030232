package com.library.library_demo.controller;

import com.library.library_demo.model.Book;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LibraryController {

    List<Book> bookList = new ArrayList<>();
    
    @GetMapping("/")
    public String home() {
        return "Library API is running successfully";
    }

    // 1 Welcome message
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Online Library System";
    }

    // 2 Total books count
    @GetMapping("/count")
    public int count() {
        return 100;
    }

    // 3 Sample price
    @GetMapping("/price")
    public double price() {
        return 499.99;
    }

    // 4 List of books
    @GetMapping("/books")
    public List<String> books() {
        List<String> list = new ArrayList<>();
        list.add("Java Programming");
        list.add("Spring Boot Guide");
        list.add("Data Structures");
        return list;
    }

    // 5 Get book by ID
    @GetMapping("/books/{id}")
    public String getBook(@PathVariable int id) {
        return "Details for Book ID: " + id;
    }

    // 6 Search book by title
    @GetMapping("/search")
    public String searchBook(@RequestParam String title) {
        return "Searching for book: " + title;
    }

    // 7 Author path variable
    @GetMapping("/author/{name}")
    public String author(@PathVariable String name) {
        return "Books written by Author: " + name;
    }

    // 8 Add book
    @PostMapping("/addbook")
    public String addBook(@RequestBody Book book) {
        bookList.add(book);
        return "Book added successfully";
    }

    // 9 View books
    @GetMapping("/viewbooks")
    public List<Book> viewBooks() {
        return bookList;
    }
}
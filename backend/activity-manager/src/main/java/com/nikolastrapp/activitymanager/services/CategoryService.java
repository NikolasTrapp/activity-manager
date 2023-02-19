package com.nikolastrapp.activitymanager.services;

import com.nikolastrapp.activitymanager.models.Category;
import com.nikolastrapp.activitymanager.repositories.CategoryRepository;
import com.nikolastrapp.activitymanager.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) throws EntityNotFoundException {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            throw new ResourceNotFoundException("No category found with id: " + id);
        }
        return optionalCategory.get();
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            throw new ResourceNotFoundException("No category found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            throw new ResourceNotFoundException("No category found with id: " + id);
        }

        Category oldCategory = optionalCategory.get();
        oldCategory.update(category);
        return categoryRepository.save(oldCategory);
    }
}

package com.nikolastrapp.activitymanager.services;

import com.nikolastrapp.activitymanager.models.Activity;
import com.nikolastrapp.activitymanager.repositories.ActivityRepository;
import com.nikolastrapp.activitymanager.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> findAll() {
        return activityRepository.findAll();
    }

    public Activity findById(Long id) throws EntityNotFoundException {
        Optional<Activity> optionalActivity = activityRepository.findById(id);
        if (optionalActivity.isEmpty()) {
            throw new ResourceNotFoundException("No activity found with id: " + id);
        }
        return optionalActivity.get();
    }

    public List<Activity> findByTitle(String title) throws EntityNotFoundException {
        Optional<List<Activity>> optionalActivity = activityRepository.findByTitle(title);
        if (optionalActivity.isEmpty()) {
            throw new ResourceNotFoundException("Any activity found with title: " + title);
        }
        return optionalActivity.get();
    }

    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);
        if (optionalActivity.isEmpty()) {
            throw new ResourceNotFoundException("No activity found with id: " + id);
        }
        activityRepository.deleteById(id);
    }

    public Activity updateActivity(Long id, Activity activity) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);
        if (optionalActivity.isEmpty()) {
            throw new ResourceNotFoundException("No activity found with id: " + id);
        }

        Activity oldActivity = optionalActivity.get();
        oldActivity.update(activity);
        return activityRepository.save(oldActivity);
    }

}

package com.nikolastrapp.activitymanager.controllers;

import com.nikolastrapp.activitymanager.models.Activity;
import com.nikolastrapp.activitymanager.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/activity")
@CrossOrigin(maxAge = 3600, origins = "*")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Activity>> findAll() {
        return ResponseEntity.ok().body(activityService.findAll());
    }

    @GetMapping(value = "/findByTitle/{title}")
    public ResponseEntity<List<Activity>> findByTitle(@PathVariable("title") String title) {
        return ResponseEntity.ok().body(activityService.findByTitle(title));
    }

    @GetMapping(value = "/findById/{id}")
    public ResponseEntity<Activity> findByTitle(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(activityService.findById(id));
    }

    @GetMapping(value = "/findByPeriod/{startDate}/{endDate}")
    public ResponseEntity<Object> findByPeriod(@PathVariable("startDate") LocalDateTime startDate, @PathVariable("endDate") LocalDateTime endDate){
        List<Activity> period = activityService.findByPeriod(startDate, endDate);

        if (period.size() <= 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No activities found in this period");
        } else {
            return ResponseEntity.ok().body(period);
        }
    }

    @GetMapping(value = "/calculateMinutes/{startDate}/{endDate}")
    public ResponseEntity<Object> calculateMinutes(@PathVariable("startDate") LocalDateTime startDate, @PathVariable("endDate") LocalDateTime endDate){
        List<Activity> period = activityService.findByPeriod(startDate, endDate);
        HashMap<String, Integer> categoryMinutes = new HashMap<>();

        if (period.size() <= 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No activities found in this period");
        } else {
            for (Activity activity : period){
                if (categoryMinutes.containsKey(activity.getCategory().getName())){
                    categoryMinutes.put(activity.getCategory().getName(), categoryMinutes.get(activity.getCategory().getName()) + activity.getMinutes());
                } else {
                    categoryMinutes.put(activity.getCategory().getName(), activity.getMinutes());
                }
            }
        }
        return ResponseEntity.ok().body(categoryMinutes);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(activityService.addActivity(activity));
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable("id") Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.status(HttpStatus.OK).body("Activity with id '" + id + "' was deleted successfully");
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable("id") Long id, @RequestBody Activity activity) {
        return ResponseEntity.ok().body(activityService.updateActivity(id, activity));
    }
}

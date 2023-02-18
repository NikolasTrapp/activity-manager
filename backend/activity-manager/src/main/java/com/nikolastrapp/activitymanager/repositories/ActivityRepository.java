package com.nikolastrapp.activitymanager.repositories;

import com.nikolastrapp.activitymanager.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    Optional<List<Activity>> findByTitle(String title);
}

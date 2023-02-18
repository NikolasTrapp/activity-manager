package com.nikolastrapp.activitymanager;

import com.nikolastrapp.activitymanager.enums.Category;
import com.nikolastrapp.activitymanager.models.Activity;
import com.nikolastrapp.activitymanager.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;

@SpringBootApplication
public class ActivityManagerApplication  {


	public static void main(String[] args) {
		SpringApplication.run(ActivityManagerApplication.class, args);
	}

}

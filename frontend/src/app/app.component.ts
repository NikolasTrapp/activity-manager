import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activity } from './models/activity';
import { ActivityService } from './services/activity.service';
import { NgForm } from '@angular/forms';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  activities: Activity[] = [];
  activity: Activity | null;
  display: boolean = false;
  categories: Category[];

  currentDate: Date;
  container: HTMLElement | null;


  constructor(private activityService: ActivityService, private categoryService: CategoryService) {
    this.currentDate = new Date();
    
  }

  
  ngOnInit(): void {
    this.container = document.querySelector("#calendar-container");
    this.activityService.getActivities().subscribe((response) => {
      this.activities = response;
    });
    this.categoryService.getCategories().subscribe((response) =>{
      this.categories = response;
    });
    this.init();

  }

  sendActivity(addForm: NgForm): void {
    console.log(addForm.value);
    
  }
  
  showDialog() {
    this.display = true;
  }

  private render() {
    const table = document.createElement("table");
    table.classList.add("week-calendar");
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 24; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 7; j++) {
        const cell = row.insertCell();
        const date = new Date(this.currentDate);
        const currentDayOfWeek = date.getDay();
        const diff = j - currentDayOfWeek;
        date.setDate(date.getDate() + diff);
        date.setHours(i);
        const div = document.createElement("div");
        div.classList.add("cell");
        const formattedDate = `${dayOfWeek[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        div.innerText = formattedDate;
        cell.appendChild(div);
      }
    }
    
    this.container!.appendChild(table);
  }

  private previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.render();
  }

  private nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.render();
  }

  private init() {
    const prevButton = document.getElementById("prev-week-button");
    prevButton?.addEventListener("click", () => this.previousWeek());
    const nextButton = document.getElementById("next-week-button");
    nextButton?.addEventListener("click", () => this.nextWeek());
    this.render();
  }
}

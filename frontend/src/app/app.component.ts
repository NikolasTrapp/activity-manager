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
      this.init();
    });
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });

  }

  sendActivity(addForm: NgForm): void {
    console.log(addForm.value);

  }

  showDialog() {
    this.display = true;
  }

  private render() {
    this.container!.innerHTML = "";
    this.createHeader();
    for (let hour = 0; hour < 48; hour++) {
      const formatedHour = `${(hour % 2 == 1) ? ("0" + (Math.floor(hour/2))).slice(-2) + ":30" : ("0" + (hour/2)).slice(-2) + ":00".slice(-3)}`;
      const row = document.createElement("div");
      row.className = "row";
      for (let day = 0; day < 8; day++) {
        const cell = document.createElement("div");
        cell.className = "col border text-center";
        if (day == 0) {
          cell.innerText = formatedHour;
        } else { 
          const date = this.getDate(day);
          cell.setAttribute("day", `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${formatedHour}:00`);
        }
        row.appendChild(cell);
      }
      this.container?.appendChild(row);
    }
    this.loadActivities();
  }

  private getDate(day: number): Date{
    const date = new Date(this.currentDate);
    const currendDayOfWeek = date.getDay();
    const difference = day - 1 - currendDayOfWeek;
    date.setDate(date.getDate() + difference);
    return date;
  }

  private createHeader(): void {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const row = document.createElement("div");
    row.className = "row";
    for (let day = 0; day < 8; day ++){
      const cell = document.createElement("div");
      cell.className = "col border text-center";
      if (day == 0){
        cell.innerText = "Hours";
      } else {
        const date = this.getDate(day);
        cell.innerText = `${dayOfWeek[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      row.appendChild(cell);
    }
    this.container?.appendChild(row);
    
  }

  private loadActivities() {
    for (let activity of this.activities) {
      const cell = document.querySelector(`[day="${activity.startDate}"]`);
      if (cell != undefined){
        cell.append(activity.title)
        cell.setAttribute("style", "background-color: " + activity.category.color)
        const dateControl = new Date(activity.startDate);
        for (let i = 0; i < this.getNumberOfDivisions(activity.startDate, activity.endDate); i++){
          dateControl.setTime(dateControl.getTime() + 30 * 60000);
          const cell = document.querySelector(`[day="${this.convertDateToString(dateControl)}"]`);
          cell?.setAttribute("style", "background-color: " + activity.category.color)
        }
        
        
      }    
    }
  }

  private convertDateToString(date: Date) : string{
    const day = date.toLocaleDateString().split("/");
    return `${day[2]}-${day[1]}-${day[0]}T${date.toLocaleTimeString()}`;
  }

  private getNumberOfDivisions(date1: Date, date2: Date): number{
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return (dt2.getTime() - dt1.getTime()) / 60000 / 30; 
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

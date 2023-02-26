import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Activity } from './models/activity';
import { ActivityService } from './services/activity.service';
import { NgForm } from '@angular/forms';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';
import { MessageService, SortEvent} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  DEFAULT_DATE: string = new Date().toISOString().substring(0, 11) + "00:00";
  activities: Activity[] = [];
  displayActivityDialog: boolean = false;
  displayCategoryDialog: boolean = false;
  displayMinutesDialog: boolean = false;
  displayUpdateActivityDialog: boolean = false;
  categories: Category[] = [];
  categoriesMinutes = [];
  startDate = this.DEFAULT_DATE
  endDate = this.DEFAULT_DATE;
  updatedActivity: Activity | null = null;
  
  selectedEntity: Category;
  
  constructor(private activityService: ActivityService, private categoryService: CategoryService,
    private messageService: MessageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshTable();
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.selectedEntity = this.categories[0];
    });    
  }

  refreshTable(){
    this.activityService.getActivities().subscribe((response) => {
      this.activities = response;
    });
    this.cd.detectChanges();
  }

  sendActivity(addForm: NgForm): void {
    addForm.value.category = this.selectedEntity
    this.clear();
    this.activityService.addActivity(addForm.value).subscribe((response) => {
      this.addSingle("success", "Activity registered!", response.title);
      this.activities.push(response);
      this.cd.detectChanges();
      addForm.controls["title"].reset();
      addForm.controls["description"].reset();
      this.displayActivityDialog = false;
    }, (error: HttpErrorResponse) => {      
      this.addSingle("error", error.error, "");
    });
  }

  sendCategory(form: NgForm): void {
    this.clear();
    this.categoryService.addCategory(form.value).subscribe((response) => {
      this.addSingle("success", "Category registered!", response.name);
      this.categories.push(response);
      this.cd.detectChanges();
      this.displayCategoryDialog = false;
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    });
  }

  queryByPeriod(form: NgForm): void {
    this.clear();
    this.activityService.getActivitiesByPeriod(form.value.startDate, form.value.endDate).subscribe((response) => {
      this.activities = response;
      this.cd.detectChanges();
      this.addSingle("success", "Query returned successfully", "");
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    })
  }

  calculateMinutes(form: NgForm): void{    
    this.clear();    
    this.activityService.getCategoriesMinutes(form.value.startDate, form.value.endDate).subscribe((response) => {     
      const list = document.getElementById("categoriesMinutes");
      if (list != undefined) {
        list.innerHTML = "";
      } else {
        this.addSingle("error", "Internal error", "");
        return;
      }      
      for (let key of Object.keys(response)){
        list.innerHTML += `${key}: ${response[key]} min<br>`;
      }
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    });
  }

  deleteActivity(activity: Activity): void{
    this.clear();    
    this.activityService.deleteActivity(activity.id).subscribe((response) => {
      this.addSingle("success", response, `activity ${activity.title} deleted!`);
      this.activities = this.activities.filter(a => a.id != activity.id);
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    });
  }

  updateActivity(form: NgForm): void{
    this.clear();
    this.activityService.updateActivity(form.value, this.updatedActivity!.id).subscribe((response) => {
      this.addSingle("success", "Activity updated!", "");
      this.activities = this.activities.map(a => (a.id == response.id) ? response : a);
      this.displayUpdateActivityDialog = false;
      this.cd.detectChanges();
      form.controls["title"].reset();
      form.controls["description"].reset();
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, error.message);
    })

  }

  setUpdateValues(activity: Activity): void{
    this.updatedActivity = activity;
    this.displayUpdateActivityDialog = true;
  }

  showActivityDialog() {
    this.clear();
    this.displayActivityDialog = true;
  }

  showCategoryDialog() {
    this.clear();
    this.displayCategoryDialog = true;
  }

  showMinutesDialog(){
    this.clear();
    this.displayMinutesDialog = true;
  }

  onEntityClick(event: any) {
    this.selectedEntity = event.value;
  }

  addSingle(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
  }

  clear() {
    this.messageService.clear();
  }

  customSort(event: SortEvent){
    event.data?.sort((d1, d2) => {
      let sd1: Date = new Date(d1.startDate);
      let sd2: Date = new Date(d2.startDate);
      let result;
      if (sd1.getTime() < sd2.getTime()){
        result = 1;
      } else if (sd1.getTime() > sd2.getTime()){
        result = -1;
      } else {
        result = 0;
      }
      return (event.order! * result);
    });
    
  }
}

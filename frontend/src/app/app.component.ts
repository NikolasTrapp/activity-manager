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

  activities: Activity[] = [];
  displayActivityDialog: boolean = false;
  displayCategoryDialog: boolean = false;
  displayMinutesDialog: boolean = false;
  categories: Category[] = [];
  categoriesMinutes = [];
  startDate = new Date().toISOString().substring(0, 11) + "00:00";
  endDate = new Date().toISOString().substring(0, 11) + "00:00";
  
  selectedEntity: Category;
  
  constructor(private activityService: ActivityService, private categoryService: CategoryService,
    private messageService: MessageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((response) => {
      this.activities = response;
    });
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.selectedEntity = this.categories[0];
    });
    console.log(new Date().toISOString().substring(0, 11));
    
  }

  sendActivity(addForm: NgForm): void {
    addForm.value.category = this.selectedEntity
    this.clear();
    if (!addForm.valid){
      this.addSingle("warn", "you left an empty field", "");
      return;
    }
    this.activityService.addActivity(addForm.value).subscribe((response) => {
      this.addSingle("success", "Activity registered!", response.title);
      this.activities.push(response);
      this.cd.detectChanges();
    }, (error: HttpErrorResponse) => {      
      this.addSingle("error", error.error, "");
    });
  }

  sendCategory(form: NgForm): void {
    this.clear();
    if (!form.valid){
      this.addSingle("warn", "you left an empty field", "");
      return;
    }
    this.categoryService.addCategory(form.value).subscribe((response) => {
      this.addSingle("success", "Category registered!", response.name);
      this.categories.push(response);
      this.cd.detectChanges();
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    });
  }

  queryByPeriod(form: NgForm): void {
    this.clear();
    if (!form.valid){
      this.addSingle("warn", "you left an empty field", "");
      return;
    }
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
    if (!form.valid){
      this.addSingle("warn", "you left an empty field", "");
      return;
    }
    this.activityService.getCategoriesMinutes(form.value.startDate, form.value.endDate).subscribe((response) => {     
      const list = document.getElementById("categoriesMinutes");
      if (list != undefined) {
        list.innerHTML = "";
      } else {
        this.addSingle("error", "Internal error", "");
        return;
      }
      console.log(typeof response);
      console.log(response);
      
      
      for (let key of Object.keys(response)){
        list.innerHTML += `${key}: ${response[key]} min<br>`;
      }
    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.error, "");
    });
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
    })
    
  }


}

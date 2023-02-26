import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activity } from './models/activity';
import { ActivityService } from './services/activity.service';
import { NgForm } from '@angular/forms';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';
import { DatePipe } from '@angular/common';
import { Message, MessageService, SortEvent} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe, MessageService]
})
export class AppComponent implements OnInit {

  activities: Activity[] = [];
  activity: Activity | null;
  displayActivityDialog: boolean = false;
  displayCategoryDialog: boolean = false;
  categories: Category[];
  
  selectedEntity: Category;
  
  constructor(private activityService: ActivityService, private categoryService: CategoryService,
    private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((response) => {
      this.activities = response;
    });
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.selectedEntity = this.categories[0];
    });
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

    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.message, "");

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

    }, (error: HttpErrorResponse) => {
      this.addSingle("error", error.message, "");

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

  onEntityClick(event: any) {
    this.selectedEntity = event.value;
  }

  addSingle(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
  }

  clear() {
    this.messageService.clear();
  }

  convertDate(date: Date){
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm');
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

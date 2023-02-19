import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiServerUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  

  public getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiServerUrl}/activity/all`);
  }

  public getActivitiesById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiServerUrl}/activity/findById/${id}`);
  }

  public getActivitiesByTitle(title: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiServerUrl}/activity/findByTitle/${title}`);
  }

  public addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiServerUrl}/activity/add`, activity);
  }

  public updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiServerUrl}/activity/update`, activity);
  }

  public deleteActivity(activityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/activity/delete/${activityId}`);
  }
}

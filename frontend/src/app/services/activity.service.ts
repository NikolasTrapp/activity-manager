import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public getActivitiesByPeriod(startDate: Date, endDate: Date): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiServerUrl}/activity/findByPeriod/${startDate}/${endDate}`);
  }

  public getCategoriesMinutes(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/activity/calculateMinutes/${startDate}/${endDate}`);
  }

  public addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiServerUrl}/activity/add`, activity);
  }

  public updateActivity(activity: Activity, id: number | string): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiServerUrl}/activity/update/${id}`, activity);
  }

  public deleteActivity(activityId: number): Observable<string> {
    return this.http.delete(`${this.apiServerUrl}/activity/delete/${activityId}`, { responseType: 'text' }).pipe(
      map((response: any) => {
        return response.text;
      })
    );
  }
}

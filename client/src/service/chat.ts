import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Chatservice {

  constructor(private http: HttpClient) {}

  sendprompt(prompt: string) {
    return this.http.post<any>(' http://localhost:3000/generate', { prompt });
  }
}

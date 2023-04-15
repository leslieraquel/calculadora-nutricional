import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


}

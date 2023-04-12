import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class JsonService {
    identificador_header: String = "";

    constructor(private http: HttpClient) {

    }

    getJson(cadena: string) {
        return this.http.get(cadena);
    }
    postJson(cadena: string, archivo: any){
        return this.http.post(cadena,JSON.stringify(archivo));
    }

}
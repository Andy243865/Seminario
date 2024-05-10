import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  servidor = 'http://localhost:5000';

  constructor(private http : HttpClient) { }

  get(ruta:any){
    return this.http.get(this.servidor+ruta);
  }
  
  post(ruta:string, body:any){
    return this.http.post(this.servidor+ruta,body).toPromise();
  }
  
  delete(ruta:string, body:any){
    return this.http.delete(this.servidor+ruta,body).toPromise();
  }
  
  patch(ruta:string, body:any){
    return this.http.patch(this.servidor+ruta,body).toPromise();
  }

  /*put(ruta:string, body:any){
    return this.http.delete
  }*/
}

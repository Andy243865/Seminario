import { Component } from '@angular/core';
import { DbserviceService } from '../dbservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {
  acc = 0;
  mesasR:any;
  mesasL:any;

  constructor(private dbService : DbserviceService) {
    this.getMesas();
  }

  getMesas(){
    this.dbService.get('/getMesas').subscribe((response:any) => {
      this.divMesas(response['data']) ;
    }), (error:any) =>{
      console.log('Error is ',error);
    } 
  }

  divMesas(res:any){
    this.acc = res[0].ID;
    this.mesasL = res.slice(0,res.length/2);
    this.mesasR = res.slice(res.length/2, res.length);
    console.log(res.length);
    console.log(this.mesasR);
    console.log(this.mesasL);
  }

  cambiarEstado(m:any){
    m.Estado = m.Estado == 0 ? 1 : 0;
    this.dbService.patch('/patchEstadoMesa',{ Estado: m.Estado, ID: m.ID }).then((data:any)=>{
      console.log(data);
      this.getMesas();
    }).catch((err)=>{
       console.log(err);
    });
  }
}

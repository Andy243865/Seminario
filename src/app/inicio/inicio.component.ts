import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private activatedRoute: ActivatedRoute){  }

  ngOnInit(){
    this.activatedRoute.fragment.subscribe((value)=>{
      this.jumpTo(value);
    })
  }

  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
  }
}

import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { JsonService } from 'src/app/service/json.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-nutricional';

  constructor(private  https:JsonService, private SpinnerService:NgxSpinnerService){

  }

  public matrizDieta=[{
    codalergia:0,
    nombrealergia: '',
    activo:false
  }];

  colmddietas:string = ''; 


  public matrizProducto=[{
    codigocategoria: "", nombrecategoria: "", 
    detalleproducto:[{codigoproducto:"",
      nombreproducto:"",
      porcion:"",
      calorias:"",
      carbohidratos:"",
      proteina:"",
      fibradietetica:"",
      grasas:"",
      estado:"",
      activo:false
    }],
  }];

  ngOnInit(): void {
    this.detectedModeMovile();
    this.obtenerDieta();
    this.obtenerProductos();

  }

  obtenerDieta(){

    this.https.getJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=1").subscribe((data:any)=>{
      this.matrizDieta = data;
    });


  }

  obtenerProductos(){
    this.SpinnerService.show();
    this.https.getJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=3").subscribe((data:any)=>{
      this.matrizProducto = data;
      this.SpinnerService.hide();

    });


  }

  selectDieta(event:any,j:number){
    this.matrizDieta[j].activo = event.target.checked;
    let datos = {
      matrizdieta:this.matrizDieta
    }

    if(this.validadorSeleccion()){
      this.SpinnerService.show();
      this.https.postJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=2",datos).subscribe((data:any)=>{
        this.matrizProducto = data;
        this.SpinnerService.hide();
      }); 
    }else{
      this.obtenerProductos();
    }


  }

  selectProducto(event:any,i:number,j:number,codigoproducto:any){
    this.matrizProducto[i].detalleproducto[j].activo = event.target.checked;
    let tdinfo = document.querySelectorAll(`.tdinfo${codigoproducto}`) as NodeListOf<HTMLParagraphElement>;
    if(event.target.checked){
      tdinfo.forEach(element => {
          element.style.color = 'black';
      });
    }else{
      tdinfo.forEach(element => {
        element.style.color = 'rgb(219, 214, 214)';
      });
    }
  }

  sumarPorcion(){
    let sumaporcion = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumaporcion += parseFloat(this.matrizProducto[i].detalleproducto[j].porcion);
          
        }
      }
    }
    return sumaporcion.toFixed(2);
  }

  sumarCalorias(){
    let sumacalorias = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumacalorias += parseFloat(this.matrizProducto[i].detalleproducto[j].calorias);
          
        }
      }
    }
    return sumacalorias.toFixed(2);
  }

  sumarCarbohidratos(){
    let sumarCarbohidratos = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumarCarbohidratos += parseFloat(this.matrizProducto[i].detalleproducto[j].carbohidratos);
          
        }
      }
    }
    return sumarCarbohidratos.toFixed(2);
  }

  sumarProteinas(){
    let sumarProteinas = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumarProteinas += parseFloat(this.matrizProducto[i].detalleproducto[j].proteina);
          
        }
      }
    }
    return sumarProteinas.toFixed(2);
  }
  sumarFibraDietetica(){
    let sumarFibraDietetica = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumarFibraDietetica += parseFloat(this.matrizProducto[i].detalleproducto[j].fibradietetica);
          
        }
      }
    }
    return sumarFibraDietetica.toFixed(2);
  }

  sumarGrasas(){
    let sumarGrasas = 0;
    for (let i = 0; i < this.matrizProducto.length; i++) {
      for (let j = 0; j < this.matrizProducto[i].detalleproducto.length; j++) {
        if(this.matrizProducto[i].detalleproducto[j].activo){
          sumarGrasas += parseFloat(this.matrizProducto[i].detalleproducto[j].grasas);
          
        }
      }
    }
    return sumarGrasas.toFixed(2);
  }

  validadorSeleccion(){
    let validador = false;
    for (let i = 0; i < this.matrizDieta.length; i++) {
      if(this.matrizDieta[i].activo){
        validador = true;
      }
    }
    return validador;
  }

  detectedModeMovile(){
    let navegador = navigator.userAgent;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        this.colmddietas = '6';
    } else {
      this.colmddietas = '12';

    }
  }



  
}

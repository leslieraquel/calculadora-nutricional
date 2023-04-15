import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { JsonService } from 'src/app/service/json.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora-nutricional';

  constructor(private  https:JsonService){

  }


  public matrizDieta=[{
    codalergia:0,
    nombrealergia: '',
    activo:false
  }];


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
    this.obtenerDieta();
    this.obtenerProductos();

  }

  obtenerDieta(){

    this.https.getJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=1").subscribe((data:any)=>{
      console.log(data);
      this.matrizDieta = data;
    });


  }

  obtenerProductos(){

    this.https.getJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=3").subscribe((data:any)=>{
      console.log(data);
      this.matrizProducto = data;
    });


  }

  selectDieta(event:any,j:number){
    this.matrizDieta[j].activo = event.target.checked;
    console.log(event.target.value);
    console.log(this.matrizDieta);
    let datos ={
      matrizdieta:this.matrizDieta
    }

    if(this.validadorSeleccion()){
      this.https.postJson("/calculadora-nutricional/api/calculadora-nutricional.php?op=2",datos).subscribe((data:any)=>{
        console.log(data);
        this.matrizProducto = data;
      }); 

    }else{
      this.obtenerProductos();
    }


  }

  selectProducto(event:any,i:number,j:number){
    console.log(event.target.checked);
    this.matrizProducto[i].detalleproducto[j].activo = event.target.checked;
    let codicodigoproducto = this.matrizProducto[i].detalleproducto[j].codigoproducto
    console.log(this.matrizProducto);
    if(this.matrizProducto[i].detalleproducto[j].activo){
      let tdinfo = document.querySelector(`tdinfo`) as HTMLParagraphElement;
      console.log(tdinfo);
      if(tdinfo){
       tdinfo.style.color = "black";
      }
    }else{
      // let tdinfo = document.getElementById(`tdinfo`);
      // if(tdinfo){
      //   tdinfo.style.color = "#ffff"
      // }

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



  
}

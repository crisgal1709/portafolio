import { Component, OnInit, ViewChild } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

public widthSlider:number;
public anchuraToSlider:number;
public captions: boolean;
public autor: any;
@ViewChild('textos') textos;

  constructor() { 
  	this.captions = true;

  	
  	
  	
  }

  ngOnInit() {
  	//var opcion_clasica = document.querySelector('#texto').innerHTML;

  	//console.log(this.textos);
  }

  cargarSlider(){
  	this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
  	this.anchuraToSlider = null;
  }

  estadoCaptions(){
  	this.captions = !this.captions;
  }

  getAutor(event){
  	this.autor = event;
  }

}

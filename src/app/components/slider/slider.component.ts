import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $:any;


@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

	@Input() anchura:number;
	@Input() etiquetas :boolean;
	@Output() conseguirAutor = new EventEmitter();

	public autor: any;

  constructor() { 

  	this.autor = {
  		nombre: 'Cristian Galeano',
  		website: 'cristiangaleano.com',
  		youtube: 'MiCanal'
  	}
  }

  ngOnInit() {

  	$('.galeria').bxSlider({
  		mode: 'fade',
  		captions: this.etiquetas,
  		slideWidth: this.anchura
  	});

  	
  }

  lanzar(event){

  	this.conseguirAutor.emit(this.autor);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	public title: string;
	public subTitle: string;
	public web: string;

  constructor() {
  	this.title = 'Cristian Galeano';
  	this.subTitle = 'Desarrollador Web, PHP y Laravel expert';
  	this.web = 'correo@example.com';
   }

  ngOnInit() {
  }

}

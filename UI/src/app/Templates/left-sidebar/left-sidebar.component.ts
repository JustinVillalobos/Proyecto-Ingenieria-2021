import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
	mark:string="";
  constructor() { }

  ngOnInit(): void {
  }
  market(){
  	console.log("Market");
  	if(this.mark==="market"){
  		this.mark="";
  	}else{
  		this.mark="market";
  	}
  }
}

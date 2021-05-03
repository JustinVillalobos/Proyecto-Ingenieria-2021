import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
	mark:string="";
  marketOthers:string="";
  constructor() { }

  ngOnInit(): void {
  }
  market(){
  	if(this.mark==="market"){
  		this.mark="";
  	}else{
  		this.mark="market";
  	}
  }
  marketOthersMethod(){
    if(this.marketOthers==="market"){
      this.marketOthers="";
    }else{
      this.marketOthers="market";
    }
  }
}

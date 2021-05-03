import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar-min',
  templateUrl: './left-sidebar-min.component.html',
  styleUrls: ['./left-sidebar-min.component.css']
})
export class LeftSidebarMinComponent implements OnInit {

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

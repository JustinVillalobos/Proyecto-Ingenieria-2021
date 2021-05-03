import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-min',
  templateUrl: './header-min.component.html',
  styleUrls: ['./header-min.component.css']
})
export class HeaderMinComponent implements OnInit {

  mark:string="";
  marketOthers:string="";
  constructor( ) { }

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

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  animations: [
    trigger('fade', [ 
    	state('singInOff', style({
	     opacity: 0
	    })),
	    state('singInOn', style({
	     opacity: 1
	    })),
	    transition('singInOn => singInOff', animate("0.5s 0.5s")),
	    transition('singInOff => singInOn', animate("0.5s 0.5s")),
	    ]),
    trigger('fade2', [ 
	    state('singUpOff', style({
	     opacity: 0
	    })),
	    state('singUpOn', style({
	     opacity: 1
	    })),
	    transition('singUpOn => singUpOff', animate("0.5s 0.5s")),
	     transition('singUpOff => singUpOn', animate("0.5s 0.5s")),
	    ])
	]
})
export class InicioSesionComponent implements OnInit {

  constructor() { }
  stateJs:boolean=false;
  signUpCss:string="none";
  signInCss:string="block";
  signUpAnimation:string="singInOff";
  signInAnimation:string="singUpOn";
  ngOnInit(): void {
  }

  signIn(){
  	console.log("SignIn");
  	if(this.stateJs===true){
  		this.signUpAnimation="singUpOff";
  		this.signInAnimation="singInOn";
  		this.signUpCss="none";
  		this.signInCss="block";
  		this.stateJs=false;
  	}
  }
  signUp(){
  	console.log("SignOut");
  	if(this.stateJs===false){
  		this.signUpAnimation="singUpOn";
  		this.signInAnimation="singInOff";	
  		this.signInCss="none";
  		this.signUpCss="block";
  		this.stateJs=true;
  	}
  }

}

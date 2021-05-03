module.exports =class Validator{
    constructor() {
       
    }
    public FormatoNumerico(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		const pattern='~[^0-9]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
	 }
 	return validate;
 }
 public  FormatoPalabraSinEspacio(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-ZñÑáéíóúÁÉÍÓÚ]+~i';
 		let validate=this.evaluatePattern(cadena,pattern);

 	}
 	return validate;
 }
 public  FormatoPalabraConEspacio(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-zñÑáéíóúÁÉÍÓÚ ]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }
 public  FormatoTelefono(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^0-9 \- +]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }
 public  FormatoPalabraConSaltoLinea(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-ZñÑáéíóúÁÉÍÓÚ \n]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }
 public  FormatoAlfaNumerico(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ \n]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }
 public  FormatoAlfaNumericonCaracteres(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ:.*,_;=!¡¿?{}[\] \- \n]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }
public  FormatoCorreo(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(cadena)){
		    return true;
		  } else {
		     
		   return false;
		  }
 	}
 	return validate;
 }
 public  FormatoPSW(cadena:string, tamanioMaximo:number){
 	let validate=true;
 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ./+_!=]+~i';
 		validate=this.evaluatePattern(cadena,pattern);
 	}
 	return validate;
 }

 public  evaluateLength(cadena:string, tamanioMaximo:number){
 	cadena=cadena+" ";
 	cadena=cadena.trim();
 	if(cadena.length>tamanioMaximo || cadena.length<=0){
 		return false;
 	}else{
 		return true;
 	}
 }

 public  evaluatePattern(cadena:string, pattern:string){
 	let re = new RegExp(pattern);

 	if(re.test(cadena)==true){
 		return false;
 	}
 	return true;
 }
 public  evaluateSpace(cadena:string, tamanioMaximo:number){
 	let validate=true;

 	if(this.evaluateLength(cadena, tamanioMaximo)==false){
 		return false;
 	}else{
 		let pattern='~[^a-zA-ZñÑáéíóúÁÉÍÓÚ]+~i';
 			let re = new RegExp(pattern);
 		if(re.test(cadena)==true){
 			return false;
 		}else{
 			return true;
 		}
 		return true;

 	}
 }
 public evaluateTextPattern(cadena:string,tamanioMinimo:number,tamanioMaximo:number){

 	if(cadena.length>=tamanioMaximo){
	 	let newCadena=cadena.substring(tamanioMinimo,tamanioMaximo);
	 	return this.evaluateSpace(newCadena,tamanioMaximo);
	 }else{
	 	let newCadena=cadena.substring(tamanioMinimo,cadena.length);
	 	return this.evaluateSpace(newCadena,cadena.length);
	 }
 }

}


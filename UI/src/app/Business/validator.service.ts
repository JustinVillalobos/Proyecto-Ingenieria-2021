import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
   validateInt(codigo,tamanioMax){
    let res=true;
    var value=codigo.target.value;
    var tamanio=value.length;
    let tecla = (document.all) ? codigo.keyCode : codigo.which;
    if (((tecla > 47 && tecla < 58) || tecla === 8 || tecla === 13 || tecla === 6) && tamanio<=tamanioMax-1) {
       res=true;
    } else {
       
      res=false;
        
    }
    return res;
}
 eventPath(evt) {
    var path = (evt.composedPath && evt.composedPath()) || evt.path,
        target = evt.target;

    if (path != null) {
        // Safari doesn't include Window, but it should.
        return (path.indexOf(window) < 0) ? path.concat(window) : path;
    }

    if (target === window) {
        return [window];
    }

    return [target].concat(this.getParents(target,[]), window);
}
getParents(node, memo) {
        memo = memo || [];
        var parentNode = node.parentNode;

        if (!parentNode) {
            return memo;
        }
        else {
            return this.getParents(parentNode, memo.concat(parentNode));
        }
 }

 evaluatePattern(letras,tecla, tamanioMax,tamanio){
  if (letras.indexOf(tecla) === -1){
    
      return false;
  }else{
    if (tamanio>tamanioMax-1){
      
       return false;
    }else{
      return true;
    }
  }
}
 validarPalabrasSinEspacio(evento, tamanioMax) {
    let digitos = (document.all) ? evento.keyCode : evento.which;
    var value=evento.target.value;
    var tamanio=value.length;

    let tecla = String.fromCharCode(digitos).toLowerCase(),
            letras = "áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ";


      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
 validarPalabras(evento, tamanioMax) {
   let digitos = (document.all) ? evento.keyCode : evento.which;
    var value=evento.target.value;
    var tamanio=value.length;
    let tecla = String.fromCharCode(digitos).toLowerCase(),
            letras = " áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ";
      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
 validarAlfaNumerico(evento, tamanioMax){
  let digitos = (document.all) ? evento.keyCode : evento.which;
  var value=evento.target.value;
  var tamanio=value.length;
  let tecla = String.fromCharCode(digitos).toLowerCase(),
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ1234567890";
      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
 validarAlfaNumericoCaracteres(evento, tamanioMax){
  let digitos = (document.all) ? evento.keyCode : evento.which;
  var value=evento.target.value;
  var tamanio=value.length;
  let tecla = String.fromCharCode(digitos).toLowerCase(),
          letras = " áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ1234567890:,;=!¡¿?{}[]";
      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
validarCorreo(evento, tamanioMax){
  let digitos = (document.all) ? evento.keyCode : evento.which;
  var value=evento.target.value;
  var tamanio=value.length;
  let tecla = String.fromCharCode(digitos).toLowerCase(),
          letras = "áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ1234567890@.";
      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
 validarPsw(evento, tamanioMax) {
    let digitos = (document.all) ? evento.keyCode : evento.which;
    var value=evento.target.value;
    var tamanio=value.length;
    let tecla = String.fromCharCode(digitos).toLowerCase(),
            letras = "áéíóúabcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZÁÉÍÓÚ./+_!1234567890=_";
      let response=this.evaluatePattern(letras,tecla,tamanioMax,tamanio);
    return response;
}
validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
    return true;
  } else {
     
   return false;
  }
}

 formatoPalabra(texto, tamanio){
  if(texto.length>tamanio || texto.length==0){
    return false;
  }else{
    return true;
  }
}

 formatoNumero(numero){
  try{
    let num=parseInt(numero);
    if(numero.length!=0){
       return true;
    }else{
       return false;
    }
   
  }catch(e){
    return false;
  }
}


}

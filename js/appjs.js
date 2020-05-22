  
/*Autor Erick Clemente Cuervo 
  no comente el html porque realmente es muy parecido todo el codigo al que vimos en la clase del sabado me quede con la intencion de usar <ul>
  <li> pero si seguimos trabajando con esto are el cambio lo mismo paso con el css no hago comentarios fue practicamente los mismo visto en clase 
  salvo el ocultar los div contenedores del menú donde si comente algo.  
*/

function duplicate(){ //función para duplicar  funciona para todos los submenus(camara,chats,estados,llamadas)
    var tab = document.getElementsByClassName("contenedor"); ///revisa el numero de contenedores
    for (var i=0; i<tab.length; i++){ //recorre los contenedores
        var n=tab[i].style.display; //trae el la propiedad de display del contenedor
      //  console.log(n);
        if (n=="inline"){//checa si el contenedor esta en linea
           // console.log(tab[i]);
           if (i==2){//si el contenedor es el numero 2 copia un div interno
            var deb = document.querySelector("#recintes").innerHTML;
              console.log(deb)
              document.querySelector("#recintes").innerHTML+=deb;   
           }else{// sino copia todo lo que hay en el div
            var deb = document.querySelector('#view'+i).innerHTML;
          //  console.log(deb)
            document.querySelector('#view'+i).innerHTML+=deb;    
           } 
        }
    }   
    
}
function activetab(l){ ///función para activar tanto el borderBottom como el contenedor seleccionado
    var tab = document.getElementsByClassName("contenedor");
    var tabestados=document.querySelectorAll("#bottom-line");
    //console.log(tabestados);  
    //console.log(tab);
    for (var i=0; i<tabestados.length; i++){ //desactiva todo
        tabestados[i].style.borderBottom = "3px solid green";
        tab[i].style.display = "none";          
    }
    //activa la seleccion deacuerdo al parametro
    tabestados[l].style.borderBottom = "3px solid white" ;
    tab[l].style.display="inline";
}

var posiciontop =0;//inicia la posicion del scroll
function muevescroll(){ //función para aparecer o desaparecser el menu segun el movimiento del cursor 
    var header =  document.querySelector('.header');
    var menu   =  document.querySelector('.menu');
    var pos = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop; // trato de averiguar la posicion de la pagina lo encontre en : "https://stackoverflow.com/questions/19618545/body-scrolltop-vs-documentelement-scrolltop-vs-window-pageyoffset-vs-window-scro/20478983" y en "https://github.com/Prinzhorn/skrollr/blob/b98d40820b9864be275e81af382045d72cc5a08a/src/skrollr.js#L627"
    console.log(menu);
    //console.log(posiciontop);
    //console.log(header);
    if (pos > posiciontop){
     // si va hacia abajo el scroll
      header.style.position = '';
      header.style.top = null;
      menu.style.top=0;
   } else {
      // si va hacia arriba el scroll
      menu.style.top="40px";// con esto acomoda la barra de submenus(camara,chats,estados,llamadas)
      header.style.position = 'sticky';//'sticky';
      header.style.top = 0;
   }
   posiciontop = pos <= 0 ? 0 : pos; // por si se pasa de 0 (numero negativos)
};


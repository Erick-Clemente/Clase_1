// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOjJh5tLTxrrSMMcmzg10hQLHAPJInAjk",
  authDomain: "chatapp-2a11f.firebaseapp.com",
  databaseURL: "https://chatapp-2a11f.firebaseio.com",
  projectId: "chatapp-2a11f",
  storageBucket: "chatapp-2a11f.appspot.com",
  messagingSenderId: "157134947168",
  appId: "1:157134947168:web:3304e879a09e45931a5405",
  measurementId: "G-PCW5869LNL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//console.log(firebase);

const db = firebase.firestore();
/*db.setting({ timestampsInSnapshorts: true});*/

function renderChart(doc,opc){
  switch(opc){
    case "i":
        if (doc.from=="Erick" || doc.to=="Erick"){
          var bandera=true;
        }else{
          var bandera=false;
        }
      break;
      case "l":
          if (doc.data().from=="Erick" || doc.data().to=="Erick"){
            var bandera=true;
          }else{
            var bandera=false;
          }
        break; 

    }
  if (bandera){
    let div    =document.createElement('div');
    
    let divim  =document.createElement('div');
    let divc   =document.createElement('div');
    
    let divtr  =document.createElement('div');
    let divcn  =document.createElement('div');
    let divdt  =document.createElement('div');

    let divbr  =document.createElement('div');
    let divcon =document.createElement('div');
    let divs   =document.createElement('div');
    //div.setAttribute.class="row";
    div.setAttribute('class',"row");
    
    divim.setAttribute('class',"icon");
    //div.setAttribute('data-id',doc.id);
    divc.setAttribute('class',"content");

    divtr.setAttribute('class',"top-row");
    divcn.setAttribute('class',"chatname");
    divdt.setAttribute('class',"timedate");
    
    divbr.setAttribute('class',"boton-row");
    divcon.setAttribute('class',"contactname");
    divs.setAttribute('class',"status");

    div.appendChild(divim);
    div.appendChild(divc);
    
    divc.appendChild(divtr);
    divc.appendChild(divbr);
    
    divtr.appendChild(divcn);
    divtr.appendChild(divdt);

    divbr.appendChild(divcon);
    divbr.appendChild(divs);

    document.querySelector("#view1").appendChild(div);

    //to.textContent = doc.data().to;
    //message.textContent = doc.data();message;

    switch(opc){
      case "i":
        divim.innerHTML='<img src="img/persona.png" height="30px" width="30px"  alt="Avatar">';
        divcn.textContent  = doc.from;
        divcon.textContent = doc.message.substring(0, 25);
        divdt.textContent  = `${doc.timestamp.getHours()}:${doc.timestamp.getMinutes()}:${doc.timestamp.getSeconds()}`;//.toDate().toLocaleTimeString();
        divs.textContent   = "1";
      break;
      case "l":
        divim.innerHTML='<img src="img/persona.png" height="30px" width="30px"  alt="Avatar">';
        divcn.textContent = doc.data().from;
        divcon.textContent = doc.data().message.substring(0, 25);
        divdt.textContent = doc.data().timestamp.toDate().toLocaleTimeString();
        divs.textContent = "1";
      break; 

    }
  }
}

function insertar(mensaje,para,fecha,bandera){
  if (bandera){
    var ref = db.collection('chat');
    //console.log(ref);
    //console.log(de+mensaje+para+fecha); 
   /* ref.add({
      from:"Erick",
      message:mensaje,
      timestamp:fecha,
      to:para
    });*/
    var nr=new Object();
    nr.from="Erick";
    nr.message=mensaje;
    nr.timestamp=fecha;
    nr.to=para;
    document.getElementById("message").value='';
    console.log(nr.from);
    renderChart(nr,"i");
    //actualiza();
    
  }else{
    alert("datos Incorrectos");
  }
}

/*function exito(){
  //alert("exito");
  document.getElementById("send-message").reset();
  actualiza();
}

function actualiza(){
  document.getElementById("send-message").submit();
}*/


db.collection('chat').orderBy('timestamp').get().then((snapshot) =>{
  snapshot.docs.forEach(doc=>{
    console.log(doc.data());
    renderChart(doc,"l");
  });
});



document.addEventListener('DOMContentLoaded',function(){
 
  document.querySelectorAll("#bottom-line").forEach( function(div){
    div.onclick=function(){
      //console.log(div.dataset.view);
      activetab(div.dataset.view);
    }
  });

  
  document.querySelector(".appname").onclick=function(){
    duplicate();
  } 

  document.querySelector(".insert").onclick=function(){
    onclicinsertar();
  }

  var scroll_value = 0; //inicia la posicion del scroll
  window.onscroll = function(){
    //console.log(window.scrollY);
    var header =  document.querySelector('.header');
    var menu   =  document.querySelector('.menu');
    //const scroll_value = window.scrollY;
    //console.log(scroll_value);
    if (window.scrollY > scroll_value){
      //console.log("abajo");
      // si va hacia abajo el scroll
      header.style.position = '';
      header.style.top = null;
      menu.style.top=0;
    }else{
      //console.log("arriba");
      // si va hacia arriba el scroll
      menu.style.top="40px";// con esto acomoda la barra de submenus(camara,chats,estados,llamadas)
      header.style.position = 'sticky';//'sticky';
      header.style.top = 0;
    } 
    scroll_value= window.scrollY <=0 ? 0 : window.scrollY; //por si se pasa de 0 (numero negativos)
  };

});


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

function duplicate(){ //función para duplicar  funciona para todos los submenus(camara,chats,estados,llamadas)
  var tab = document.getElementsByClassName("contenedor"); ///revisa el numero de contenedores
  for (var i=0; i<tab.length; i++){ //recorre los contenedores
      var n=tab[i].style.display; //trae el la propiedad de display del contenedor
    //  console.log(n);
      if (n=="inline"){//checa si el contenedor esta en linea
          // console.log(tab[i]);
          if (i==2){//si el contenedor es el numero 2 copia un div interno
          var deb = document.querySelector("#recintes").innerHTML;
            //console.log(deb)
            document.querySelector("#recintes").innerHTML+=deb;   
          }else{// sino copia todo lo que hay en el div
          var deb = document.querySelector('#view'+i).innerHTML;
        //  console.log(deb)
          document.querySelector('#view'+i).innerHTML+=deb;    
          } 
      }
  }   
    
}

function onclicinsertar(){

  var para='';
  var mensaje='';
  para    = document.getElementById("to").value;
  mensaje = document.getElementById("message").value;  
  var fecha=new Date();//+new Date();//(Math.round(Date.now()/1000));
  //console.log(para+mensaje+fecha);
  if (para.length==0 || mensaje.length==0){
    alert("El destinatario o el Mensaje estan vacios favor de completar");
    var bandera = false;
  }else{
    var bandera = true;
    insertar(mensaje,para,fecha,bandera);
    //alert("Operacion exitosa " +de+para+mensaje+fecha); 
  }
}






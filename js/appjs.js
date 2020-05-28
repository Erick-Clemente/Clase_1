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
//variables
const db = firebase.firestore();
// Set the duration of the long press and declare a couple variables
var longpress = 1000;
var start;
var divMouseDown;                       
//////////////
var quienlousa="Erick"

/*db.setting({ timestampsInSnapshorts: true});*/


function renderChart(doc,opc){
  if (doc.data().from==quienlousa || doc.data().to==quienlousa){
      
    let div    =document.createElement('div');
    
    let divim  =document.createElement('div');
    let divc   =document.createElement('div');
    
    let divtr  =document.createElement('div');
    let divcn  =document.createElement('div');
    let divdt  =document.createElement('div');

    let divbr  =document.createElement('div');
    let divcon =document.createElement('div');
    let divs   =document.createElement('div');
    //para hacer modificaciones creamos otro div y elementos para guarda
    let  divg   =document.createElement('div');
    let  caja   =document.createElement('input');
    let  guarda  =document.createElement('input');
    let  cancel  =document.createElement('input');
    //div.setAttribute.class="row";
    div.setAttribute('class',"row");
    div.setAttribute('data-row',doc.id);
    div.setAttribute('ondblclick',"actualiza(this)");
    div.setAttribute('onmousedown',"eliminar(this)");
    div.setAttribute('onmouseup', "eli2(this)");
    div.setAttribute('mouseleave',"eli2(this)");
   
    
    divim.setAttribute('class',"icon");
    //div.setAttribute('data-id',doc.id);
    divc.setAttribute('class',"content");

    divtr.setAttribute('class',"top-row");
    divcn.setAttribute('class',"chatname");
    divdt.setAttribute('class',"timedate");
    
    divbr.setAttribute('class',"boton-row");
    divcon.setAttribute('class',"contactname");
    divcon.setAttribute('id',"c"+doc.id);
    divs.setAttribute('class',"status");
    divs.setAttribute('id',"s"+doc.id);

    divg.setAttribute('class',"paraedit");
    divg.setAttribute('id',"g"+doc.id);
    caja.setAttribute('type',"text");
    caja.setAttribute('id',"edita_id");
    caja.setAttribute('class',"edit");
    caja.setAttribute('id',"caj"+doc.id);

    guarda.setAttribute('type',"button");
    guarda.setAttribute('id',"guardar");
    guarda.setAttribute('class',"gcambios");
    guarda.setAttribute('id',"gua"+doc.id);
    guarda.setAttribute('value',"Guardar");
    guarda.setAttribute('onclick',"guardar(this)");

    cancel.setAttribute('type',"button");
    cancel.setAttribute('id',"cancelar");
    cancel.setAttribute('class',"cancela");
    cancel.setAttribute('id',"eli"+doc.id);
    cancel.setAttribute('value',"Cancelar");
    cancel.setAttribute('onclick',"cancelar(this)");

    div.appendChild(divim);
    div.appendChild(divc);
    
    divc.appendChild(divtr);
    divc.appendChild(divbr);
    
    divtr.appendChild(divcn);
    divtr.appendChild(divdt);

    divbr.appendChild(divcon);
    divbr.appendChild(divs);
    divbr.appendChild(divg);
    divg.appendChild(caja);
    divg.appendChild(guarda);
    divg.appendChild(cancel);

    document.querySelector("#view1").appendChild(div);

    divim.innerHTML='<img src="img/persona.png" height="30px" width="30px"  alt="Avatar">';
    divcn.textContent = doc.data().from;
    divcon.textContent = doc.data().message.substring(0, 25);
    divdt.textContent = doc.data().timestamp.toDate().toLocaleTimeString();
    divs.textContent = "1";
  }
}

function insertar(mensaje,para,fecha,bandera){
  if (bandera){
    var ref = db.collection('chat');
    ref.add({
      from:"Erick",
      message:mensaje,
      timestamp:fecha,
      to:para
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("message").value='';  
      //console.log(nr.from);
      
      //db.collection('chat').where('timestamp','==',fecha).get().then((snapshot) =>{
      db.collection("chat").doc(docRef.id).get().then(function(doc){
        
          console.log(doc.id);
          renderChart(doc);
        
      });
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  
   
  }else{
    alert("datos Incorrectos");
  }
}


db.collection('chat').orderBy('timestamp').get().then((snapshot) =>{
  snapshot.docs.forEach(doc=>{
    //console.log(doc.id);
    renderChart(doc);
  });
});

function actualiza(div){
 // funcion para oculatar mensaje y ver elementos para editar el mismo
  var idc="#c"+div.dataset.row;
  var ids="#s"+div.dataset.row;
  var idg="#g"+div.dataset.row;
  var caj="caj"+div.dataset.row;
  var c = document.querySelector(idc);
  var s = document.querySelector(ids);
  var g = document.querySelector(idg);
  var inp = document.getElementById(caj);
  inp.value=c.innerHTML;
 // console.log(men);
  c.style.display="none";
  s.style.display="none";
  g.style.display="inline";
  /*contactname
  status*/
}
function cancelar(diveli){
  console.log(diveli.id);
  var id=diveli.id;
  var la=id.length;
  var idc="#c"+id.substring(3,la);
  var ids="#s"+id.substring(3,la);
  var idg="#g"+id.substring(3,la);
  var c = document.querySelector(idc);
  var s = document.querySelector(ids);
  var g = document.querySelector(idg);
  //console.log(c+s+g);
  c.style.display="inline";
  s.style.display="inline";
  g.style.display="none";
}

function guardar(divedit){
  console.log(divedit.id);
  var id=divedit.id;
  id=id.substring(3,id.length)
  var idc="#c"+id;
  var ids="#s"+id;
  var idg="#g"+id;
  var caj="caj"+id;
  var c = document.querySelector(idc);
  var s = document.querySelector(ids);
  var g = document.querySelector(idg);
  var inp = document.getElementById(caj);
  var msjnuevo=inp.value;
  c.innerHTML=msjnuevo;

  var mensaje = db.collection("chat").doc(id);
  return mensaje.update({
    message: msjnuevo
  })
  .then(function() {
      console.log("Document successfully updated!");
      c.innerHTML=msjnuevo;
      c.style.display="inline";
      s.style.display="inline";
      g.style.display="none";
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
  
  //console.log(c+s+g);

}
//funte de --> https://stackoverflow.com/questions/14586883/how-to-detect-a-long-press-on-a-div-in-jquery
// Check for mousedown on the element of choice
function eliminar(div){
 //   console.log(div.dataset.row);
  start = new Date().getTime();
  // See if mouse is still being held down after the longpress duration
  var id = div.dataset.row;
  divMouseDown = setTimeout(function(){
    var confirma=confirm('se eliminara el registro');
    if (confirma){
    db.collection("chat").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    div.innerHTML="";
    }    
    // What we want to happen when mouse is clicked and held for 1 second
  }, longpress);
} 

function eli2(){  
  if (divMouseDown) {
    //console.log("solo cilck"+start);
    clearTimeout(divMouseDown);
  }
  start = 0;
};




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
  var fecha=new Date();
  if (para.length==0 || mensaje.length==0){
    alert("El destinatario o el Mensaje estan vacios favor de completar");
    var bandera = false;
  }else{
    var bandera = true;
    insertar(mensaje,para,fecha,bandera);
  }
}





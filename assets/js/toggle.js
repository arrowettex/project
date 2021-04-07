/*
    Toggle Script for view switching on index.html
    Pucha eto nlng talaga, tapos na yung buong layout

    Use ".active" for sidebar link 
 */


var a = document.getElementById("MaintenScore");
var b = document.getElementById("MachineRep");


// showing one closes all other
function toggleSecA(){
    a.style.display = "block";
    b.style.display = "none";
}

function toggleSecB(){              
    b.style.display = "block";
    a.style.display = "none";

}


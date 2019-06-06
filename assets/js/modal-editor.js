var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new XMLHttpRequest();
var data;
var mainMenu;
var orderList;
var inputList;
var devX;


window.onload = function(){ 
    function getMainMenu(){
        let dataToPass ={
            "method":"select",
            "data":{
                "table":"keyword",
                "returnID":"121"
            }
        }
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Basic", btoa(username +":"+ password));
        xhr.setRequestHeader("Action", actionPoint);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4 || xhr.status != 200){
                xmldata = xhr.responseText;
            }
            else{
                data = xhr.responseText;
                console.log(data);
                parseData = JSON.parse(data);
                console.log(parseData);
                console.log(parseData.methodResponse.content);
                convArrays = parseData.methodResponse.content.split('|');
                heading = parseData.methodResponse.header;
                console.log(convArrays);
                lts = document.getElementById('headerContent');
                let textA = document.createElement("p");
                let nodeA = document.createTextNode(heading);
                textA.value = heading;
                zxc = textA.appendChild(nodeA);
                lts.appendChild(zxc);
                convArrays.forEach(function (convArray, i){
                    console.log(convArray);
                    convArray = convArray.split('_').join(') ');
                    var input = document.createElement("input");
                    input.type = "text";
                    input.id = "item-list" + i;
                    input.className = "no-border";
                    input.value = convArray;
                    document.getElementById("peritem").appendChild(input);
                    
                });
                $('.no-border').click(function(){
                    inputVal1 = $('#item-list4').val()
                    console.log(inputVal1)
                })
            }
        }
        xhr.send(JSON.stringify(dataToPass));
    }
    getMainMenu();
    var btnModal = document.getElementById("modalpop");
    var modal = document.getElementById("myModal");
    var spanX = document.getElementsByClassName("close")[0];
    var contain = document.getElementById('content-menu1');
    btnModal.onclick = function(){
        console.log(convArrays);
        textA = document.createElement("textarea");
        textA.name = "post";
        textA.rows = "3";
        textA.value = heading;
        contain.appendChild(textA);
        btnSave = document.createElement("input");
        btnSave.type = "button";
        btnSave.value = "Save";
        btnSave.className = "btn btn-primary saveMe";
        
        modal.style.display = "block";
        convArrays.forEach(function (array, a){
            array = array.split('_').join(') ');
            var input = document.createElement("INPUT");
            input.type = "text";
            input.setAttribute("id", "edit-item" +a);
            input.className = "first-choice";
            input.value = array;
            contain.appendChild(input);
            
        })
        contain.appendChild(btnSave);
        
    }
    
    spanX.onclick = function(){
        contain.innerHTML = "";
        modal.style.display = "none";
    }
    
    window.onclick = function(event){
        if (event.target == modal){
            contain.innerHTML = "";
            modal.style.display = "none";
        }
    }

    
    
};
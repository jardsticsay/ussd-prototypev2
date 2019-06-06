var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new XMLHttpRequest();
var data;
var mainMenu;
var orderList;
var inputList;


window.onload = function(){ 
    function getMainMenu(){
        let orderList = '<ul>';
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
                console.log(data);
            }
            else{
                data = xhr.responseText;
                console.log(data);
                parseData = JSON.parse(data);
                console.log(parseData);
                console.log(parseData.methodResponse.content);
                convArrays = parseData.methodResponse.content.split('|');
                console.log(convArrays);
                convArrays.forEach(function (convArray, i){
                    convArray = convArray.split('_').join(') ');
                    console.log(convArray);
                    orderList += '<li>' +convArray+ '</li>';
                });
                orderList += '</ul>';
                document.getElementById("peritem").innerHTML = orderList;
                testData = orderList;
            }
            console.log(orderList);
        }
        xhr.send(JSON.stringify(dataToPass));
    }
    getMainMenu();
    var btnModal = document.getElementById("modalpop");
    var modal = document.getElementById("myModal");
    var spanX = document.getElementsByClassName("close")[0];
    
    btnModal.onclick = function(){
        console.log(convArrays);
        modal.style.display = "block";
        convArrays.forEach(function (array, i){

            console.log(i);
            array = array.split('_').join(') ');
            console.log(array);
            inputList += '<input>' + array + '<br>';
            abc = document.createElement("input");
            abc.setAttribute("value", array);
            // input = document.createElement("INPUT");
            // input.setAttribute("type", "text");
            // input.setAttribute("id", "menu-item" +i);
            // input.setAttribute("value", array[i]);
            // document.getElementById("content-menu1").appendChild(input);
        })
        document.getElementById("content-menu1").appendChild(abc);
        console.log(document.getElementById("content-menu1").appendChild(abc));
        document.getElementById("content-menu1").innerHTML = inputList;
    }
    
    spanX.onclick = function(){
        modal.style.display = "none";
    }
    
    window.onclick = function(event){
        if (event.target == modal){
            modal.style.display = "none";
        }
    }
};


var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new XMLHttpRequest();
var keyword = "keyword";
var actualKey = "actualKeyword";
var mainKey = "mainKeyword";
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
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(heading);
                textarea.type = "text";
                textarea.className = "no-border no-cursor firstHeader";
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                convArrays.forEach(function (convArray, i){
                    console.log(convArray);
                    convArray = convArray.split('_').join(') ');
                    var input = document.createElement("input");
                    input.type = "text";
                    input.id = "item-list" + i;
                    input.className = "no-border firstItems";
                    input.value = convArray;
                    document.getElementById("peritem").appendChild(input);
                    
                });

                 
                $('.no-border').click(function(){
                    firstVal = $(this).val();
                    console.log(firstVal);
                    searchKeyword();
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

    function searchKeyword(){
        dbfirstVal = firstVal.split(') ').join('_');
        console.log(dbfirstVal);
        let dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":keyword,
                "field1":actualKey,
                "value1":dbfirstVal,
                "operator":"AND",
                "field2":actualKey,
                "value2":dbfirstVal
            }
        }
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Basic", btoa(username +":"+ password));
        xhr.setRequestHeader("Action",actionPoint);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4 || xhr.status != 200){
                xmldata = xhr.responseText;
            }
            else{
                secondData = xhr.responseText;
                secondMenu = JSON.parse(secondData);
                console.log(secondMenu);
                convArrays = secondMenu.methodResponse.queryList[0].content.split('|');
                console.log(convArrays);
                heading = secondMenu.methodResponse.queryList[0].header;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(heading);
                textarea.type = "text";
                textarea.className = "no-border no-cursor secondHeader";
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                convArrays.forEach(function (convArray, i){
                    console.log(convArray);
                    convArray = convArray.split('_').join(') ');
                    let input = document.createElement("input");
                    input.type = "text";
                    input.id = "second-item"+i;
                    input.className = "no-border secondItems";
                    input.value = convArray;
                    $('.firstItems').hide();
                    document.getElementById("peritem").appendChild(input);

                })
                $('.firstHeader').hide();
                $('.no-border').click(function(){
                    firstVal = $(this).val();
                    console.log(firstVal);
                    searchKeywordTwo();
                })
            }
        }
        xhr.send(JSON.stringify(dataToPass));
    }

    function searchKeywordTwo(){
        dbfirstVal = firstVal.split(') ').join('_');
        console.log(dbfirstVal);
        let dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":keyword,
                "field1":actualKey,
                "value1":dbfirstVal,
                "operator":"AND",
                "field2":actualKey,
                "value2":dbfirstVal
            }
        }
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Basic", btoa(username +":"+ password));
        xhr.setRequestHeader("Action",actionPoint);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4 || xhr.status != 200){
                xmldata = xhr.responseText;
            }
            else{
                secondData = xhr.responseText;
                secondMenu = JSON.parse(secondData);
                console.log(secondMenu);
                convArrays = secondMenu.methodResponse.queryList[0].content.split('|');
                console.log(convArrays);
                heading = secondMenu.methodResponse.queryList[0].header;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(heading);
                textarea.type = "text";
                textarea.className = "no-border no-cursor thirdHeader";
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                convArrays.forEach(function (convArray, i){
                    console.log(convArray);
                    convArray = convArray.split('_').join(') ');
                    let input = document.createElement("input");
                    input.type = "text";
                    input.id = "second-item"+i;
                    input.className = "no-border thirdItems";
                    input.value = convArray;
                    $('.secondItems').hide();
                    document.getElementById("peritem").appendChild(input);

                })
                $('.firstHeader').hide();
                $('.no-border').click(function(){
                    firstVal = $(this).val();
                    console.log(firstVal);
                    searchKeywordThree();
                })
            }
        }
        xhr.send(JSON.stringify(dataToPass));
    }
    
    function searchKeywordThree(){
        dbfirstVal = firstVal.split(') ').join('_');
        console.log(dbfirstVal);
        let dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":keyword,
                "field1":actualKey,
                "value1":dbfirstVal,
                "operator":"AND",
                "field2":actualKey,
                "value2":dbfirstVal
            }
        }
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Basic", btoa(username +":"+ password));
        xhr.setRequestHeader("Action",actionPoint);
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4 || xhr.status != 200){
                xmldata = xhr.responseText;
            }
            else{
                secondData = xhr.responseText;
                secondMenu = JSON.parse(secondData);
                console.log(secondMenu);
                convArrays = secondMenu.methodResponse.queryList[0].content.split('|');
                console.log(convArrays);
                heading = secondMenu.methodResponse.queryList[0].header;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(heading);
                textarea.type = "text";
                textarea.className = "no-border no-cursor thirdHeader";
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                convArrays.forEach(function (convArray, i){
                    console.log(convArray);
                    convArray = convArray.split('_').join(') ');
                    let input = document.createElement("input");
                    input.type = "text";
                    input.id = "third-item"+i;
                    input.className = "no-border thirdItems";
                    input.value = convArray;
                    $('.secondItems').hide();
                    document.getElementById("peritem").appendChild(input);

                })
                $('.firstHeader').hide();
                $('.no-border').click(function(){
                    firstVal = $(this).val();
                    console.log(firstVal);
                })
            }
        }
        xhr.send(JSON.stringify(dataToPass));
    }
};
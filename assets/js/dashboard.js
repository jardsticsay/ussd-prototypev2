var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var parseJson = false;
var firstPageContent = "";
var max_fields = 9;

$(function (){
    console.log(document.getElementById('peritem'));

    var loopFirstContent = function(){
        var list = document.getElementById("inputContainer");
        $.each(parseJson, function(key, value){
            if(key == 'methodResponse'){
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.header;
                console.log(firstPageHeader);
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    for ( a = 0; a < i.length; a++){
                        var remove = document.createElement("BUTTON");
                        remove.setAttribute("id", "btnRemove");
                        remove.setAttribute("value","Remove");
                        document.getElementById('peritem').appendChild(remove);
                        document.getElementById("btnRemove").innerText = "Remove";
                    }
                    
                    
                    console.log(remove);
                    document.getElementById('peritem').appendChild(input);
                    
                    
                    
                }
            }
        })
    }

    var getFirstMenu = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"0"
                }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data : JSON.stringify(dataToPass
            ),
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success : function(response){
                parseData = JSON.parse(response);
                parseJson = parseData;
                console.log(parseJson);
                loopFirstContent();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    
    getFirstMenu();

    var getSecondMenu = function(){
        var dataToPass ={
            "method":"searchTwoField",
            "data":{
                "table":"keyword",
                "field1":"mainkeyword",
                "value1":"*121#",
                "operator":"AND",
                "field2":"page",
                "value2":"2"
            }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify(
                dataToPass
            ),
            beforeSend: function(xhr){
                xhr.setRequestHeader("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader("Action", actionPoint);
            },
            success: function(response){
                allPageTwoData = JSON.parse(response);
                console.log(allPageTwoData);
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        })
    }
    getSecondMenu();



})
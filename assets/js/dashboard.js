var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var parseJson = false;

$(function (){

    var loopFirstContent = function(){
        $.each(parseJson, function(key, value){
            if(key == 'methodResponse'){
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                console.log(firstArray);
                for (i = 0; i < firstArray.length; i++){
                    
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

})
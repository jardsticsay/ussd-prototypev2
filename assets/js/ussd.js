var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var parseJson = false;
var firstPageContent = "";
var firstPageHeader = "";
var secondPageContent = "";
var secondPageHeader = "";
var thirdPageContent = "";
var thirdPageHeader = "";
var fourthPageContent = "";
var fourthPageHeader = "";
var gigaPageContent = "";
var pageNumber;
var forNextPage;
var keyWord;
var arrayofPages= [];
var newArrayofPages = [];
var newArrayofPageOne = [];
var abs = 1;
var choiceCode = $('#choiceCode').val();
var clearInput = $('#choiceCode').val('');
var a = a || 0;
var lastPageArray = "";
var onEnter = document.getElementById('choiceCode');
console.log(a);


$(function (){

    /* API CALLS */
   var firstInstance = function() {
        $.each(parseJson, function(key, value){
            if (key == 'methodResponse'){
                pageNumber = value.page;
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.header;
                for ( i = 0; i < firstArray.length; i++){
                    firstPageContent += "<span>" + firstArray[i] +  "</span><br/>";
                }
                document.getElementById("entryPoint").innerHTML = firstPageHeader;
                document.getElementById("firstMenu").innerHTML = firstPageContent;
            }
            
        });
    }

  

    var getData = function() {
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
                firstInstance();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }

    getData();

    var pageValues = function(){
        $.each(allPageTwoValue, function(key, value){
            if (key == 'methodResponse'){
                for( i = 0; i < value.queryList.length; i++){
                    allPageTwo = value.queryList[i].pagecode;
                    console.log(allPageTwo);
                        if ( allPageTwo === undefined){
                            allPageTwo ='0';
                            console.log(allPageTwo);
                        }
                    newArrayofPages.push(allPageTwo);
                    console.log(newArrayofPages);
                    console.log(newArrayofPages[newArrayofPages.length-1])
                }

            }
        });
    }

    var allPageOneValue = function(){
        $.each(allPageId, function(key, value){
            if (key == 'methodResponse'){
                console.log(value);
                for( i = 0; i < value.queryList.length; i++){
                    console.log(value.queryList[i].id);
                    allPageOne = value.queryList[i].id;
                    newArrayofPageOne.push(allPageOne);
                    console.log(newArrayofPageOne);
                }
            }
        })
    }

    var getPageId = function (){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword",
                "field1":"mainkeyword",
                "value1":"*121#",
                "operator":"AND",
                "field2":"page",
                "value2": "2"
            }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data : JSON.stringify(
                dataToPass
            ),
            beforeSend : function(xhr){
                xhr.setRequestHeader("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader("Action", actionPoint);
            },
            success : function(response){
                allPageId = JSON.parse(response);
                console.log(allPageId);
                allPageOneValue();
            },
            error : function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
  
    getPageId();

    
    

    var getAllPageValue = function (){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword2",
                "field1":"page",
                "value1":forNextPage,
                "operator":"AND",
                "field2":"mainkeyword",
                "value2": keyMatch
            }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data : JSON.stringify(
                dataToPass
            ),
            beforeSend : function(xhr){
                xhr.setRequestHeader("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader("Action", actionPoint);
            },
            success : function(response){
                allPageTwoValue = JSON.parse(response);
                console.log(allPageTwoValue);
                pageValues();
            },
            error : function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
  

    var firstChoice = function (){
        var pageCode = $('#choiceCode').val();
        var dataToPass = {"method":"select",
                            "data":{
                            "table":"keyword",
                            "returnID":pageCode}
                        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data: JSON.stringify(dataToPass),
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success : function(response){
                secondContent = JSON.parse(response);
                console.log(secondContent);
                $('.loader').show();
                renderSecondpromoChoice();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }

   

   var gigaContent = function(){
        $.each(gigaData, function(key,value){
            if(key == 'methodResponse'){
                console.log(forNextPage);
               console.log(value.queryList[0].nextpage)
                pageNumber = value.queryList[0].page;
                console.log(pageNumber);
                gigaHeader = value.queryList[0].header;
                gigaSplit = value.queryList[0].content.split('_').join(') ');
                gigaArray = gigaSplit.split('|');
                for (i = 0; i < gigaArray.length; i ++){
                    gigaPageContent += "<span>" + gigaArray[i] + "<span><br/>";
                    console.log(gigaArray);
                }
                document.getElementById("entryPoint").innerHTML = gigaHeader ;
                document.getElementById("firstMenu").innerHTML = gigaPageContent ;
            }
        })
    }
    

    var secondPageChoice = function(){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword2",
                "field1":"page",
                "value1":forNextPage,
                "operator":"AND",
                "field2":"actualKeyword",
                "value2": keyWord
            }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data: JSON.stringify(dataToPass),
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success : function(response){
                gigaData = JSON.parse(response);
                console.log(gigaData);
                gigaContent();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload Page')
                location.reload();
            },
            async: false
        })
    }

    

    var renderSecondpromoChoice = function(){
        $.each(secondContent, function(key, value){
            if (key == 'methodResponse'){
                pageNumber = value.page;
                pageCode = value.pagecode;
                forNextPage = value.nextpage;
                keyMatch = value.actualkeyword;
                secondContent = value.content.split('_').join(') ');
                secondArray = secondContent.split('|');
                secondPageHeader = value.header;
                for ( i = 0; i < secondArray.length; i++){
                    secondPageContent += "<span>" + secondArray[i] +  "</span><br/>";
                    console.log(secondArray[i]);
                }
                document.getElementById("entryPoint").innerHTML = secondPageHeader;
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                $('.loader').hide();
            }
            
        });
    }

    

    var dialUssdCode = function(){
        var mobilenumber = $('#mobileNumber').val();
        var servicecode = $('#ussdCode').val();
        var timestamp = new Date();
        
        var dataToPass = {
            "method":"insert",
                "data":{
                    "table":"session",
                    "servicecode":servicecode,
                    "mobilenumber":mobilenumber,
                    "time":timestamp
                }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data: JSON.stringify(dataToPass
        ),
        beforeSend: function(xhr){
            xhr.setRequestHeader("Basic", btoa(username + ":" + password));
            xhr.setRequestHeader("Action", actionPoint);
        },
        success: function(response){
            
        },
        error: function(textStatus,errorThrown){
            console.log(textStatus,errorThrown);
        }
        })
    }

    /* END of API CALL*/
  
    $('#sendReq').click(function(){
        console.log($('#choiceCode').val());
        choiceCode = $('#choiceCode').val();
        console.log(choiceCode);
        inputFunction();

        $('#choiceCode').val('');
    });

    var inputFunction = function(){
        if ( pageNumber == 1){
            if(newArrayofPageOne.indexOf(choiceCode) === -1){
                alert('invalid choice');
            }
            else {
                secondPageContent="";
                secondPageHeader="";
                firstChoice();
                clearInput;
            }
            
        }
        else if( pageNumber == 2){
            getAllPageValue();
            if (newArrayofPages[newArrayofPages.length-1] === choiceCode){
                console.log('go back to first page');
                pageNumber = pageNumber - 1;
                forNextPage = +forNextPage - +abs;
                secondPageContent="";
                secondPageHeader="";
                firstPageContent="";
                firstPageHeader="";
                clearInput;
                firstChoice();
            }
            else if ( newArrayofPages.indexOf(choiceCode) === -1 ){
                alert('invalid choice');
                console.log(forNextPage);
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                document.getElementById("entryPoint").innerHTML = secondPageHeader;
            }
            else if( newArrayofPages.indexOf(choiceCode) > -2){
                getAllPageValue();
                keyWord = keyMatch+choiceCode;
                console.log(keyWord);
                gigaPageContent = "";
                gigaHeader = "";
                console.log(forNextPage);
                secondPageChoice();
                forNextPage = +forNextPage + +abs;
                thirdPageContent = gigaPageContent;
                thirdPageHeader = gigaHeader;
                console.log(thirdPageContent);
                $('#choiceCode').val('');
            }
        
            

        }
        else if( pageNumber == 3){
            if (newArrayofPages[newArrayofPages.length-1] === choiceCode){
                console.log('going to second page')
                pageNumber = pageNumber - 1;
                forNextPage = +forNextPage - +abs;
                console.log(forNextPage);
                clearInput;
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                document.getElementById("entryPoint").innerHTML = secondPageHeader;
                keyWord = keyMatch;
                console.log(keyWord);
            }
            else if (newArrayofPages.indexOf(choiceCode) === -1 ){
                alert('invalid choice');
                document.getElementById("firstMenu").innerHTML = thirdPageContent;
                document.getElementById("entryPoint").innerHTML = thirdPageHeader; 
            }
            else if( newArrayofPages.indexOf(choiceCode) > -2){
                getAllPageValue();
                keyWord = keyWord+choiceCode;
                console.log(forNextPage);
                console.log(keyWord);
                gigaPageContent = "";
                gigaHeader = "";
                secondPageChoice();
                forNextPage = +forNextPage + +abs;
                fourthPageContent = gigaPageContent;
                fourthPageHeader = gigaHeader;
                clearInput;
            }
            
        }
        else if ( pageNumber == 4 ){
            if (newArrayofPages[newArrayofPages.length-1] === choiceCode){
                console.log('goin back to page3');
                pageNumber = pageNumber - 1;
                console.log(pageNumber);
                forNextPage = +forNextPage - +abs;
                console.log(forNextPage);
                clearInput;
                document.getElementById("firstMenu").innerHTML = thirdPageContent;
                document.getElementById("entryPoint").innerHTML = thirdPageHeader;
                keyWord = keyMatch + forNextPage;
                console.log(keyWord);
            }
            else if (newArrayofPages.indexOf(choiceCode) === -1 ){
                console.log('invalid choice');
                document.getElementById("firstMenu").innerHTML = fourthPageContent;
                document.getElementById("entryPoint").innerHTML = fourthPageHeader; 
            }
            else if( newArrayofPages.indexOf(choiceCode) > -2){
                keyWord = keyWord+choiceCode;
                console.log(forNextPage);
                console.log(keyWord);
                gigaPageContent = "";
                gigaHeader = "";
                secondPageChoice();
                forNextPage = +forNextPage + +abs;
                clearInput;
            }
        }
    }

    var enterInput = document.getElementById("choiceCode");
    enterInput.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            event.preventDefault();
            document.getElementById("sendReq").click();
        }
    });

    $('#dial').click(function(){
        $('.loader').show();
        var opt = document.getElementById("ussdCode");
        var code = opt.options[opt.selectedIndex].value;
        console.log(code);
        if ($('#mobileNumber').val() == '' || code == '' ){
            $('.loader').hide();
            setTimeout(function(){ alert("Enter your mobile number"); }, 3000);
        } else{
            $('.loader').hide();
            console.log('dial ussd');
            $('#content-container2').show();
            $('#content-container1').hide();
            $('#choiceCode').show();
            $('.actions').show();
            dialUssdCode();
            getData();
        }
        
    })
})


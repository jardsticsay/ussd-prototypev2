var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var parseJson = false;
var firstPageContent = "";
var secondPageContent = "";
var thirdPageContent = "";
var firstPageHeader = "";
var secondPageHeader = "";
var thirdPageHeader = "";
var gigaPageContent = "";
var pageNumber;
var forNextPage;
var keyWord;
var arrayofPages= [];
var newArrayofPages = [];
var abs = 1;
var clearInput = $('#choiceCode').val('');
console.log(abs);


$(function (){
    var me = this;
    $('#getallData').click(function(){
        
    })
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
                $('.loader').hide();
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
                console.log(value.nextpage);
                for( i = 0; i < value.queryList.length; i++){
                    allPageTwo = value.queryList[i].pagecode;
                    newArrayofPages.push(allPageTwo);
                    JSON.stringify(newArrayofPages)
                    console.log(newArrayofPages);
                }
                
            }
        });
    }
    

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

        if ( pageNumber == 1){
            secondPageContent="";
            secondPageHeader="";
            firstChoice();
            clearInput;
        }
        else if( pageNumber == 2){
            
            secondPageChoice();
            getAllPageValue();
            if (newArrayofPages[newArrayofPages.length-1] === choiceCode){
                console.log('goback');
                pageNumber = pageNumber - 1;
                forNextPage = +forNextPage - +abs;
                secondPageContent="";
                secondPageHeader="";
                firstPageContent="";
                firstPageHeader="";
                $('#choiceCode').val('');
                firstChoice();
            }
            else if ( newArrayofPages.indexOf(choiceCode) === -1 ){
                forNextPage = +forNextPage - +abs;
                secondPageContent="";
                secondPageHeader="";
                console.log(forNextPage);
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                document.getElementById("entryPoint").innerHTML = secondPageHeader;
                secondPageChoice();
                
            }
            else if( newArrayofPages.indexOf(choiceCode) > -1){
                keyWord = keyMatch+choiceCode;
                console.log(keyWord);
                gigaPageContent = "";
                gigaHeader = "";
                console.log(forNextPage);
                secondPageChoice();
                thirdPageContent = gigaPageContent;
                thirdPageHeader = gigaHeader;
                
                console.log(thirdPageContent);
                $('#choiceCode').val('');
            }
            

        }
        else if( pageNumber == 3){
            if (newArrayofPages.indexOf(choiceCode) === -1 ){
                console.log('going back');
                pageNumber = pageNumber - 1;
                
                console.log(forNextPage);
                clearInput;
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                document.getElementById("entryPoint").innerHTML = secondPageHeader;
                keyWord = keyMatch;
                console.log(keyWord);
            }
            else if( newArrayofPages.indexOf(choiceCode) > -1){
                keyWord = keyWord+choiceCode;
                forNextPage = +forNextPage + +abs;
                console.log(forNextPage);
                console.log(keyWord);
                gigaPageContent = "";
                gigaHeader = "";
                secondPageChoice();
                clearInput;
            }
        }
        else if ( pageNumber == 4 ){
            if (newArrayofPages.indexOf(choiceCode) === -1 ){
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
        }

        $('#choiceCode').val('');
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


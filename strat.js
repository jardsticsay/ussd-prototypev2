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
var pageNumber;
var newArrayofPages = [];


$(function (){
    var me = this;
    $('#getallData').click(function(){
        
    })
    /* API CALLS */
   var firstInstance = function() {
        $.each(parseJson, function(key, value){
            if (key == 'methodResponse'){
                pageNumber = value.page;
                console.log(pageNumber);
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.header;
                for ( i = 0; i < firstArray.length; i++){
                    firstPageContent += "<span>" + firstArray[i] +  "</span><br/>";
                    console.log(firstArray[i]);
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
                $('.firstMenu').html(textStatus,errorThrown);
            },
            async: false
        });
    }

    

    var pageValues = function(){
        $.each(allPageTwoValue, function(key, value){
            if (key == 'methodResponse'){
                for( i = 0; i < value.queryList.length; i++){
                    allPageTwo = value.queryList[i].pagecode;
                    newArrayofPages.push(allPageTwo);
                    console.log(newArrayofPages);
                }
                
            }
        });
    }

    var getAllFirstPageValue = function (){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data : JSON.stringify({
                "method":"getlist",
                "data":{
                    "table":"keyword",
                    "fieldName":"page",
                    "operator":"=",
                    "lookup":"2"
                }
            }),
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
                $('.firstMenu').html(textStatus,errorThrown);
            },
            async: false
        });
    }

    getAllFirstPageValue();

    


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
                $('.firstMenu').html(textStatus,errorThrown);
            },
            async: false
        });
    }

    var secondChoice = function(){
        var pageCode = $('#choiceCode').val();
        var dataToPass = {"method":"select",
                            "data":{
                            "table":"keyword2",
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
                thirdContent = JSON.parse(response);
                console.log(thirdContent);
                $('.loader').show();
                renderThirdpromoChoice();
            },
            error: function(textStatus,errorThrown){
                $('.firstMenu').html(textStatus,errorThrown);
            },
            async: false
        })

    }


    var renderSecondpromoChoice = function(){
        $.each(secondContent, function(key, value){
            if (key == 'methodResponse'){
                console.log(value)
                pageNumber = value.page;
                console.log(pageNumber);
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

    var renderThirdpromoChoice = function(){
        $.each(thirdContent, function(key, value){
            if (key == 'methodResponse'){
                console.log(value);
                pageNumber = value.page;
                console.log(pageNumber);
                thirdContent = value.content.split('_').join(') ');
                thirdArray = thirdContent.split('|');
                thirdPageHeader = value.header;
                for ( i = 0; i < thirdArray.length; i++){
                    thirdPageContent += "<span>" + thirdArray[i] +  "</span><br/>";
                    console.log(thirdArray[i]);
                }
                document.getElementById("entryPoint").innerHTML = thirdPageHeader;
                document.getElementById("firstMenu").innerHTML = thirdPageContent;
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

        if ( pageNumber == 1){
            firstChoice();
            $('#choiceCode').val('');
        }
        else if( pageNumber == 2){
            secondChoice();
            if ( $('#choiceCode').val() == 0){
                pageNumber = pageNumber - 1;
                $('#choiceCode').val('');
                document.getElementById("firstMenu").innerHTML = firstPageContent;
                document.getElementById("entryPoint").innerHTML = firstPageHeader;
                firstPageContent = "";
                firstPageHeader="";
                secondPageContent="";
                secondPageHeader="";
                firstInstance();
            }
        }
        else if( pageNumber == 3){
            if ($('#choiceCode').val() == 0){
                pageNumber = pageNumber - 1;
                thirdPageContent = "";
                thirdPageHeader = "";
                $('#choiceCode').val('');
                document.getElementById("firstMenu").innerHTML = secondPageContent;
                document.getElementById("entryPoint").innerHTML = secondPageHeader;

            }
        }

        // if ( $('#choiceCode').val() == 0){
        //     if( pageNumber == 3){
        //         pageNumber = pageNumber - 1;
        //         document.getElementById("firstMenu").innerHTML = secondPageContent;
        //         document.getElementById("entryPoint").innerHTML = secondPageHeader;

        //     }else if ( pageNumber == 2) {
        //         pageNumber = pageNumber - 1;
        //         document.getElementById("firstMenu").innerHTML = firstPageContent;
        //         document.getElementById("entryPoint").innerHTML = firstPageHeader;
        //     }
            
        // }
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


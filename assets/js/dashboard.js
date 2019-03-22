var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var parseJson = false;
var firstPageContent = "";
var allSecondContents=[];
var arraySecondHeader=[];
var arrayActualKeyword=[];
var headerArray=[];
var keywordArray=[];
var mixContainer=[];
var threeMixContainer=[];
var allSecondHeader;
var menuElement;
var max_fields = 9;
var secondHeader="";
var secondKeyword="";
var secondPageContent="";
var pageNumber;
var actualMkeyword;
var pageCode;
var keyword;
var pageCode3;
var keyword3;
var pageCode4;
var keyword4;
var testVal;
var getIconId =[];
var tempContainerOne="";
var tempCrackOne="";
var tempContainerTwo="";
var tempCrackTwo="";
var tempContainer="";
var tempCrack="";
var componentID;
var arrayOne={};
var contentEntry;

var gettabval = function(){
    var test = document.getElementById("thirdTab");
    testVal = test.value;
    console.log(testVal);
}

$(function (){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
    var loopFirstContent = function(){
        $.each(parseJson, function(key, value){
            if(key == 'methodResponse'){
                componentID = value.returnID;
                if(componentID == undefined){
                    componentID = 0;
                }
                console.log(componentID);
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.header;
                console.log(firstPageHeader);
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header first-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item" +i);
                    input.setAttribute("class","col-md-11 item-choice first-choice")
                    input.setAttribute("value", firstArray[i]);
                    icon = document.createElement("I");
                    icon.setAttribute("class", "col-md-1 fa fa-arrow-circle-right first-arrow");
                    icon.setAttribute("id", i);
                    icon.setAttribute("data-toggle", "tooltip");
                    icon.setAttribute("data-placement", "top");
                    icon.setAttribute("title","Click to edit the contents of this menu");
                    console.log(icon.id);
                    getIconId.push(icon.id);
                    document.getElementById('peritem').appendChild(input);
                    document.getElementById('peritem').appendChild(icon);
                    
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
                $('.lds-spinner').hide();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    
    getFirstMenu();
    

    var firstChoice = function (){
        var dataToPass = {"method":"select",
                            "data":{
                            "table":"keyword",
                            "returnID":btnIndex
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
                secondContent = JSON.parse(response);
                $('.lds-spinner').show();
                editSecondContent();
                $('.lds-spinner').hide();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }

    var editSecondContent = function(){
        $.each(secondContent, function(key, value){
            if(key == 'methodResponse'){
                
                firstContent = value.content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.header;
                console.log(firstPageHeader);
                actualMkeyword = value.actualkeyword;
                document.getElementById("menuContent").innerHTML = actualMkeyword;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header second-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item" +i);
                    input.setAttribute("class","col-md-11 item-choice second-choice")
                    input.setAttribute("value", firstArray[i]);
                    icon = document.createElement("I");
                    icon.setAttribute("class", "col-md-1 fa fa-arrow-circle-right second-arrow");
                    icon.setAttribute("id", i);
                    icon.setAttribute("data-toggle", "tooltip");
                    icon.setAttribute("data-placement", "top");
                    icon.setAttribute("title","Click to edit the contents of this menu");
                    console.log(icon.id);
                    getIconId.push(icon.id);
                    document.getElementById('peritem').appendChild(input);
                    document.getElementById('peritem').appendChild(icon);

                    
                }
            }
        })
    }

    var secondPageChoice = function(){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword2",
                "field1":"pagecode",
                "value1":pageCode,
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
                thirdData = JSON.parse(response);
                editThirdContent();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload Page')
                location.reload();
            },
            async: false
        })
    }

    var editThirdContent = function(){
        $.each(thirdData, function(key, value){
            if(key == 'methodResponse'){
                firstContent = value.queryList[0].content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.queryList[0].header;
                console.log(firstPageHeader);
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header third-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item" +i);
                    input.setAttribute("class","col-md-11 item-choice third-choice")
                    input.setAttribute("value", firstArray[i]);
                    icon = document.createElement("I");
                    icon.setAttribute("class", "col-md-1 fa fa-arrow-circle-right third-arrow");
                    icon.setAttribute("id", i);
                    icon.setAttribute("data-toggle", "tooltip");
                    icon.setAttribute("data-placement", "top");
                    icon.setAttribute("title","Click to edit the contents of this menu");
                    console.log(icon.id);
                    getIconId.push(icon.id);
                    document.getElementById('peritem').appendChild(input);
                    document.getElementById('peritem').appendChild(icon);
                    tempContainer = document.getElementById('peritem').appendChild(input);
                    tempCrack = document.getElementById('peritem').appendChild(icon);
                }
            }
        })
    };

    var thirdPageChoice = function(){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword2",
                "field1":"pagecode",
                "value1":pageCode3,
                "operator":"AND",
                "field2":"actualKeyword",
                "value2": keyWord3
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
                fourthData = JSON.parse(response);
                editFourthContent();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload Page')
                location.reload();
            },
            async: false
        })
    }

    var editFourthContent = function(){
        $.each(fourthData, function(key, value){
            if(key == 'methodResponse'){
                firstContent = value.queryList[0].content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.queryList[0].header;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header fourth-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item" +i);
                    input.setAttribute("class","col-md-11 item-choice fourth-choice")
                    input.setAttribute("value", firstArray[i]);
                    icon = document.createElement("I");
                    icon.setAttribute("class", "col-md-1 fa fa-arrow-circle-right fourth-arrow");
                    icon.setAttribute("id", i);
                    icon.setAttribute("data-toggle", "tooltip");
                    icon.setAttribute("data-placement", "top");
                    icon.setAttribute("title","Click to edit the contents of this menu");
                    console.log(icon.id);
                    getIconId.push(icon.id);
                    document.getElementById('peritem').appendChild(input);
                    document.getElementById('peritem').appendChild(icon);
                    tempContainer = document.getElementById('peritem').appendChild(input);
                    tempCrack = document.getElementById('peritem').appendChild(icon);
                }
            }
        })
    };

    var fourthPageChoice = function(){
        var dataToPass = {
            "method":"searchTwoField",
            "data":{
                "table":"keyword2",
                "field1":"pagecode",
                "value1":pageCode4,
                "operator":"AND",
                "field2":"actualKeyword",
                "value2": keyWord4
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
                fifthData = JSON.parse(response);
                editFiveContent();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload Page')
                location.reload();
            },
            async: false
        })
    }

    var editFiveContent = function(){
        $.each(fifthData, function(key, value){
            if(key == 'methodResponse'){
                firstContent = value.queryList[0].content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.queryList[0].header;
                textarea = document.createElement("textarea");
                taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header fifth-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContent').appendChild(textarea);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item" +i);
                    input.setAttribute("class","col-md-11 item-choice fifth-choice")
                    input.setAttribute("value", firstArray[i]);
                    icon = document.createElement("I");
                    icon.setAttribute("class", "col-md-1 fa fa-arrow-circle-right fifth-arrow");
                    icon.setAttribute("id", i);
                    icon.setAttribute("data-toggle", "tooltip");
                    icon.setAttribute("data-placement", "top");
                    icon.setAttribute("title","Click to edit the contents of this menu");
                    console.log(icon.id);
                    getIconId.push(icon.id);
                    document.getElementById('peritem').appendChild(input);
                    document.getElementById('peritem').appendChild(icon);
                }
            }
        })
    };

    var updateFirstMenu = function(){
        var dataToPass = {
            "method":"update",
                "data":{
                    "table":"keyword",
                    "returnID":componentID,
                    "fieldName":"mainkeyword",
                    "header":firstHeader,
                    "content":contentContainer
                }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data : JSON.stringify(dataToPass),
            beforesend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success: function(response){
                firstUpdate = JSON.parse(response);
                console.log(firstUpdate);
            },
            error: function(textStatus){
                alert('Network connection error');
                location.reload();
            }
        })
    }

    var convertInputResults = function(){
        arrayOne = $("input:visible[type='text']").map(function() {
            return this.value;
        }).get();
        console.log(arrayOne);
        arrayFirst = arrayOne.join();
        arrayFirstResult = arrayFirst.split(') ').join('_');
        arrayFirstResultFinal = arrayFirstResult.split(',').join('|');
        console.log(arrayFirstResultFinal);
    }
    

    var hideFirst = function (){
        $('.first-choice').hide();
        $('.first-arrow').hide();
        $('.first-header').hide();
    }
    var hideSecond = function(){
        $('.second-choice').hide();
        $('.second-arrow').hide();
        $('.second-header').hide();     
    }
    var hideThird = function(){
        $('.third-choice').hide();
        $('.third-arrow').hide();
        $('.third-header').hide();     
    }
    var hideFourth = function(){
        $('.fourth-choice').hide();
        $('.fourth-arrow').hide();
        $('.fourth-header').hide();     
    }
    var showFirst = function(){
        $('.first-choice').show();
        $('.first-arrow').show();
        $('.first-header').show();   
    }
    var showSecond = function(){
        $('.second-choice').show();
        $('.second-arrow').show();
        $('.second-header').show();   
    }
    var showThird = function(){
        $('.third-choice').show();
        $('.third-arrow').show();
        $('.third-header').show();   
    }
    var showFourth = function(){
        $('.fourth-choice').show();
        $('.fourth-arrow').show();
        $('.fourth-header').show();   
    }
    
    var addSecondClass = function(){
        $('#prev-content').addClass('secondLevel');
        $('#prev-content').removeClass('firstLevel');
    }
    var addThirdClass = function (){
        $('#prev-content').addClass('thirdLevel');
        $('#prev-content').removeClass('secondLevel')
    }
    var addFourthClass = function (){
        $('#prev-content').addClass('fourthLevel');
        $('#prev-content').removeClass('thirdLevel')
    }

    var removeSecondClass = function(){
        $('#prev-content').addClass('firstLevel');
        $('#prev-content').removeClass('secondLevel');
    }
    var removeThirdClass = function(){
        $('#prev-content').addClass('secondLevel');
        $('#prev-content').removeClass('thirdLevel');
    }
    var removeFourthClass = function(){
        $('#prev-content').addClass('thirdLevel');
        $('#prev-content').removeClass('fourthLevel');
    }

    var removeArrow = function(){
        $("#peritem i:visible:first").hide();
        $("#peritem i:visible:last").hide();
    }

    var removeBack = function(){
        $("#peritem i:last").hide();
    }

    $('.first-arrow').click(function(){
        if($( '.lds-spinner' ).is(":hidden")){
            $( '.lds-spinner' ).show();
       }    
        btnIndex =  $('.first-arrow').index(this);
        console.log(btnIndex);
        if(btnIndex == 0){
            btnIndex = 1;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').delay(5000).hide();
            if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                removeArrow();
            }
            
        }
        else if(btnIndex == 1){
            btnIndex = 2;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').delay(2000).hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex ==2){
            btnIndex = 3;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex == 3){
            btnIndex = 4;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex == 4){
            btnIndex = 5;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();;
            }
        }
        else if(btnIndex == 5){
            btnIndex = 6;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex == 6){
            btnIndex = 7;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex == 7){
            btnIndex = 8;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        else if(btnIndex == 8){
            btnIndex = 9;
            console.log(btnIndex);
            hideFirst();
            addSecondClass();
            firstChoice();
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        
        $(".second-arrow").click(function(){
            console.log('2nd arrow click')
            var btnIndex2 = $('.second-arrow').index(this);
            console.log(btnIndex2);
            if(btnIndex2 == 0){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
                
            }
            else if(btnIndex2 == 1){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 2){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 3){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 4){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 5){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 6){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 7){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            else if(btnIndex2 == 8){
                btnIndex2 = btnIndex2 + 1;
                console.log(btnIndex2);
                keyWord = actualMkeyword+btnIndex2;
                pageCode = btnIndex2;
                console.log(keyword);
                hideSecond();
                addThirdClass();
                secondPageChoice();
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }

            $(".third-arrow").click(function(){
                console.log('3rd arrow click')
                var btnIndex3 = $('.third-arrow').index(this);
                console.log(btnIndex3);
                if(btnIndex3 == 0){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                    
                }
                else if(btnIndex3 == 1){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 2){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 3){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 4){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 5){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 6){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 7){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex2 == 8){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
            });


        });
    });


    $('#prev-content').click(function(){
        if($('#prev-content').hasClass('secondLevel')){
            hideSecond();
            showFirst();
            removeSecondClass();
        }
        else if($('#prev-content').hasClass('thirdLevel')){
            hideThird();
            showSecond();
            removeThirdClass();
        }
        else if($('#prev-content').hasClass('fourthLevel')){
            hideFourth();
            showThird();
            removeThirdClass();
        }
    })

    $('input:text').keypress(function(e){
        enableSaveBtn();
    });
    $('input:visible:text').keyup(function(e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            enableSaveBtn();
        } else {
            e.preventDefault();
        }
    });
    
    $('input:visible:text').bind('paste', function(e) { 
        enableSaveBtn();
    });


    var enableSaveBtn = function(){
        $('.save').prop('disabled',false);
    }
    var disableSaveBtn = function(){
        $('.save').prop('disabled',true);
    } 

    $('.save').click(function(){
        convertInputResults();
    });

})
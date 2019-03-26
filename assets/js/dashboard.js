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
var componentID="";
var secondComponentID="";
var contentID;
var secondContentID;
var thirdContentID;
var firstHeader="";
var arrayOne={};
var arrayTwo={};
var contentTitle;


var gettabval = function(){
    var test = document.getElementById("thirdTab");
    testVal = test.value;
    console.log(testVal);
}

$(function (){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });

    mainmenu = document.createElement("span");
    mainmenutext = document.createTextNode("Main Menu");
    mainmenu.setAttribute("class","bread");
    mainmenu.appendChild(mainmenutext);
    document.getElementById('breadcrumb-entry').appendChild(mainmenu);

    var loopFirstContent = function(){
        $.each(parseJson, function(key, value){
            if(key == 'methodResponse'){
                componentID = value.returnID;
                if(componentID == undefined){
                    componentID = 0;
                }
                contentID = componentID.toString();
                console.log(contentID)
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
                    "returnID":"121"
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
                editSecondContent();
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
                contentTitle = value.actualkeyword;
                console.log(firstPageHeader);
                actualMkeyword = value.actualkeyword;
                secondComponentID = value.returnID;
                secondContentID = secondComponentID.toString();
                console.log(secondContentID);
                var h4keyword = document.createElement("h4");
                var keywordMatch = document.createTextNode("Promo Keyword");
                h4keyword.setAttribute("class", "keyword-main");
                h4keyword.appendChild(keywordMatch);
                document.getElementById('textKeyword').appendChild(h4keyword);
                var inputKeyword = document.createElement("input");
                inputKeyword.setAttribute("type","text");
                inputKeyword.setAttribute("class","keyword");
                inputKeyword.setAttribute("value", actualMkeyword);
                document.getElementById("keyword").appendChild(inputKeyword);
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
                console.log(value)
                firstContent = value.queryList[0].content.split('_').join(') ');
                firstArray = firstContent.split('|');
                firstPageHeader = value.queryList[0].header;
                thirdContentID = value.queryList[0].id;
                thirdContentTitle = value.queryList[0].actualkeyword;
                console.log(thirdContentID);
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
                fourthContentTitle = value.queryList[0].actualkeyword;
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

    
    
    var convertFirstInput = function(){
        firstHeader = $("textarea:visible").val();
        console.log(firstHeader);
        arrayOne = $("input:visible[type='text']").map(function() {
            return this.value;
        }).get();
        console.log(arrayOne);
        arrayFirst = arrayOne.join('|');
        arrayFirstResult = arrayFirst.split(') ').join('_');
        contentResult = arrayFirstResult;
        console.log(contentResult);
    }
    console.log(firstHeader);

    var updateFirstMenu = function(){
        var dataToPass = {
            "method":"update",
            "data":{
                "table":"keyword",
                "returnID":contentID,
                "fieldName":"id",
                "header":firstHeader,
                "content":contentResult
            }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data : JSON.stringify(dataToPass),
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success: function(response){
                parseOne = JSON.parse(response);
                console.log(parseOne);
                alert('Successfully updated!')
            },
            error: function(textStatus){
                alert('Network connection error');
                location.reload();
            }
        })
    }

    var convertInputResults = function(){
        secondHeaderMenu = $("textarea:visible").val();
        console.log(secondHeaderMenu);
        arrayTwo = $("input:visible[type='text']").map(function() {
            return this.value;
        }).get();
        console.log(arrayTwo);
        arraySecond = arrayTwo.join('|');
        arraySecondResult = arraySecond.split(') ').join('_');
        secondContentResult = arraySecondResult;
        console.log(secondContentResult);
    }

    var updateSecondMenu = function(){
        var dataToPass = {
            "method":"update",
                "data":{
                    "table":"keyword",
                    "returnID":secondContentID,
                    "fieldName":"id",
                    "header":secondHeaderMenu,
                    "content":secondContentResult
                }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data : JSON.stringify(dataToPass),
            cache:false,
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success: function(response){
                parseTwo = JSON.parse(response);
                console.log(parseTwo);
                alert('Successfully updated!');
            },
            error: function(textStatus){
                alert('Network connection error');
                location.reload();
            }
        })
    }

    var convertThirdInputResults = function(){
        thirdHeaderMenu = $("textarea:visible").val();
        console.log(thirdHeaderMenu);
        arrayTwo = $("input:visible[type='text']").map(function() {
            return this.value;
        }).get();
        console.log(arrayTwo);
        arraySecond = arrayTwo.join('|');
        arraySecondResult = arraySecond.split(') ').join('_');
        thirdContentResult = arraySecondResult;
        console.log(thirdContentResult);
    }

    var updateThirdMenu = function(){
        var dataToPass = {
            "method":"update",
                "data":{
                    "table":"keyword2",
                    "returnID":thirdContentID,
                    "fieldName":"id",
                    "header":thirdHeaderMenu,
                    "content":thirdContentResult
                }
        }
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType: "json",
            data : JSON.stringify(dataToPass),
            cache:false,
            beforeSend: function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
            },
            success: function(response){
                parseThree = JSON.parse(response);
                console.log(parseThree);
                alert('Successfully updated!');
            },
            error: function(textStatus){
                alert('Network connection error');
                location.reload();
            }
        })
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
    var hideFifth = function(){
        $('.fifth-choice').hide();
        $('.fifth-arrow').hide();
        $('.fifth-header').hide();     
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
        $('#prev-content').show();
        $('#prev-content').addClass('secondLevel');
        $('#prev-content').removeClass('firstLevel');
        $('#save-button').addClass('second-button');
        $('#save-button').removeClass('first-button');
    }
    var addThirdClass = function (){
        $('#prev-content').addClass('thirdLevel');
        $('#prev-content').removeClass('secondLevel');
        $('#save-button').addClass('third-button');
        $('#save-button').removeClass('second-button');
    }
    var addFourthClass = function (){
        $('#prev-content').addClass('fourthLevel');
        $('#prev-content').removeClass('thirdLevel');
        $('#save-button').addClass('fourth-button');
        $('#save-button').removeClass('third-button');
    }

    var removeSecondClass = function(){
        $('#prev-content').addClass('firstLevel');
        $('#prev-content').removeClass('secondLevel');
        $('#prev-content').addClass('first-button');
        $('#prev-content').removeClass('second-button');
    }
    var removeThirdClass = function(){
        $('#prev-content').addClass('secondLevel');
        $('#prev-content').removeClass('thirdLevel');
        $('#prev-content').addClass('second-button');
        $('#prev-content').removeClass('third-button');
        
    }
    var removeFourthClass = function(){
        $('#prev-content').addClass('thirdLevel');
        $('#prev-content').removeClass('fourthLevel');
        $('#prev-content').addClass('third-button');
        $('#prev-content').removeClass('fourth-button');
    }
    var removeFifthClass = function(){
        $('#prev-content').addClass('thirdLevel');
        $('#prev-content').removeClass('fourthLevel');
        $('#prev-content').addClass('third-button');
        $('#prev-content').removeClass('fourth-button');
    }

    var removeArrow = function(){
        $("#peritem i:visible:first").hide();
        $("#peritem i:visible:last").hide();
    }

    var removeBack = function(){
        $("#peritem i:last").hide();
    }

    var checkInput = function(){
        $("input:visible").filter(function () {
            return $.trim($(this).val()).length == 0
        }).length == 0;
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1)
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1)
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1)
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
            breadcrumb = document.createElement("span");
            breadcrumb.setAttribute("class","bread2");
            bread1 = document.createTextNode( ' | ' + contentTitle);
            breadcrumb.appendChild(bread1);
            document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
            $('.lds-spinner').hide();
            if( $("#peritem input:last").val() == "0) Back"){
                removeBack();
            }
        }
        onChangeBtn();
        convertInputResults();
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
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
                breadcrumb = document.createElement("span");
                breadcrumb.setAttribute("class","bread3");
                bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                breadcrumb.appendChild(bread1);
                document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                    removeArrow();
                }
            }
            onChangeBtn();
            convertThirdInputResults();
            $(".third-arrow").click(function(){
                console.log('3rd arrow click')
                var btnIndex3 = $('.third-arrow').index(this);
                console.log(btnIndex3);
                if(btnIndex3 == 0){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyword3);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                    
                }
                else if(btnIndex3 == 1){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyWord3);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 2){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyWord3);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 3){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    console.log(keyWord3);
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 4){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 5){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 6){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 7){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex3 == 8){
                    btnIndex3 = btnIndex3 + 1;
                    console.log(btnIndex3);
                    keyWord3 = keyWord+btnIndex3;
                    pageCode3 = btnIndex3;
                    hideThird();
                    addFourthClass();
                    thirdPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread4");
                    bread1 = document.createTextNode( ' | ' + fourthContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                onChangeBtn();
                
            });
            $(".fourth-arrow").click(function(){
                console.log('4th arrow click')
                var btnIndex4 = $('.fourth-arrow').index(this);
                console.log(btnIndex4);
                if(btnIndex4 == 0){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyWord4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyword4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                    
                }
                else if(btnIndex4 == 1){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 2){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 3){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 4){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 5){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 6){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 7){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                else if(btnIndex4 == 8){
                    btnIndex4 = btnIndex4 + 1;
                    console.log(btnIndex4);
                    keyword4 = keyWord3+btnIndex4;
                    pageCode4 = btnIndex4;
                    console.log(keyWord4);
                    hideFourth();
                    addFifthClass();
                    fourthPageChoice();
                    breadcrumb = document.createElement("span");
                    breadcrumb.setAttribute("class","bread5");
                    bread1 = document.createTextNode( ' | ' + thirdContentTitle);
                    breadcrumb.appendChild(bread1);
                    document.getElementById('breadcrumb-entry').appendChild(breadcrumb);
                    if( $("#peritem input:last").val() == "0) Back" || $("#peritem input:visible").val() == "1) Subscribe"  ){
                        removeArrow();
                    }
                }
                onChangeBtn();
                
            });


        });
    });


    $('#prev-content').click(function(){
        if($('#prev-content').hasClass('secondLevel')){
            hideSecond();
            showFirst();
            removeSecondClass();
            $('.bread2').remove();
        }
        else if($('#prev-content').hasClass('thirdLevel')){
            hideThird();
            showSecond();
            removeThirdClass();
            $('.bread3').remove();
        }
        else if($('#prev-content').hasClass('fourthLevel')){
            hideFourth();
            showThird();
            removeFourthClass();
            $('.bread4').remove();
        }
        else if($('#prev-content').hasClass('fifthLevel')){
            hideFifth();
            showFourth();
            removeFifthClass();
            $('.bread5').remove();
        }
    })

    var onChangeBtn = function(){
        $('input:visible').keypress(function(e){
            enableSaveBtn();
        });
        $('input:visible').keyup(function(e) {
            if (e.keyCode == 8 || e.keyCode == 46) {
                enableSaveBtn();
            } else {
                e.preventDefault();
            }
        });
        
        $('input:visible').bind('paste', function(e) { 
            enableSaveBtn();
        });
        $('textarea:visible').keypress(function(e){
            enableSaveBtn();
        });
        $('textarea:visible').keyup(function(e) {
            if (e.keyCode == 8 || e.keyCode == 46) {
                enableSaveBtn();
            } else {
                e.preventDefault();
            }
        });
        $('textarea:visible').bind('paste', function(e) { 
            enableSaveBtn();
        });
        var enableSaveBtn = function(){
            $('.save').prop('disabled',false);
        }
        var disableSaveBtn = function(){
            $('.save').prop('disabled',true);
        }
    }

    onChangeBtn();
     

    $('#save-button').click(function(e){
        if($('#save-button').hasClass('first-button')){
            var isValid = true;
            $('input[type="text"]:visible').each(function() {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });
            if (isValid == false) 
                e.preventDefault();
            else {
                convertFirstInput();   
                updateFirstMenu();
                alert('Thank you for submitting');
            }
            
            
        }
        else if($('#save-button').hasClass('second-button')){
            var isValid = true;
            $('input[type="text"]:visible').each(function() {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });
            if (isValid == false) 
                e.preventDefault();
            else {
                convertInputResults();
                updateSecondMenu();
                alert('Thank you for submitting');
            }
            
        }
        else if($('#save-button').hasClass('third-button')){
            var isValid = true;
            $('input[type="text"]:visible').each(function() {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });
            if (isValid == false) 
                e.preventDefault();
            else {
                convertThirdInputResults();
                updateThirdMenu();
                alert('Thank you for submitting');
            }
            
        }
    });

})
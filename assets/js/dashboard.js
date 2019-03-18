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
var max_fields = 9;
var secondHeader="";
var secondKeyword="";
var secondPageContent="";


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
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    // for ( a = 0; a < i.length; a++){
                    //     var remove = document.createElement("BUTTON");
                    //     remove.setAttribute("id", "btnRemove");
                    //     remove.setAttribute("value","Remove");
                    //     document.getElementById('peritem').appendChild(remove);
                    //     document.getElementById("btnRemove").innerText = "Remove";
                    // }
                    
                    
                    // console.log(remove);
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

    var loopMenuOne = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuOne, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentOne').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagOne').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuOne').appendChild(input);
                }
            }
        })
    }

    var getMenuOne = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"1"
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
                menuOne = JSON.parse(response);
                console.log(menuOne);
                loopMenuOne();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuOne();

    var loopMenuTwo = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuTwo, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentTwo').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagTwo').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuTwo').appendChild(input);
                }
            }
        })
    }

    var getMenuTwo = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"2"
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
                menuTwo = JSON.parse(response);
                console.log(menuTwo);
                loopMenuTwo();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuTwo();

    var loopMenuThree = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuThree, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentThree').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagThree').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuThree').appendChild(input);
                }
            }
        })
    }

    var getMenuThree = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"3"
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
                menuThree = JSON.parse(response);
                console.log(menuThree);
                loopMenuThree();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuThree();

    var loopMenuFour = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuFour, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentFour').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagFour').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuFour').appendChild(input);
                }
            }
        })
    }

    var getMenuFour = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"4"
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
                menuFour = JSON.parse(response);
                loopMenuFour();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuFour();

    var loopMenuFive = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuFive, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentFive').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagFive').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuFive').appendChild(input);
                }
            }
        })
    }

    var getMenuFive = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"5"
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
                menuFive = JSON.parse(response);
                loopMenuFive();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuFive();

    var loopMenuSix = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuSix, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentSix').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagSix').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuSix').appendChild(input);
                }
            }
        })
    }

    var getMenuSix = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"6"
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
                menuSix = JSON.parse(response);
                loopMenuSix();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuSix();

    var loopMenuSeven = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuSeven, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentSeven').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagSeven').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuSeven').appendChild(input);
                }
            }
        })
    }

    var getMenuSeven = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"7"
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
                menuSeven = JSON.parse(response);
                loopMenuSeven();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuSeven();

    var loopMenuEight = function(){
        var list = document.getElementById("inputContainer");
        $.each(menuEight, function(key, value){
            if(key == 'methodResponse'){
                var firstContent = value.content.split('_').join(') ');
                var firstArray = firstContent.split('|');
                var firstPageHeader = value.header;
                console.log(firstPageHeader);
                console.log(value.actualkeyword)
                var textarea = document.createElement("textarea");
                var taContent = document.createTextNode(firstPageHeader);
                textarea.setAttribute("type", "text");
                textarea.setAttribute("class", "menu-header");
                textarea.appendChild(taContent);
                document.getElementById('headerContentEight').appendChild(textarea);
                var menuTag = document.createElement("h5");
                var menuTagContent = document.createTextNode(value.actualkeyword);
                menuTag.appendChild(menuTagContent);
                menuTag.setAttribute("class","menuTitle");
                document.getElementById('menuTagEight').appendChild(menuTag);
                for (i = 0; i < firstArray.length; i++){
                    console.log(firstArray[i]);
                    var input = document.createElement("INPUT");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", "menu-item");
                    input.setAttribute("value", firstArray[i]);
                    document.getElementById('menuEight').appendChild(input);
                }
            }
        })
    }

    var getMenuEight = function(){
        var dataToPass = {
            "method":"select",
                "data":{
                    "table":"keyword",
                    "returnID":"8"
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
                menuEight = JSON.parse(response);
                loopMenuEight();

            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        });
    }
    getMenuEight();

    /*var loopSecondContentOne = function(){
        $.each(allPageTwoData, function(key, value){
            if(key == 'methodResponse'){
                for( i = 0; i < value.queryList.length; i++){
                    console.log(value.queryList[i]);
                    if(value.queryList[0]){
                        firstSecondPage = value.queryList[i].content.split('_').join(') ');
                        arrayFirstSecondPage = firstSecondPage.split('|');
                        console.log(arrayFirstSecondPage);
                        allSecondContents.push(arrayFirstSecondPage);
                        
                        allSecondHeader = value.queryList[i].header;
                        allActutalKeyword = value.queryList[i].actualkeyword;
                        console.log(allActutalKeyword);
                    }
                    
                    arrayActualKeyword.push(allActutalKeyword);
                    console.log(arrayActualKeyword);
                    arraySecondHeader.push(allSecondHeader);
                    console.log(arraySecondHeader);
                    
                }
    
                for(a=0;a < arraySecondHeader.length; a++){
                    console.log(arraySecondHeader[a]);
                    headerArray.push(arraySecondHeader[a]);
                    var header = document.createElement("textarea");
                    var headerContent = document.createTextNode(arraySecondHeader[a])
                    header.setAttribute("id", "secondHeader");
                    header.setAttribute("value", arraySecondHeader[a]);
                    header.appendChild(headerContent)
                    secondHeader = document.getElementById('headerContent3').appendChild(header);
                }
                
                console.log(headerArray);
                for(b=0; b < arrayActualKeyword.length; b++){
                    keywordArray.push(arrayActualKeyword[b]);
                    var keyword = document.createElement("h4");
                    var keywordContent = document.createTextNode(arrayActualKeyword[b])
                    keyword.setAttribute("id", "Keyword");
                    keyword.appendChild(keywordContent);
                    secondKeyword = document.getElementById('headerContent2').appendChild(keyword);
                }
                
                console.log(keywordArray);
                console.log(allSecondContents);
                if(allSecondContents[0]){
                    allZero = allSecondContents[0];
                    console.log(allZero);
                    for(d=0; d < allZero.length; d++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[d]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[1]){
                    allZero = allSecondContents[1];
                    console.log(allZero);
                    for(e=0; e < allZero.length; e++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[e]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[2]){
                    allZero = allSecondContents[2];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[3]){
                    allZero = allSecondContents[3];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[4]){
                    allZero = allSecondContents[4];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[5]){
                    allZero = allSecondContents[5];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[6]){
                    allZero = allSecondContents[6];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[7]){
                    allZero = allSecondContents[7];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }
                if(allSecondContents[8]){
                    allZero = allSecondContents[8];
                    console.log(allZero);
                    for(i=0; i < allZero.length; i++){
                        var input = document.createElement("INPUT");
                        input.setAttribute("type", "text");
                        input.setAttribute("id", "oneChoice");
                        input.setAttribute("value", allZero[i]);
                        document.getElementById('secondperitem').appendChild(input);
                    }
                }

            }
            
            Array.prototype.push.apply(keywordArray,headerArray)
            console.log(keywordArray);
            var xy,xz = Math.min(keywordArray.length, headerArray.length);
            for( xy = 0; xy < xz; xy++){
                mixContainer.push(keywordArray[xy],headerArray[xy]);
            }
            mixContainer.push(...keywordArray.slice(1),...headerArray.slice(1));
            console.log(mixContainer);

            var yx, yz = Math.min(mixContainer.length, allSecondContents.length);
            for( yx=0; yx < yz; yx++){
                threeMixContainer.push(mixContainer[yx],allSecondContents[yx]);
            }
            threeMixContainer.push(...mixContainer.slice(1),...allSecondContents.slice(1));
            console.log(threeMixContainer); //Up to 16 index only
        })
        
    }

    

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
                loopSecondContentOne();
            },
            error: function(textStatus,errorThrown){
                alert('Network connection error, Reload page');
                location.reload();
            },
            async: false
        })
    }

    getSecondMenu(); */



})
var gBaseUrl = '/';

function byteSize(bytes) {
    var marker = 1024; // Change to 1000 if required
    var decimal = 2; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
    var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

    // return bytes if less than a KB
    if (bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return (bytes / gigaBytes).toFixed(decimal) + " GB";
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

var ClassSettingApp = {
}

ClassSettingApp.init = function () {

}

var ClassUI = {

}

// ClassUI = function () {
//
// }

var ClassRoute = {
    module : "",
    controller : "index",
    action : "index",
    currentUriFull : "",
    arrParams : {},
}

ClassRoute.paramLoaded = function () {
    if(ClassRoute.module.length > 0)
        return 1;
    return 0;
}

ClassRoute.getCurrentModule = function(uri){
    uri = uri.replace(gBaseUrl, "");
    var ret = uri.split('/');
    console.log(" getCurrentModule ret " + ret + " uri = " + uri);
    return ret[0];
}

ClassRoute.getUriFull = function(){

    var urlFull = location.href;
    if(location.port){
        var ret = location.href.split(location.hostname + ":" + location.port + "/");
    }
    else
        var ret = location.href.split(location.hostname + "/");

    return ret[1];
}

ClassRoute.getParams = function(uri){

    uri = ClassRoute.getUriFull();

    //var uri = uri.split(location.hostname + gBaseUrl, "");
    //uri = uri[2];

    // console.log(" gBaseUrl =  " + gBaseUrl);
    // console.log(" uri =  " + uri);

    var uri0= uri;
    var uri1 = "";
    if(uri.indexOf("?") >=0){
        var arr = uri.split("?");
        uri0 = arr[0];
        uri1 = arr[1];
    }


    var ret = uri0.split('/');
   // console.log(" getParams ret " + ret + " uri = " + uri);
    if(ret[0])
        ClassRoute.module = ret[0];
    if(ret[1])
        ClassRoute.controller = ret[1];
    if(ret[2])
        ClassRoute.action = ret[2];

    if(ret.length > 3){
        for(var i = 3; i < ret.length; i+=2){
            if(ret[i + 1]){

                //console.log(" ret " + i + " / " + ret[i])
               // console.log(" ret " + (i + 1) + " / " + ret[i + 1])
                //var myObj = {[ret[i]] : ret[i + 1]};

                //console.log(" ret " + JSON.stringify(myObj));

                ClassRoute.arrParams[ret[i]] = ret[i+1];

                //ClassRoute.arrParams.push( myObj );
            }
        }
    }

 //   console.log(" uri1 = " + uri1);
    if(uri1.length > 0){
        var ret = uri1.split('&');
        for(var i = 0; i < ret.length; i++){
            var parami = ret[i].split("=");
            ClassRoute.arrParams[parami[0]] = parami[1];
        }
    }

    console.log(" ARRPARAM = " + JSON.stringify(ClassRoute.arrParams));


}

ClassRoute.changeUriWithPageNumberNotReLoadPage = function(pageNumber, uri){

    var uri1;
    var curentUri = ClassRoute.currentUriFull;


    if(curentUri.indexOf("/page/") >=0) {
        uri1 = curentUri.replace(/page\/(\d+)/, "page/" + pageNumber);
    }
    else {
        uri1 = "/" + ClassRoute.module + "/" + ClassRoute.controller + "/" + ClassRoute.action + "/page/" + pageNumber;
        for(var k in ClassRoute.arrParams){
            uri1+="/" + k + "/" + ClassRoute.arrParams[k];
        }
        if (curentUri && curentUri.indexOf("?") >= 0) {
            var arr = curentUri.split('?');
            if (arr && arr.length > 1) {
                uri1 += "?" + arr[1];
            }
        }
    }


    history.pushState(null, null, uri1);
}

ClassRoute.changeUriTreeNotReLoadPage = function(newFolder){

    var uri1;
    var curentUri = ClassRoute.currentUriFull;
    uri1 = "/" + ClassRoute.module + "/" + ClassRoute.controller + "/" + ClassRoute.action + "/folder/" + newFolder;
    //history.pushState(null, null, uri1);
    setTimeout(function () {
        history.pushState(null, null, uri1);
    },500);

}


ClassRoute.changePageNumberInUrl = function(url, newPage){
    if(url.indexOf("/page/") >=0) {
        return url.replace(/page\/(\d+)/, "page/" + newPage);
    }
    return url;
}

function ClassApi(){

    if(!ClassApi.checkValidReturnApiObj(obj))
    {
        alert("ClassApi: Not valid obj?");
        return;
    }

    var errorNumber = obj.errorNumber;
    var payload = obj.payload;
}

ClassApi.isLogined = function(){
    return ClassApi.getTokenGlx();
}

ClassApi.getCurrentUsername = function(){
    var currentUserStr = readCookie("currentUser");
    if(!currentUserStr)
        return null;
    var currentUserStr = ClassString.convertFromHex(currentUserStr);
    try{
        var currentUser = JSON.parse(currentUserStr);
    } catch(e) {
        alert("Error getCurrentUsername: " + e);
        return;
    }
    return currentUser.username;
}

ClassApi.getCurrentUserIdRand = function(){
    var currentUserStr = readCookie("currentUser");
    if(!currentUserStr)
        return null;
    var currentUserStr = ClassString.convertFromHex(currentUserStr);
    try{
        var currentUser = JSON.parse(currentUserStr);
    } catch(e) {
        alert("Error getCurrentUsername: " + e);
        return;
    }
    return currentUser.uidrand;
}

ClassApi.getTokenGlx = function(){
    //2022, bỏ angular
    return null;

    //2022- Mo lai de tai nhac
    var currentUserStr = readCookie("currentUser");
    if(!currentUserStr)
        return null;

    //2022: Format token da thay doi, return luon, ko Decode nua
    return currentUserStr;


    var currentUserStr = ClassString.convertFromHex(currentUserStr);
    console.log("CUSER: " + currentUserStr);

    try{
        var currentUser = JSON.parse(currentUserStr);
    } catch(e) {
        alert("Error getTokenGlx: " + e);
        return;
    }

    return currentUser.token;

}

ClassApi.setTokenGlx = function($currentUser){
    //$.cookie("currentUser", $currentUser, { expires: 30 });

    var currentUserHex = ClassString.convertToHex($currentUser);
    createCookie("currentUser", currentUserHex, 30 );

    return;
   // $localStorage.currentUser = $currentUser;
}
ClassApi.deleteTokenGlx = function(){
    eraseCookie("currentUser");
    return;
    //$localStorage.currentUser = $currentUser;
   // delete $localStorage.currentUser;
}

ClassApi.checkValidReturnApiObj= function(obj){

    if(!obj.hasOwnProperty("errorNumber"))
        return false;
    if(!obj.hasOwnProperty("payload"))
        return false;

    return true;
}

ClassApi.checkReturnApi = function(data, url){

    if(!ClassApi.checkValidReturnApiObj(data))
    {

        if($('#commonDialog').length){
            var str = JSON.stringify(data);
            if(url){
                str = "<a target='_blank' style='color: gray' href='" + url + "'> LINK API </a><br/>" + str;
            }

            str = str.replace(/(?:\r\n|\r|\n|\\n)/g, '<br/>');
            $("#commonDialog").modal("show");
            $("#commonDialogTitle").html("Có lỗi API: dữ liệu sai format (checkApi): ");
            $("#commonDialogContent").html(str);
        }
        else{
            var url1 = '';
            if(url)
                url1 = url;
            alert("Có lỗi API: dữ liệu sai format:\r\n" + JSON.stringify(data) + '\r\n' + url1);
        }
        return false;
    }

    var ret = data;
    if(ret.errorNumber != 0){

        if($('#commonDialog').length) {
            ret.payloadEx = ret.payloadEx.replace(/(?:\r\n|\r|\n|\\n)/g, '<br/>');
            ret.payload = ret.payload.replace(/(?:\r\n|\r|\n|\\n)/g, '<br/>');
            $("#commonDialog").modal("show");
            $("#commonDialogTitle").html("ErrorApi: ");
            if(typeof ret.payloadEx!= 'undefined' && ret.payloadEx)
                $("#commonDialogContent").html(ret.payload + '<br/>' + "<span onclick=show_detail_error_str_glx()>[-]</span> <span id='_detail_error_str_glx' style='font-size: smaller; display: none'>" + ret.payloadEx + "</span>");
            else
                $("#commonDialogContent").html(ret.payload);

        }
        else{
            alert("ErrorApi: " + ret.payload + '\n' + ret.payloadEx);
        }

        return false;
    }
    return true;
}

function show_detail_error_str_glx() {
    $('#_detail_error_str_glx').toggle();
}

//Get to show Menu Role on Top admin
ClassApi.getGroupExtraList = function(){

    //May be not need if resolve with PHP:
    return;

    $.get(gBaseUrl + "a_p_i/member/get-gid-extra", function(data){
        if(!ClassApi.checkReturnApi(data))
        {
            return;
        }
        sessionStorage.setItem('gidExtra', JSON.stringify(data.payload));
    });

    return true;
}

//Để khi login/logout, mọi API đều cập nhật ngay, nếu gọi hàm này trước. nếu ko gọi hàm này thì refresh trang cũng sẽ update
ClassApi.setTokenBeforeCallApi = function($http){

    //2022, bỏ angular
    return null;
    //if ($localStorage.currentUser) {

    //    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    if(ClassApi.getTokenGlx()){
        $http.defaults.headers.common.Authorization = 'Bearer ' + ClassApi.getTokenGlx();
        //console.log("Authorization =  " + 'Bearer ' + ClassApi.getTokenGlx());
    }
    else {
        $http.defaults.headers.common.Authorization = '';
    }
}


ClassString = function () {
}

ClassString.convertFromHex = function (hex) {
    var hex = hex.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

ClassString.convertToHex = function(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

ClassString.replaceBetween = function(str, start, end, replaceBy){
    //var pos =
}

ClassString.insertAfter = function(str, start, insertString){

}

var DOCSO=function(){var t=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"],r=function(r,n){var o="",a=Math.floor(r/10),e=r%10;return a>1?(o=" "+t[a]+" mươi",1==e&&(o+=" mốt")):1==a?(o=" mười",1==e&&(o+=" một")):n&&e>0&&(o=" lẻ"),5==e&&a>=1?o+=" lăm":4==e&&a>=1?o+=" tư":(e>1||1==e&&0==a)&&(o+=" "+t[e]),o},n=function(n,o){var a="",e=Math.floor(n/100),n=n%100;return o||e>0?(a=" "+t[e]+" trăm",a+=r(n,!0)):a=r(n,!1),a},o=function(t,r){var o="",a=Math.floor(t/1e6),t=t%1e6;a>0&&(o=n(a,r)+" triệu",r=!0);var e=Math.floor(t/1e3),t=t%1e3;return e>0&&(o+=n(e,r)+" ngàn",r=!0),t>0&&(o+=n(t,r)),o};return{doc:function(r){if(0==r)return t[0];var n="",a="";do ty=r%1e9,r=Math.floor(r/1e9),n=r>0?o(ty,!0)+a+n:o(ty,!1)+a+n,a=" tỷ";while(r>0);return n.trim()}}}();

ClassString.docSoVn = function(so) {
    return DOCSO.doc(so);
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

ClassAngular = function () {

}

ClassAngular.getPaginatorArrOld = function($scope, page, limit, url ){

    var totalRow =  $scope.info_data.totalRow;
    var nPage =  $scope.info_data.nPage;
    var pageRange =  $scope.info_data.pageRange;

    $scope.totalRow = totalRow;
    $scope.nPage = nPage;
    $scope.currentPage = page;
    $scope.fromItem = (page-1) * limit + 1;
    $scope.toItem = (page * limit > totalRow ) ? totalRow: page * limit;

    var arrPage = [];
    var i = 1;

    var prevPage = 1;
    var nextPage = nPage;

    if(page > 1)
        prevPage = parseInt(page) - 1;
    if(page < nPage)
        nextPage = parseInt(page) + 1;

    urlGet = url + "&page=" + prevPage + "&limit=" + limit;
    if(page == 1)
        arrPage.push({"name": "<" , "page_number": prevPage, "link": urlGet,  "class": "paginate_button previous disabled"});
    else
        arrPage.push({"name": "<" , "page_number": prevPage, "link": urlGet,  "class": "paginate_button previous"});

    //Rang will show:
    var arrRang = [];
    var startPage = page - Math.floor(pageRange/2);
    //console.log("startPage = " + startPage);

    if(nPage - startPage < pageRange)
        startPage = nPage - pageRange + 1;
    if(startPage < 1)
        startPage = 1;
    for(i = startPage ; i < startPage + pageRange && i <= nPage; i++)
        arrRang.push(i);

    if(page > nPage - pageRange/2 && nPage > pageRange) {
        var objFirst =  {"name":  "1", "page_number": 1, "link": urlGet, "class": "paginate_button"};
        arrPage.push(objFirst);
        var objEtc =  {"name":  "...", "page_number": nPage, "link": "#", "class": "paginate_button"};
        arrPage.push(objEtc);
    }

    for(i = 1; i <=nPage; i++){
        if(!isInArray(i, arrRang))
            continue;


        urlGet = url + "&page=" + i + "&limit=" + limit;
        var classX = "paginate_button"
        if(i == page)
            classX = "paginate_button active";
        arrPage.push({"name": i , "page_number": i, "link": urlGet, "class": classX});
    }


    if(page < nPage - pageRange/2 && nPage > pageRange) {
        var objEtc =  {"name":  "...", "page_number": nPage, "link": "#", "class": "paginate_button"};
        arrPage.push(objEtc);
        var objLast = {"name": nPage, "page_number": nPage, "link": urlGet, "class": "paginate_button"};
        arrPage.push(objLast);
    }


    urlGet = url + "&page=" + nextPage + "&limit=" + limit;
    if(page == nPage)
        arrPage.push({"name": ">" , "page_number": nextPage, "link": urlGet, "class": "paginate_button next disabled"});
    else
        arrPage.push({"name": ">" , "page_number": nextPage, "link": urlGet, "class": "paginate_button next"});


    urlGet = url + "&page=1&limit=" + limit;
    var objBegin =  {"name": "<<" ,"page_number": 1, "link": urlGet, "class": "paginate_button"};
    urlGet = url + "&page=" + nPage + "&limit=" + limit;
    var objEnd =  {"name": ">>" , "page_number": nPage, "link": urlGet, "class": "paginate_button"};
    //$scope.arrPage = objHome + arrPage + objEnd;
    arrPage.unshift(objBegin);

    arrPage.push(objEnd);


    return arrPage;
}


ClassAngular.getPaginatorArr = function($scope, page, limit, urlBase, curentUri){

    console.log("xxx getPaginatorArrType2 , URL = " + curentUri);

    var totalRow =  $scope.info_data.totalRow;
    var nPage =  $scope.info_data.nPage;
    var pageRange =  $scope.info_data.pageRange;

    $scope.totalRow = totalRow;
    $scope.nPage = nPage;
    $scope.currentPage = page;
    $scope.fromItem = (page-1) * limit + 1;
    $scope.toItem = (page * limit > totalRow ) ? totalRow: page * limit;

    return ClassUtil.buildPaginatorArrJson(page, nPage, limit, pageRange, urlBase, curentUri);

}



//Replace for $.param...
//ex: var object = {firstName:"John", lastName:"Doe", age:46};
ClassAngular.getDataPost = function(object){
    var str = "";
    for(var key in object){
        str += "&" + key + "=" + object[key];
    }
    return str;
}

ClassBase = function () {
}

ClassBase.isEmptyObj = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

ClassBase.getCurrentModuleCms = function(url){
//    url.replace(url)
}

function highLightLeftMenu($scope){
    /////////////////////////////
    //Make Higtlight leftmenu:

    //Khi vào app
    $(".main-sidebar li").removeClass("active");

    //var currentUri = $location.path().substring(1);
    var currentUri = location.pathname;

    //console.log("location.href = " + location.href);
    console.log("currentUri = location.pathname = " + location.pathname);


    //alert("currentURI = " + location.href);
    //$('a[href$="' + currentUri + '"]').css({"font-style":'italic'})
    $('a[href^="' + currentUri + '?ts"] i').removeClass("fa-circle-thin");
    $('a[href^="' + currentUri + '?ts"] i').addClass("fa-arrow-circle-right");
    $('a[href^="' + currentUri + '?ts"]').parent().addClass("active");
    $('a[href^="' + currentUri + '?ts"]').parent().parent().parent().addClass("active menu-open");

    //$('a[href^="' + currentUri + '?ts"]').parent().parent().css({"color": "white"});
    //$('a[href^="' + currentUri + '?ts"]').parent().css({"color": "white"});
    $('a[href^="' + currentUri + '?ts"]').css({"color": "orange"});

    //$('[id^="menu_left_' + currentUri + '"]').css({"color": "red"});
    //$('[id^="left_menu_a_' + currentUri + '"]').find('[id^="a_inside_li_"]').css({"color": "blue"});
    //alert($('a[href^="' + currentUri + '?ts"]').prop("id"));

    setTimeout(function () {
        try {
            //console.log(" slecting = " + $('a[href^="' + currentUri + '?ts"]').prop("id"));
            var selectingId = $('a[href^="' + currentUri + '?ts"]').prop("id");
            var arr = selectingId.split('/');
            //console.log(" arr = " + JSON.stringify(arr));
            if(arr.length == 2) {
                $('[id^="' + arr[1] + '"]').css({"color": "orange"});
                arr = $('[id^="' + arr[1] + '"]').prop("id").split('/');
                if(arr.length == 2){
                    $('[id^="' + arr[1] + '"]').css({"color": "orange"});
                    arr = $('[id^="' + arr[1] + '"]').prop("id").split('/');
                    if(arr.length == 2){
                        $('[id^="' + arr[1] + '"]').css({"color": "orange"});
                    }
                }
            }
        }
        catch(err) {

        }
    },500);

    //Khi Click menu
    $scope.clickLeftMenuAndHighLight = function (event) {
        //$idMenu = event.target.parentNode.id;
        //console.log("ID = " + $idMenu);
        //Run OK:
        //angular.element("#" + $idMenu).addClass("active");
        //$("#" + $idMenu).addClass("active");
        $(".main-sidebar li").removeClass("active");
        $('.main-sidebar li a').css({"font-style":'normal'});
        $(event.target).css({"font-style":'italic'});
        $(event.target.parentElement).addClass("active");
        $(event.target.parentElement.parentElement.parentElement).addClass("active menu-open");

    }
    //End hightlight leftmenu
    /////////////////////////////
}


if(ClassApi.isLogined()){
    //alert("Login ok?");
    ClassApi.getGroupExtraList();
}
else{
    //alert("Not Login?");
}

ClassApi.changeGidUsing = function(newGid) {

    //var newGid = $('#changeGidUsing').find(":selected").val();

    //alert("newGid " + newGid);
    var url = gBaseUrl + 'a_p_i/member/set-gid-using/gidUsing/' + newGid + "/ts/" + Date.now();
    $.get(url, function(data){
        if(!ClassApi.checkReturnApi(data))
        {
            return;
        }
        console.log(" Data = ", data);
        if(data.errorNumber != 0){
            alert("Có lỗi: " + data.errorNumber);
            return;
        }
        if(data.payload){
            alert("Chuyển sang Role: " + data.payload);
        }

        //alert("return = " + data.payload);
        location.reload();
    });
}

ClassApi.changeOtherUser = function(uid) {

    //var newGid = $('#changeGidUsing').find(":selected").val();

    // var uid = $("#loginAsUser").val();
    // var uid1 = $("#loginAsUser1").val();
    // if(!uid)
    //     uid = uid1;

    if(!uid){
        alert("Not input user?");
        return;
    }

    if(uid == 'guest'){
        jctool.deleteCookie('currentUser');
        location.reload("/");
        return;
    }

    //alert("newGid " + newGid);
    var url = gBaseUrl + 'a_p_i/cms-user/set-other-user/other_uid/' + uid + "/_ts/" + Date.now();
    $.get(url, function(data){
        if(!ClassApi.checkReturnApi(data))
        {
            return;
        }
        if(data.payload){
            showToastWarningBottom("Chuyển sang User: " + data.payload);
        }
        //alert("return = " + data.payload);
        location.reload("/");
    });
}


function showDialogCommon(mess, title){

    if(mess.length > 5000){
        mess = mess.substring(0,5000) + " (...String to long...)";
    }

    if($('#commonDialog').length) {
        $("#commonDialog").modal("show");
        if(typeof title != 'undefined')
            $("#commonDialogTitle").html(title);
        $("#commonDialogContent").html(mess);
    }
    else{
        if(title)
            alert(title + "\n" + mess);
        else
            alert(mess);
    }
}

function showToastWarningBottom(mess,title, timeout){

    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.warning(mess,title, {timeOut: timeout});
    else
        toastr.warning(mess,title, {timeOut: 2000});
}

function showToastWarningTop(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    //toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.warning(mess,title, {timeOut: timeout});
    else
        toastr.warning(mess,title, {timeOut: 2000});
}

function showToastInfoBottom(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.info(mess,title, {timeOut: timeout});
    else
        toastr.info(mess,title, {timeOut: 2000});
}

function showToastInfoTop(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    //toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.info(mess,title, {timeOut: timeout});
    else
        toastr.info(mess,title, {timeOut: 2000});
}

function ClassUtil(obj){

}

ClassUtil.remove_duplicates_es6 = function(arr) {
    var s = new Set(arr);
    var it = s.values();
    return Array.from(it);
}


ClassUtil.download = function (urlDownload, name) {

    var link = document.createElement("a");
    link.download = name;
    link.href = urlDownload;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;

}

ClassUtil.countActionRemove = function(actionName){
    localStorage.removeItem(actionName);
}

ClassUtil.countActionSet = function(actionName, reset){

    if(reset == 1){
        localStorage.removeItem(actionName);
        return;
    }

    var str = localStorage.getItem(actionName);
    var count = 1;
    var obj = {count: count, time: Date.now(), firsttime: Date.now()};
    if(str) {
        obj = JSON.parse(str);
        if(obj && obj.count) {
            obj.count += 1;
            obj.time = Date.now();
        }
    }
    localStorage.setItem(actionName, JSON.stringify(obj));
    return obj;
}

// ClassUtil.countActionGet = function(actionName){
//     localStorage.setItem(actionName, )
// }

ClassUtil.isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}



ClassUtil.formatTimeToHHMMSS = function(nSecond) {
    var date = new Date(null);
    date.setSeconds(nSecond); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
}


ClassUtil.niceBytes = function(bytes){
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    if(!bytes)
        return 0;
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseFloat(bytes / 1024).toFixed(2)
        }
    }
    return bytes + ' P';
}

ClassUtil.formatByteToString = function(x){
    return ClassUtil.niceBytes(x);
}

//https://freetuts.net/tao-slug-tu-dong-bang-javascript-va-php-199.html
ClassUtil.to_slug = function(str)
{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}

//Status developing:
ClassUtil.buildPaginatorHtml = function(url, nPage, total, range){

    if(url.search("/page") < 0 ){
        alert("buildPaginatorHtml: Not found /page?");
        return;
    }

    var tmp = url.split("page/")[1];
    var currentPage = '';
    if(!ClassUtil.isNumber(tmp))
    if(tmp.indexOf('&') >=0)
        currentPage = parseInt(tmp.split("&")[0], 10);
    else
        if(tmp.indexOf('/') >=0)
            currentPage = parseInt(tmp.split("/")[0], 10);

    if(!ClassUtil.isNumber(currentPage)){
        alert("buildPaginatorHtml: Not number page?");
        return;
    }

    if(!range)
        var range = 10;

    var ret  = "";
    var uri1 = "";

    if(currentPage > 1) {
        uri1 = url.replace(/page\/(\d+)/, "page/" + (currentPage - 1));

    }
    else {
        uri1 = url.replace(/page\/(\d+)/, "page/1");


    }

    var fromPage = currentPage - (range/2);
    var toPage = currentPage + (range/2);
    if(fromPage < 0)
        fromPage = 1;
    if(nPage >= range) {
        if (toPage < range)
            toPage = range;
    }
    else
        toPage = nPage;

    ret += " <a href='/"+ uri1 + "'> <i class='fa fa-angle-double-left'></i> </a> ";

    for(var i = fromPage; i< toPage; i ++){
        uri1 = url.replace(/page\/(\d+)/, "page/" + i);
        if(i == currentPage)
            ret += " <a style='font-weight: bolder' href=''>" + i + "</a> | ";
        else
            ret += " <a href='/"+ uri1 + "'>" + i + "</a> | ";
    }

    // uri1 = url.replace(/page\/(\d+)/, "page/" + nPage);
    // ret += " <a href='/"+ uri1 + "'>" + i + "</a> ";

    uri1 = url.replace(/page\/(\d+)/, "page/" + nPage + "");
    ret += " ... <a href='/"+ uri1 + "'> " + nPage + " </a> ";

    if(currentPage < nPage)
        uri1 = url.replace(/page\/(\d+)/, "page/" + (1 +currentPage));
    ret += " <a href='/"+ uri1 + "'> <i class='fa fa-angle-double-right'></i> </a> ";

    return ret;

}

//Status: Good to deploy
ClassUtil.buildPaginatorArrJson = function(page, nPage, limit, pageRange, urlBase, curentUri){

    if(curentUri[0]!="/")
        curentUri = "/" + curentUri;
    if(curentUri.indexOf('?') < 0)
        curentUri = curentUri + '?';

    var arrPage = [];
    var i = 1;

    var prevPage = 1;
    var nextPage = nPage;

    if(page > 1)
        prevPage = parseInt(page) - 1;
    if(page < nPage)
        nextPage = parseInt(page) + 1;

    var prevPageUrl = "";
    if(curentUri.indexOf("page=") >=0) {
    }
    else {
        curentUri += "&page=1";
    }
    curentUri = curentUri.replace("//","/");

    //prevPageUrl = curentUri.replace(/page\/(\d+)/, "page/" + prevPage);
    prevPageUrl = curentUri.replace(/page=(\d+)/, "page=" + prevPage);

    var urlGet2 = prevPageUrl;
    var urlGet = urlBase + "&page=" + prevPage + "&limit=" + limit;


    if(page == 1)
        arrPage.push({"name": "<" , "page_number": prevPage,"link": urlGet2, "link2": urlGet2,  "class": "paginate_button previous disabled"});
    else
        arrPage.push({"name": "<" , "page_number": prevPage,"link": urlGet2, "link2": urlGet2,  "class": "paginate_button previous"});

    //Rang will show:
    var arrRang = [];
    var startPage = page - Math.floor(pageRange/2);
    //console.log("startPage = " + startPage);

    if(nPage - startPage < pageRange)
        startPage = nPage - pageRange + 1;
    if(startPage < 1)
        startPage = 1;
    for(i = startPage ; i < startPage + pageRange && i <= nPage; i++)
        arrRang.push(i);

    if(page > nPage - pageRange/2 && nPage > pageRange) {
        //urlGet2 = curentUri.replace(/page\/(\d+)/, "page/1");
        urlGet2 = curentUri.replace(/page=(\d+)/, "page=1");
        var objFirst =  {"name":  "1", "page_number": 1,"link": urlGet2, "link2": urlGet2, "class": "paginate_button"};
        arrPage.push(objFirst);
        var objEtc =  {"name":  "...", "page_number": nPage, "link": "#", "class": "paginate_button"};
        arrPage.push(objEtc);
    }

//    console.log(" arrRang2 = " + JSON.stringify(arrRang));

    for(i = 1; i <=nPage; i++){
        if(!isInArray(i, arrRang))
            continue;

//        var pageNow = arrRang[i];

        //urlGet2 = curentUri.replace(/page\/(\d+)/, "page/" + i);
        urlGet2 = curentUri.replace(/page=(\d+)/, "page=" + i);
        var classX = "paginate_button"
        if(i == page)
            classX = "paginate_button active";
        arrPage.push({"name": i , "page_number": i,"link": urlGet2, "link2": urlGet2, "class": classX});
    }


    if(page < nPage - pageRange/2 && nPage > pageRange) {
        var objEtc =  {"name":  "...", "page_number": nPage, "link": "#", "class": "paginate_button"};
        arrPage.push(objEtc);
        //urlGet2 =  curentUri.replace(/page\/(\d+)/, "page/" + nPage);
        urlGet2 = curentUri.replace(/page=(\d+)/, "page=" + nPage);
        var objLast = {"name": nPage, "page_number": nPage,"link": urlGet2, "link2": urlGet2, "class": "paginate_button"};
        arrPage.push(objLast);
    }

    var nextPageUrl = "";
    //nextPageUrl = curentUri.replace(/page\/(\d+)/, "page/" + nextPage);
    nextPageUrl = curentUri.replace(/page=(\d+)/, "page=" + nextPage);
    urlGet2 = nextPageUrl;
    if(page == nPage)
        arrPage.push({"name": ">" , "page_number": nextPage,"link": urlGet2, "link2": urlGet2, "class": "paginate_button next disabled"});
    else
        arrPage.push({"name": ">" , "page_number": nextPage,"link": urlGet2, "link2": urlGet2, "class": "paginate_button next"});

//    urlGet2 = url + "&page=1&limit=" + limit;
    //urlGet2 = curentUri.replace(/page\/(\d+)/, "page/1");
    urlGet2 = curentUri.replace(/page=(\d+)/, "page=1");
    var objBegin =  {"name": "<<" ,"page_number": 1,"link": urlGet2, "link2": urlGet2, "class": "paginate_button"};
//    urlGet2 = url + "&page=" + nPage + "&limit=" + limit;
    //urlGet2 = curentUri.replace(/page\/(\d+)/, "page/" + nPage);
    urlGet2 = curentUri.replace(/page=(\d+)/, "page=" + nPage);
    var objEnd =  {"name": ">>" , "page_number": nPage,"link": urlGet2, "link2": urlGet2, "class": "paginate_button"};

    //$scope.arrPage = objHome + arrPage + objEnd;
    arrPage.unshift(objBegin);

    arrPage.push(objEnd);

//    console.log(" ARRPAGE2 = " + JSON.stringify(arrPage));

    return arrPage;
}

ClassCart = {};


ClassCart.updateNumberItemCart = function () {
    var paidInfoStorage = localStorage.getItem("paid-products");
    if(paidInfoStorage) {
        var dt = JSON.parse(paidInfoStorage);
        var found = 0;
        //console.log(" CART LIST = " + JSON.stringify(dt));
        console.log(" CART LIST = " + JSON.stringify(dt.data));

        //$("#cart-amount-buy").html(dt.data.length);

        //$("#cart-amount-buy").show();
        if(document.getElementById("cart-amount-buy")){
            document.getElementById("cart-amount-buy").innerHTML = dt.data.length;
            document.getElementById("cart-amount-buy").style.visibility = "visible";
        }

    }
    else {
        //$("#cart-amount-buy").html('');
        //$("#cart-amount-buy").hide();
        if(document.getElementById("cart-amount-buy")) {
            var content = document.getElementById("cart-amount-buy").innerHTML = '';
            document.getElementById("cart-amount-buy").style.visibility = "hidden";
        }
    }
}

ClassCart.addToCart = function (obj) {

    console.log(" ADD CART1 = ", obj);
    var paidInfoStorage = localStorage.getItem("paid-products");

    console.log(" paidInfoStorage CART1 = ", paidInfoStorage);

    if(!paidInfoStorage) {
        var dt = {};
        dt['data'] = [];
        dt['data'].push(obj);
        dt['user_timestamp'] = Date.now();
        localStorage.setItem("paid-products", JSON.stringify(dt));
    }
    else{
        var dt = JSON.parse(paidInfoStorage);
        var found = 0;
        //console.log(" CART LIST = " + JSON.stringify(dt));
        console.log(" CART LIST = ", dt.data);

        if(dt.data)
            for(var k in dt.data){
                if(dt.data[k])
                    if(dt.data[k].hasOwnProperty('id'))
                        if(dt.data[k].id == obj.id){
                            console.log(" add one more?");
                            if(!dt.data[k].quantity)
                                dt.data[k].quantity = 1;
                            //else
                            //dt.data[k].quantity++;
                            found = 1;
                            break;
                        }
            }

        if(!found){
            console.log(" add new 1?");
            dt['data'].push(obj);
        }

        localStorage.setItem("paid-products", JSON.stringify(dt));
    }
    location.href = "/buy/info/items";
}

ClassCart.updateNumberItemCart();

//https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
function ResizeSensor(element, callback)
{
    console.log(" Call ResizeSensor");
    if(typeof element == 'undefined')
        return;

    if(!element)
        return;


    var zIndex = parseInt(getComputedStyle(element));
    if(isNaN(zIndex)) { zIndex = 0; };
    zIndex--;

    var expand = document.createElement('div');
    expand.style.position = "absolute";
    expand.style.left = "0px";
    expand.style.top = "0px";
    expand.style.right = "0px";
    expand.style.bottom = "0px";
    expand.style.overflow = "hidden";
    expand.style.zIndex = zIndex;
    expand.style.visibility = "hidden";

    var expandChild = document.createElement('div');
    expandChild.style.position = "absolute";
    expandChild.style.left = "0px";
    expandChild.style.top = "0px";
    expandChild.style.width = "10000000px";
    expandChild.style.height = "10000000px";
    expand.appendChild(expandChild);

    var shrink = document.createElement('div');
    shrink.style.position = "absolute";
    shrink.style.left = "0px";
    shrink.style.top = "0px";
    shrink.style.right = "0px";
    shrink.style.bottom = "0px";
    shrink.style.overflow = "hidden";
    shrink.style.zIndex = zIndex;
    shrink.style.visibility = "hidden";

    var shrinkChild = document.createElement('div');
    shrinkChild.style.position = "absolute";
    shrinkChild.style.left = "0px";
    shrinkChild.style.top = "0px";
    shrinkChild.style.width = "200%";
    shrinkChild.style.height = "200%";
    shrink.appendChild(shrinkChild);

    element.appendChild(expand);
    element.appendChild(shrink);

    function setScroll()
    {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;

        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    };
    setScroll();

    var size = element.getBoundingClientRect();

    var currentWidth = size.width;
    var currentHeight = size.height;

    var onScroll = function()
    {
        var size = element.getBoundingClientRect();

        var newWidth = size.width;
        var newHeight = size.height;

        if(newWidth != currentWidth || newHeight != currentHeight)
        {
            currentWidth = newWidth;
            currentHeight = newHeight;

            callback();
        }

        setScroll();
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
};

window.onhashchange = function() {
    //alert("Change url ?" + location.pathname );
}

if(document.readyState === 'complete'){

    console.log("Load done!");


}
function showWaittingIcon() {
    $("#waitting_icon").show();
}

function hideWaittingIcon() {
    $("#waitting_icon").hide();
}


function chatWithAdmin(){  $( "#supportDialog" ).toggle();
    //
    //
    // $( "#supportDialog" ).dialog({
    //     title: 'Góp ý với chúng tôi',
    //     resizable: true,
    //     height: "auto",
    //     width: "auto",
    //     modal: false,
    //     buttons: {
    //         CLOSE: function() {
    //             $( this ).dialog( "close" );
    //         }
    //     }
    // });
    //$("#supportDialog").dialog();
    //$(".ui-dialog-titlebar").hide();

}


ClassUI.linkChangeLog = null;

ClassUI.cancelPage = function() {
    location.href = "";
}

ClassUI.savePage = function() {

    console.log(" SavePage now... ");

    $("html").css({"border-color": "brown",
        "border-width":"0px",
        "border-style":"dashed"});

    var arr = {};
    $('[id^="editable_glx_"]').each(function () {
        //Error: if not this line, each will dublicate!
        if(arr[this.id])
            return;

        console.log("THISID = " + this.id + " :" + $(this).html());

        arr[this.id] = $(this).html();
        arr[this.id] = {};
        arr[this.id]['text'] = $(this).html();
        if($(this).is("a"))
            arr[this.id]['link'] = $(this).prop("href");
        if($(this).is("img"))
            arr[this.id]['link'] = $(this).prop("src");
        if($(this).is("iframe"))
            arr[this.id]['link'] = $(this).prop("src");
    })

    console.log(" ARR = ");
    console.dir(arr);

//            var data = {};
//            data['val1'] = 1;
//            data['val2'] = 2;
    var urlPost = "/a_p_i/admin-edit-ui/save-all-ui-item";
    $.post(urlPost, arr, function(result){
        //alert("Post ret = " + JSON.stringify(result));
        if(!ClassApi.checkReturnApi(result, urlPost)){
            showDialogCommon(JSON.stringify(result), "Có lỗi xảy ra: ");
            return;
        }
        else
            showToastInfoTop("Cập nhật thành công!");


        $("#idEditPage").show();
        $("#idSavePage").hide();

        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].onclick = function() {return true;};
        }
        $('[id^="editable_glx_"]').attr('contenteditable','false');
        $('[id^="editable_glx_"]').css({"border-color": "red",
            "border-width":"0px",
            "border-style":"solid"});


    });



}

ClassUI.editPage = function() {

    $("html").css({"border-color": "brown","border-width":"2px","border-style":"dashed"});
    $("html").css({"border-bottom-width": "0px"});

    $("#idEditPage").hide();
    $("#idSavePage").show();

    $("#dangEditText_zone").show();
    $("#dangEditLink_zone").show();
    $("#dangEditImg_zone").show();

    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function() {return false;};
    }

    //document.getElementById('editable_glx_1').setAttribute("contenteditable", "true");
    $('[id^="editable_glx_"]').attr('contenteditable','true');
    $('[id^="editable_glx_"]').css({"border-color": "red",
        "border-width":"3px 1px 1px 1px",
        "border-style":"dashed"});
    $('[id^="editable_glx_"]').css({"border-bottom-color": "white"});

    $('[id^="editable_glx_"]').dblclick(function () {
         alert("Edit Item: " + this.id);

        //$("#dangEditLink").hide();
        //$("#dangEditImg").hide();
        //$("#dangEditLink").data('idItem', null);
        //$("#dangEditImg").data('idItem', null);
        //myModalEditUI.style.display = "block";

        $("#myModalEditUI").show();

        $("#dangEditText").val(this.innerHTML.trim());
        $("#dangEditText").data('idItem', this.id);

        var isA = 0;
        if($(this).is('a')){
            console.log(" IS A2 ...");
            isA = 1;
            $("#dangEditLink").show();
            $("#dangEditLink").val(this.href);
            $("#dangEditLink").data('idItem', this.id);
        }
        if($(this).is('img')){
            console.log(" IS img2 ...");

            $("#dangEditImg").show();
            $("#dangEditImg").val(this.src);
            $("#dangEditImg").data('idItem', this.id);

            if(isA == 0) {
               // $("#dangEditText_zone").hide();
                //$("#dangEditLink_zone").hide();
            }

        }

        ClassUI.linkChangeLog = "/tool/cms/change_log_ui.php?id=" + this.id;


    })

    $("#linkChangeUI").click(function () {
        window.open(ClassUI.linkChangeLog);
    })


}

ClassUI.cancelEdit = function() {

    $("#dangEditLink").val("");
    $("#dangEditImg").val("");
    $("#dangEditLink").data('idItem', null);
    $("#dangEditImg").data('idItem', null);
    $("#myModalEditUI").hide();
    //myModalEditUI.style.display = "none";
}

ClassUI.saveEditItem = function() {

    console.log("dangEditImg id = " + $("#dangEditImg").data('idItem'));
    console.log("dangEditImg val = " + $("#dangEditImg").val());

    var idItem = $("#dangEditImg").data('idItem');
    if($("#dangEditImg").data('idItem')) {
        console.log(" Change img ok");
        $("#" + idItem).prop("src", $("#dangEditImg").val());
    }

    var idItem = $("#dangEditLink").data('idItem');
    if($("#dangEditLink").data('idItem')) {
        console.log(" Change link ok");
        $("#" + idItem).prop("href", $("#dangEditLink").val());
    }

    var idItem = $("#dangEditText").data('idItem');
    $("#" + idItem).html($("#dangEditText").val());

    console.log("dangEditLink val = " + $("#dangEditLink").val());
    console.log("dangEditLink id = " + $("#dangEditLink").data('idItem'));

    //myModalEditUI.style.display = "none";
    $("#myModalEditUI").hide();

    $("#dangEditLink").val("");
    $("#dangEditImg").val("");
    $("#dangEditLink").data('idItem', null);
    $("#dangEditImg").data('idItem', null);

}


function popupads(domainx) {
    var openPage = false;
    if(!window.localStorage.getItem(domainx)) {
        window.localStorage.setItem(domainx, Date.now());
        openPage = true;
    }
    else{
        var t1 = window.localStorage.getItem(domainx);
        if(t1 < Date.now() - 7200*1000){
            window.localStorage.setItem(domainx, Date.now());
            openPage = true;
        }
    }
    if(openPage){
        window.open("https://" + domainx);
    }
}

var jctool = {

}

jctool.deleteRemoveLocalStorage = function (key){
    window.localStorage.removeItem(key);
}
jctool.setLocalStorage = function (key, val){
    window.localStorage.setItem(key, val);
}

jctool.getLocalStorage = function (key){
    return window.localStorage.getItem(key);
}


jctool.deleteCookie = function(cname) {
    document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

jctool.setCookie = function(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

jctool.getCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/* Get to one object Object
    var mpar = jctool.getUrlVars();
    for (var prop in mpar) {
            // skip loop if the property is from prototype
            if (!mpar.hasOwnProperty(prop)) continue;
            console.log(prop + " = " + mpar[prop]);
        }
* */
jctool.getUrlVars = function () {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

jctool.getUrlParam = function (parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = jctool.getUrlVars()[parameter];
    }
    if(!urlparameter || urlparameter === NaN)
        return null;
    return urlparameter;
}

jctool.getUrlVarsOfTopWindow = function () {
    var vars = {};
    var parts = top.window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

jctool.getUrlParamOfTopWindow = function (parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if(top.window.location.href.indexOf(parameter) > -1){
        urlparameter = jctool.getUrlVarsOfTopWindow()[parameter];
    }
    if(!urlparameter || urlparameter === NaN)
        return null;
    return urlparameter;
}

jctool.setUrlParamString = function(s, key,value)
{

    //If it has /
    // if(s.indexOf("?") > 0 && s.lastIndexOf("/") > 0){
    //     s = s.split("?")[1];
    //     console.log(" *** News = " + s);
    // }


    //if(value ==  null || !value)
      //  return s;

    // if(value === null)
    //     alert("NULL1 ");
    // if(value == null)
    //     alert("NULL2 ");

    key = encodeURIComponent(key); value = encodeURIComponent(value);

    console.log(" Change from: " + s , ", key = " + key, " / value = " + value);


    var kvp = key+"="+value;

    var r = new RegExp("(&|\\?)"+key+"=[^\&]*");

    if(s=='#')
        s = '';

    if(s && s.length)
        s = s.replace(r,"$1"+kvp);
    else{

        return "?" + key + '=' + value;
    }

    if(s.indexOf("?") == -1){
        s = s + '?';
    }

    if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

    //again, do what you will here


    //Them key vao neu chua co:
    if(s.indexOf(key + "=") <=0){
        if(s.indexOf("?") >= 0)
            s = s + '&' + key + '=' + value;
        else
            s = s + '?' + key + '=' + value;
    }

    if(value == null || value === 'null' || !value){

        console.log(" ---- delete key: " + key);
        if(s){
            s = s.replace("&" + key + "=null", '');
            s = s.replace("&" + key + "=", '');
            s = s.replace("?" + key + "=null", '?');
            s = s.replace("?" + key + "=", '?');
        }
    }

    s = s.replace("?&", '?');

    console.log(" Change link to: " + s);

    return s;
}

jctool.setCurrentUrlParamAndGo = function(key,value, returnStr = 0)
{

    console.log(" KEy/Val: " + key + " / " + value);

    key = encodeURIComponent(key); value = encodeURIComponent(value);

    var s = document.location.search;
    var kvp = key+"="+value;

    var r = new RegExp("(&|\\?)"+key+"=[^\&]*");

    console.log(" document.location.search: " + document.location.search);

    s = s.replace(r,"$1"+kvp);

    if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

    //again, do what you will here

    console.log(" Change page param: " + s);

    //Them key vao neu chua co:
    if(s.indexOf(key + "=") <=0){
        if(s.indexOf("?") >= 0)
            s = s + '&' + key + '=' + value;
        else
            s = s + '?' + key + '=' + value;
    }

    if(returnStr)
        return s;
    //document.location.search = s;

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + s;

    window.history.pushState({ path: newurl }, '', newurl);

}

jctool.checkIdInStringComma = function(str, num) {
    var str1 = ","  + str + ',';

    if(str1.indexOf("," + num + ',') != -1){
        return 1;
    }

    return 0
}

jctool.removeIdInStringComma = function(str, num) {
    var str1 = "," + str + ',';

    //khong co thi bo qua
    if (str1.indexOf("," + num + ',') == -1) {
        return str;
    }

    str1 = str1.replace("," + num + ',' , ",");
    str1 = jctool.trimLeftRightAndRemoveDoubleComma(str1);
    return str1;
}
//Neu da co roi thi khong add:
jctool.addIdInStringComma = function(str, num) {
    var str1 = ","  + str + ',';
    //co roi thi ko them
    if(str1.indexOf("," + num + ',') != -1){
        return str;
    }

    str1 += "," + num;
    str1 = jctool.trimLeftRightAndRemoveDoubleComma(str1);

    return str1;
}


// Chuẩn hóa lại chuỗi comma id...
jctool.trimLeftRightAndRemoveDoubleComma = function(str) {
    var ret = jctool.trimLeftRight(str, ',');
    ret = ret.replace(',,',',').replace(',,',',').replace(',,',',');
    if(ret == ',')
        ret = '';
    return ret;
}

jctool.trimLeftRight = function(str, ch) {
    var start = 0,
        end = str.length;

    while(start < end && str[start] === ch)
        ++start;

    while(end > start && str[end - 1] === ch)
        --end;
    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

jctool.getUrlNotParam = function(){
    return window.location.href.split('?')[0];
}

jctool.checkJsonDecode = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//https://www.aliciaramirez.com/closing-tags-checker/
jctool.isValidHtmlCheck = function () {

}

jctool.nowy = function () {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

/*
Xly image not found:
*/
//Use window.addEventListener javascript to avoid not have jquery before this function:
//Jquery usually placed at end of page
window.addEventListener("load", function(){
    console.log(" Onload done!");

    $(function () {
        $("#back-top a").click(function() {
            return $("body, html").stop(!1, !1).animate({
                scrollTop: 0
            }, 500), !1
        })
    })

    $(window).on('load', function(){
        $('img').each(function() {

           // console.log(" SRC img = " + this.src);
            //if(this.src.length > 0)

            if ( !this.complete
                ||   typeof this.naturalWidth == "undefined"
                ||   this.naturalWidth == 0                  ) {
                // image was broken, replace with your new image
                //this.alt = "not found: " + this.src;

                console.log(" Error: NOTFOUND: " + this.alt);

                //this.src = "/public/images/broken01.png";
            }
        });
    });

});


function clickOpenCloseMenu(){
    console.log("openCloseMenuLad ...");
    if($("body").hasClass('sidebar-collapse')){
        console.log(" OK ...");
        jctool.setCookie("open_admin_menu", 0, 1000);
    }
    else{
        jctool.setCookie("open_admin_menu", 1, 1000);
    }
}


function addTimKiemToLink(link){
    link = link.replace("//", '/');
    if(link.substring(0,10) != '/tim-kiem/'){
        link = '/tim-kiem/' + link;
        link = link.replace("//", '/');
        link = link.replace("//", '/');
    }

    //Moi khi an tim kiem thi Xoa page
    //link = jctool.setUrlParamString(link, 'page', null);

    return link;
}

function showHideDebugTextArea(th) {
    $(th).next("textArea").toggle();
}

function mouseClickPassWord(obj, id = 'myPassword') {
    var obj = document.getElementById(id);
    if(obj.type == "text")
        obj.type = "password";
    else
        obj.type = "text";
}

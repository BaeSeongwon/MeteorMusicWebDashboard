(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/melon.js                                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
    Meteor.startup(function () {                                       // 2
        $(document).ready((function ($, window, undefined) {           // 3
            var doc = document;                                        // 4
            var PlanetX = function () {                                // 5
                // you can configure these variables using PlanetX.init() function
                this.isIE = /MSIE/i.test(navigator.userAgent);         // 7
                this.appkey = "";                                      // 8
                // <form> tag id for OAuth 2.0 request                 //
                this.login_form = null;                                // 10
                this.client_id = "";                                   // 11
                this.response_type = "token";                          // 12
                this.scope = "";                                       // 13
                this.redirect_uri = "";                                // 14
                // saving token in cookie or localstorage              //
                // default is true                                     //
                this.savingToken = true;                               // 17
                // access token                                        //
                this._access_token = "";                               // 19
                this._access_token_start = 14;                         // 20
                this._access_token_end = 50;                           // 21
                this._access_token_time = null;                        // 22
                this._access_token_time_limit = 43195;                 // 23
                // login status                                        //
                this._loginStatus = false;                             // 25
                // check whether this web app (or web page) already has access token or not.
                this._checkAccessToken();                              // 27
            };                                                         //
            // prototype                                               //
            PlanetX.prototype = {                                      // 30
                // System information                                  //
                versionNumber: '1.1.0',                                // 32
                // Return code                                         //
                SUCCESS_INIT: 100,                                     // 34
                SUCCESS_LOGIN: 101,                                    // 35
                SUCCESS_LOGOUT: 102,                                   // 36
                SUCCESS_API: 200,                                      // 37
                ERROR_INIT: -100,                                      // 38
                ERROR_LOGIN: -101,                                     // 39
                ERROR_LOGOUT: -102,                                    // 40
                ERROR_PARAMETER_MISSING: -201,                         // 41
                /**                                                    //
                 * @function init                                      //
                 */                                                    //
                init: function (obj) {                                 // 45
                                                                       //
                    var i,                                             // 47
                        that = this,                                   //
                        typeAttr,                                      //
                        nameAttr,                                      //
                        valueAttr,                                     //
                        body = doc.getElementsByTagName("body")[0];    //
                                                                       //
                    // first call                                      //
                    if (this.login_form === null) {                    // 55
                        // initializing with object parameter          //
                        if (!!obj) {                                   // 57
                            for (i in babelHelpers.sanitizeForInObject(obj)) {
                                this[i] = obj[i];                      // 59
                            }                                          //
                        }                                              //
                        // making new <form> tag                       //
                        this.login_form = doc.createElement("form");   // 63
                        this.login_form.action = "https://oneid.skplanetx.com/oauth/authorize";
                        this.login_form.method = "get";                // 65
                        // making <input> tags and their attributes in <form> tag
                        jQuery.each(["client_id", "response_type", "scope", "redirect_uri"], function (i, name) {
                            node = doc.createElement("input");         // 68
                            // making new attributes                   //
                            typeAttr = doc.createAttribute("type");    // 70
                            nameAttr = doc.createAttribute("name");    // 71
                            valueAttr = doc.createAttribute("value");  // 72
                            // setting attribute values                //
                            typeAttr.value = "hidden";                 // 74
                            nameAttr.value = name;                     // 75
                            valueAttr.value = that[name];              // 76
                            // attaching attributes to <input> tag     //
                            node.setAttributeNode(typeAttr);           // 78
                            node.setAttributeNode(nameAttr);           // 79
                            node.setAttributeNode(valueAttr);          // 80
                            // attaching <input> tag to <form> tag     //
                            that.login_form.appendChild(node);         // 82
                        });                                            //
                        body.appendChild(this.login_form);             // 84
                        return this.SUCCESS_INIT;                      // 85
                    }                                                  //
                    // can't call twice                                //
                    else {                                             //
                            return this.ERROR_INIT;                    // 89
                        }                                              //
                },                                                     //
                /**                                                    //
                 * @function login                                     //
                 */                                                    //
                login: function () {                                   // 95
                    // if existing <form> tag for log-in               //
                    if (this.login_form !== null) {                    // 97
                        this.login_form.submit();                      // 98
                        return this.SUCCESS_LOGIN;                     // 99
                    } else {                                           //
                        return this.ERROR_LOGIN;                       // 101
                    }                                                  //
                },                                                     //
                /**                                                    //
                 * @function logout                                    //
                 */                                                    //
                logout: function (successCB, failCB) {                 // 107
                                                                       //
                    if (this.getLoginStatus() === false) {             // 109
                        return this.ERROR_LOGOUT;                      // 110
                    }                                                  //
                                                                       //
                    // ajax JSONP call for invalidating access_token   //
                    $.ajax({                                           // 114
                        beforeSend: function (xhr) {                   // 115
                            xhr.setRequestHeader("appKey", this._getAppkey());
                        },                                             //
                        type: "get",                                   // 118
                        url: "https://oneid.skplanetx.com/oauth/expireToken_jsonp",
                        data: {                                        // 120
                            "client_id": this.client_id,               // 121
                            "token": this._getAccessToken()            // 122
                        },                                             //
                        dataType: "jsonp",                             // 124
                        context: this,                                 // 125
                        callback: "this.logoutCallback"                // 126
                    }).done(function (data) {                          //
                        if (data.app.result === "success") {           // 128
                            this._clearToken();                        // 129
                            this._loginStatus = false;                 // 130
                            window.location.hash = '';                 // 131
                            if (typeof successCB === 'function') {     // 132
                                successCB();                           // 133
                            }                                          //
                            return this.SUCCESS_LOGOUT;                // 135
                        } else {                                       //
                            alert('response for the logout-request is not success');
                            return this.ERROR_LOGOUT;                  // 139
                        }                                              //
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                                                                       //
                        // error handling                              //
                        if (jqXHR.status === 0) {                      // 144
                            alert("error 0: Network Problem");         // 145
                        } else if (jqXHR.status === 401) {             //
                            alert("error 401: Unauthorized");          // 147
                            location.href = "https://developers.skplanetx.com/login/";
                        } else if (jqXHR.status === 403) {             //
                            alert("error 403: Forbidden");             // 150
                        } else if (jqXHR.status === 404) {             //
                            alert("error 404: Not Found");             // 152
                        } else if (jqXHR.status === 406) {             //
                            alert("error 406: Not acceptable");        // 154
                        } else if (jqXHR.status === 412) {             //
                            alert("error 412: Precondition Failed ");  // 156
                        } else if (jqXHR.status === 500) {             //
                            alert("error 500: Internal Server Error");
                        } else {                                       //
                            alert("error " + jqXHR.status);            // 160
                        }                                              //
                        if (typeof failCB === 'function') {            // 162
                            failCB();                                  // 163
                        }                                              //
                        return this.ERROR_LOGOUT;                      // 165
                    });                                                //
                },                                                     //
                /**                                                    //
                 * @function getLoginStatus                            //
                 */                                                    //
                getLoginStatus: function () {                          // 171
                    return this._loginStatus;                          // 172
                },                                                     //
                /**                                                    //
                 * @function logoutCallback                            //
                 */                                                    //
                logoutCallback: function (data) {                      // 177
                    // not yet in the server-side                      //
                },                                                     //
                /**                                                    //
                 * @function _setAppkey                                //
                 */                                                    //
                _setAppkey: function (appkey) {                        // 183
                    this.appkey = appkey;                              // 184
                },                                                     //
                /**                                                    //
                 * @function _getAppkey                                //
                 */                                                    //
                _getAppkey: function () {                              // 189
                    return this.appkey;                                // 190
                },                                                     //
                /**                                                    //
                 * @function _saveToken                                //
                 */                                                    //
                _saveToken: function (token) {                         // 195
                    // when you don't want to save token in cookie or localstorage
                    // ex) one page application                        //
                    if (this.savingToken === false) {                  // 198
                        return;                                        // 199
                    }                                                  //
                                                                       //
                    var current_time = new Date();                     // 202
                    this._access_token_time = current_time.getTime() / 1000;
                    // first check window.localStorage                 //
                    if (window.localStorage) {                         // 205
                        localStorage.setItem("token", token);          // 206
                        localStorage.setItem("tokentime", this._access_token_time);
                    }                                                  //
                    // second check cookie                             //
                    else {                                             //
                            doc.cookie += "token=" + token + ";";      // 211
                            doc.cookie += "tokentime=" + this._access_token_time + ";";
                        }                                              //
                },                                                     //
                                                                       //
                /**                                                    //
                 * @function _loadToken                                //
                 */                                                    //
                _loadToken: function () {                              // 219
                                                                       //
                    // when you don't want to save token in cookie or localstorage
                    // ex) one page application                        //
                    if (this.savingToken === false) {                  // 223
                        return;                                        // 224
                    }                                                  //
                                                                       //
                    // first check window.localStorage                 //
                    if (window.localStorage) {                         // 228
                        this._access_token = localStorage.getItem("token");
                        this._access_token_time = localStorage.getItem("tokentime");
                    }                                                  //
                    // second check cookie                             //
                    else {                                             //
                            var cookieArray = doc.cookie.split(";");   // 235
                            for (var i in babelHelpers.sanitizeForInObject(cookieArray)) {
                                if (cookieArray[i].match("token=")) {  // 237
                                    this._access_token = cookieArray[i].substr(cookieArray[i].indexOf("=") + 1);
                                } else if (cookieArray[i].match("tokentime=")) {
                                    this._access_token_time = cookieArray[i].substr(cookieArray[i].indexOf("=") + 1);
                                }                                      //
                            }                                          //
                        }                                              //
                                                                       //
                    // token validation check                          //
                    var current_date = new Date();                     // 246
                    current_time = current_date.getTime() / 1000;      // 247
                    if (!this._access_token || !this._access_token_time || this._access_token_time_limit - (current_time - this._access_token_time) < 0) {
                        this._clearToken();                            // 249
                        this._loginStatus = false;                     // 250
                    } else if (!!this._access_token && !!this._access_token_time) {
                        this._loginStatus = true;                      // 252
                    }                                                  //
                },                                                     //
                /**                                                    //
                 * @function _clearToken                               //
                 */                                                    //
                _clearToken: function () {                             // 258
                    this._access_token = "";                           // 259
                    this._access_token_time = "";                      // 260
                                                                       //
                    // when you don't want to save token in cookie or localstorage
                    // ex) one page application                        //
                    if (this.savingToken === false) {                  // 264
                        return;                                        // 265
                    }                                                  //
                                                                       //
                    // first remove window.localStorage                //
                    if (window.localStorage) {                         // 269
                        localStorage.removeItem("token");              // 270
                        localStorage.removeItem("tokentime");          // 271
                    }                                                  //
                    // second check cookie                             //
                    else {                                             //
                            this._saveToken("");                       // 275
                        }                                              //
                },                                                     //
                /**                                                    //
                 * @function _checkAccessToken                         //
                 */                                                    //
                _checkAccessToken: function () {                       // 281
                    // get access token from local storage or cookie   //
                    this._loadToken();                                 // 283
                    // get access token from location.hash , this value has higher priority.
                    if (window.location.hash) {                        // 285
                        var hashString = window.location.hash.substring(1),
                            pattern = /^access_token/,                 //
                            result = hashString.match(pattern);        //
                        if (result !== null) {                         // 289
                            this._access_token = window.location.hash.slice(this._access_token_start, this._access_token_end);
                            this._saveToken(this._access_token);       // 291
                            this._loginStatus = true;                  // 292
                        }                                              //
                    }                                                  //
                },                                                     //
                /**                                                    //
                 * @function _getAccessToken                           //
                 */                                                    //
                _getAccessToken: function () {                         // 299
                    return this._access_token;                         // 300
                },                                                     //
                /**                                                    //
                 * @function api                                       //
                 */                                                    //
                api: function (queryMethod, queryURL, queryAccept, queryData, successCallback, failCallback, userSetting) {
                    // parameter check                                 //
                    if (!queryMethod || !queryURL || !queryAccept || !queryData || !successCallback) {
                        return this.ERROR_PARAMETER_MISSING;           // 308
                    }                                                  //
                    // ajax request configure                          //
                    var that = this,                                   // 311
                        queryObject = {                                //
                        type: queryMethod,                             // 313
                        url: queryURL,                                 // 314
                        dataType: queryAccept,                         // 315
                        data: queryData,                               // 316
                        success: successCallback,                      // 317
                        error: failCallback                            // 318
                    };                                                 //
                    var ajaxRequest = function () {                    // 320
                        //activeX versions to check for in IE          //
                        var activeXModes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
                        for (var i = 0, max = activeXModes.length; i < max; i += 1) {
                            try {                                      // 324
                                return new ActiveXObject(activeXModes[i]);
                            } catch (e) {                              //
                                //suppress error                       //
                                return null;                           // 328
                            }                                          //
                        }                                              //
                    };                                                 //
                    var myGetRequest;                                  // 332
                    // default error handling function                 //
                    if (!failCallback) {                               // 334
                        queryObject.error = function (jqXHR, textStatus, errorThrown) {
                            if (this.isIE) {                           // 336
                                alert("Ajax fail callback is called");
                            }                                          //
                            if (jqXHR.status === 0) {                  // 339
                                alert("jqXHR.status 0: Network Problem");
                            } else if (jqXHR.status === 401) {         //
                                alert("jqXHR.status 401: Unauthorized");
                                // location.href = "https://developers.skplanetx.com/login/";
                            } else if (jqXHR.status === 403) {         //
                                    alert("jqXHR.status 403: Forbidden");
                                } else if (jqXHR.status === 404) {     //
                                    alert("jqXHR.status 404: Not Found");
                                } else if (jqXHR.status === 406) {     //
                                    alert("jqXHR.status 406: Not Acceptable");
                                } else if (jqXHR.status === 412) {     //
                                    alert("jqXHR.status 412: Precondition Failed ");
                                } else if (jqXHR.status === 500) {     //
                                    alert("jqXHR.status 500: Internal Server Error ");
                                } else {                               //
                                    alert("jqXHR.status " + jqXHR.status);
                                }                                      //
                        };                                             //
                    }                                                  //
                    // defualt setting for ajax request                //
                    var defaultSetting = {                             // 360
                        beforeSend: function (xhr) {                   // 361
                            xhr.setRequestHeader("appKey", that._getAppkey());
                        },                                             //
                        data: {                                        // 364
                            "version": 1                               // 365
                        },                                             //
                        cache: false                                   // 367
                    };                                                 //
                    // public API doesn't have accessToken ...         //
                    if (that._getAccessToken() !== "") {               // 370
                        defaultSetting.data.access_token = that._getAccessToken();
                    }                                                  //
                    // merging queryObject with defaultSetting object  //
                    $.extend(true, queryObject, defaultSetting);       // 374
                    // user setting                                    //
                    if (!!userSetting) {                               // 376
                        $.extend(true, queryObject, userSetting);      // 377
                    }                                                  //
                    // Use Microsoft XDR for IE browser                //
                    if (this.isIE) {                                   // 380
                        myGetRequest = new ajaxRequest();              // 381
                        myGetRequest.onreadystatechange = function () {
                            if (myGetRequest.readyState === 4) {       // 383
                                if (myGetRequest.status === 200 || window.location.href.indexOf("http") === -1) {
                                    if (!myGetRequest.responseType || myGetRequest.responseType === "JSON" || myGetRequest.responseType === "json") {
                                        successCallback(jQuery.parseJSON(myGetRequest.responseText));
                                    } else if (myGetRequest.responseType === "XML" || myGetRequest.responseType === "xml") {
                                        successCallback(jQuery.parseXML(myGetRequest.responseText));
                                    }                                  //
                                } else {                               //
                                    if (failCallback) {                // 391
                                        failCallback();                // 392
                                    }                                  //
                                }                                      //
                            }                                          //
                        };                                             //
                        // get                                         //
                        if (queryMethod === "GET" || queryMethod === "get") {
                            try {                                      // 399
                                myGetRequest.open(queryMethod, queryURL + "?" + jQuery.param(queryData), true);
                            } catch (e) {                              //
                                alert("브라우저가 AJAX를 지원하지 않습니다. !\n인터넷 옵션->보안->사용자 지정 수준->도메인간 데이터 원본 엑세스->확인 혹은 사용으로 활성화해주세요");
                                return false;                          // 403
                            }                                          //
                        } else if (queryMethod === "POST" || queryMethod === "post") {
                            myGetRequest.open(queryMethod, queryURL, true);
                        }                                              //
                        myGetRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        myGetRequest.setRequestHeader('appkey', that._getAppkey());
                        // get                                         //
                        if (queryMethod === "GET" || queryMethod === "get") {
                            myGetRequest.send(null);                   // 412
                        } else if (queryMethod === "POST" || queryMethod === "post") {
                            // post                                    //
                            myGetRequest.send(jQuery.param(queryData));
                        }                                              //
                    } else {                                           //
                        // other browsers except IE browser ...        //
                        $.ajax(queryObject);                           // 417
                    }                                                  //
                    return this.SUCCESS_API;                           // 419
                } //end api                                            //
            }; // end of prototype                                     //
            // assign PlanetX object to window object                  //
            window.PlanetX = new PlanetX();                            // 423
        })(jQuery, window));                                           //
    });                                                                //
} else {                                                               //
    Meteor.startup(function () {});                                    // 428
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/fezvrasta_bootstrap-material-design/dist/js/material.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/* globals jQuery */                                                                                                 // 1
                                                                                                                     // 2
(function ($) {                                                                                                      // 3
  // Selector to select only not already processed elements                                                          // 4
  $.expr[":"].notmdproc = function (obj) {                                                                           // 5
    if ($(obj).data("mdproc")) {                                                                                     // 6
      return false;                                                                                                  // 7
    } else {                                                                                                         // 8
      return true;                                                                                                   // 9
    }                                                                                                                // 10
  };                                                                                                                 // 11
                                                                                                                     // 12
  function _isChar(evt) {                                                                                            // 13
    if (typeof evt.which == "undefined") {                                                                           // 14
      return true;                                                                                                   // 15
    } else if (typeof evt.which == "number" && evt.which > 0) {                                                      // 16
      return (                                                                                                       // 17
        !evt.ctrlKey                                                                                                 // 18
        && !evt.metaKey                                                                                              // 19
        && !evt.altKey                                                                                               // 20
        && evt.which != 8  // backspace                                                                              // 21
        && evt.which != 9  // tab                                                                                    // 22
        && evt.which != 13 // enter                                                                                  // 23
        && evt.which != 16 // shift                                                                                  // 24
        && evt.which != 17 // ctrl                                                                                   // 25
        && evt.which != 20 // caps lock                                                                              // 26
        && evt.which != 27 // escape                                                                                 // 27
      );                                                                                                             // 28
    }                                                                                                                // 29
    return false;                                                                                                    // 30
  }                                                                                                                  // 31
                                                                                                                     // 32
  function _addFormGroupFocus(element) {                                                                             // 33
    var $element = $(element);                                                                                       // 34
    if (!$element.prop('disabled')) {  // this is showing as undefined on chrome but works fine on firefox??         // 35
      $element.closest(".form-group").addClass("is-focused");                                                        // 36
    }                                                                                                                // 37
  }                                                                                                                  // 38
                                                                                                                     // 39
  function _toggleTypeFocus($input) {                                                                                // 40
    $input.closest('label').hover(function () {                                                                      // 41
      var $i = $(this).find('input');                                                                                // 42
      if (!$i.prop('disabled')) { // hack because the _addFormGroupFocus() wasn't identifying the property on chrome
        _addFormGroupFocus($i);     // need to find the input so we can check disablement                            // 44
      }                                                                                                              // 45
    }, function () {                                                                                                 // 46
      _removeFormGroupFocus($(this).find('input'));                                                                  // 47
    });                                                                                                              // 48
  }                                                                                                                  // 49
                                                                                                                     // 50
  function _removeFormGroupFocus(element) {                                                                          // 51
    $(element).closest(".form-group").removeClass("is-focused"); // remove class from form-group                     // 52
  }                                                                                                                  // 53
                                                                                                                     // 54
  $.material = {                                                                                                     // 55
    "options": {                                                                                                     // 56
      // These options set what will be started by $.material.init()                                                 // 57
      "validate": true,                                                                                              // 58
      "input": true,                                                                                                 // 59
      "ripples": true,                                                                                               // 60
      "checkbox": true,                                                                                              // 61
      "togglebutton": true,                                                                                          // 62
      "radio": true,                                                                                                 // 63
      "arrive": true,                                                                                                // 64
      "autofill": false,                                                                                             // 65
                                                                                                                     // 66
      "withRipples": [                                                                                               // 67
        ".btn:not(.btn-link)",                                                                                       // 68
        ".card-image",                                                                                               // 69
        ".navbar a:not(.withoutripple)",                                                                             // 70
        ".dropdown-menu a",                                                                                          // 71
        ".nav-tabs a:not(.withoutripple)",                                                                           // 72
        ".withripple",                                                                                               // 73
        ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"                                           // 74
      ].join(","),                                                                                                   // 75
      "inputElements": "input.form-control, textarea.form-control, select.form-control",                             // 76
      "checkboxElements": ".checkbox > label > input[type=checkbox]",                                                // 77
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",                                        // 78
      "radioElements": ".radio > label > input[type=radio]"                                                          // 79
    },                                                                                                               // 80
    "checkbox": function (selector) {                                                                                // 81
      // Add fake-checkbox to material checkboxes                                                                    // 82
      var $input = $((selector) ? selector : this.options.checkboxElements)                                          // 83
        .filter(":notmdproc")                                                                                        // 84
        .data("mdproc", true)                                                                                        // 85
        .after("<span class='checkbox-material'><span class='check'></span></span>");                                // 86
                                                                                                                     // 87
      _toggleTypeFocus($input);                                                                                      // 88
    },                                                                                                               // 89
    "togglebutton": function (selector) {                                                                            // 90
      // Add fake-checkbox to material checkboxes                                                                    // 91
      var $input = $((selector) ? selector : this.options.togglebuttonElements)                                      // 92
        .filter(":notmdproc")                                                                                        // 93
        .data("mdproc", true)                                                                                        // 94
        .after("<span class='toggle'></span>");                                                                      // 95
                                                                                                                     // 96
      _toggleTypeFocus($input);                                                                                      // 97
    },                                                                                                               // 98
    "radio": function (selector) {                                                                                   // 99
      // Add fake-radio to material radios                                                                           // 100
      var $input = $((selector) ? selector : this.options.radioElements)                                             // 101
        .filter(":notmdproc")                                                                                        // 102
        .data("mdproc", true)                                                                                        // 103
        .after("<span class='circle'></span><span class='check'></span>");                                           // 104
                                                                                                                     // 105
      _toggleTypeFocus($input);                                                                                      // 106
    },                                                                                                               // 107
    "input": function (selector) {                                                                                   // 108
      $((selector) ? selector : this.options.inputElements)                                                          // 109
        .filter(":notmdproc")                                                                                        // 110
        .data("mdproc", true)                                                                                        // 111
        .each(function () {                                                                                          // 112
          var $input = $(this);                                                                                      // 113
                                                                                                                     // 114
          // Requires form-group standard markup (will add it if necessary)                                          // 115
          var $formGroup = $input.closest(".form-group"); // note that form-group may be grandparent in the case of an input-group
          if ($formGroup.length === 0 && $input.attr('type') !== "hidden" && !$input.attr('hidden')) {               // 117
            $input.wrap("<div class='form-group'></div>");                                                           // 118
            $formGroup = $input.closest(".form-group"); // find node after attached (otherwise additional attachments don't work)
          }                                                                                                          // 120
                                                                                                                     // 121
          // Legacy - Add hint label if using the old shorthand data-hint attribute on the input                     // 122
          if ($input.attr("data-hint")) {                                                                            // 123
            $input.after("<p class='help-block'>" + $input.attr("data-hint") + "</p>");                              // 124
            $input.removeAttr("data-hint");                                                                          // 125
          }                                                                                                          // 126
                                                                                                                     // 127
          // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          var legacySizes = {                                                                                        // 129
            "input-lg": "form-group-lg",                                                                             // 130
            "input-sm": "form-group-sm"                                                                              // 131
          };                                                                                                         // 132
          $.each(legacySizes, function (legacySize, standardSize) {                                                  // 133
            if ($input.hasClass(legacySize)) {                                                                       // 134
              $input.removeClass(legacySize);                                                                        // 135
              $formGroup.addClass(standardSize);                                                                     // 136
            }                                                                                                        // 137
          });                                                                                                        // 138
                                                                                                                     // 139
          // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">     // 140
          if ($input.hasClass("floating-label")) {                                                                   // 141
            var placeholder = $input.attr("placeholder");                                                            // 142
            $input.attr("placeholder", null).removeClass("floating-label");                                          // 143
            var id = $input.attr("id");                                                                              // 144
            var forAttribute = "";                                                                                   // 145
            if (id) {                                                                                                // 146
              forAttribute = "for='" + id + "'";                                                                     // 147
            }                                                                                                        // 148
            $formGroup.addClass("label-floating");                                                                   // 149
            $input.after("<label " + forAttribute + "class='control-label'>" + placeholder + "</label>");            // 150
          }                                                                                                          // 151
                                                                                                                     // 152
          // Set as empty if is empty (damn I must improve this...)                                                  // 153
          if ($input.val() === null || $input.val() == "undefined" || $input.val() === "") {                         // 154
            $formGroup.addClass("is-empty");                                                                         // 155
          }                                                                                                          // 156
                                                                                                                     // 157
          // Add at the end of the form-group                                                                        // 158
          $formGroup.append("<span class='material-input'></span>");                                                 // 159
                                                                                                                     // 160
          // Support for file input                                                                                  // 161
          if ($formGroup.find("input[type=file]").length > 0) {                                                      // 162
            $formGroup.addClass("is-fileinput");                                                                     // 163
          }                                                                                                          // 164
        });                                                                                                          // 165
    },                                                                                                               // 166
    "attachInputEventHandlers": function () {                                                                        // 167
      var validate = this.options.validate;                                                                          // 168
                                                                                                                     // 169
      $(document)                                                                                                    // 170
        .on("change", ".checkbox input[type=checkbox]", function () {                                                // 171
          $(this).blur();                                                                                            // 172
        })                                                                                                           // 173
        .on("keydown paste", ".form-control", function (e) {                                                         // 174
          if (_isChar(e)) {                                                                                          // 175
            $(this).closest(".form-group").removeClass("is-empty");                                                  // 176
          }                                                                                                          // 177
        })                                                                                                           // 178
        .on("keyup change", ".form-control", function () {                                                           // 179
          var $input = $(this);                                                                                      // 180
          var $formGroup = $input.closest(".form-group");                                                            // 181
          var isValid = (typeof $input[0].checkValidity === "undefined" || $input[0].checkValidity());               // 182
                                                                                                                     // 183
          if ($input.val() === "") {                                                                                 // 184
            $formGroup.addClass("is-empty");                                                                         // 185
          }                                                                                                          // 186
          else {                                                                                                     // 187
            $formGroup.removeClass("is-empty");                                                                      // 188
          }                                                                                                          // 189
                                                                                                                     // 190
          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.                                                                              // 193
          //                                                                                                         // 194
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.                                              // 196
          if (validate) {                                                                                            // 197
            if (isValid) {                                                                                           // 198
              $formGroup.removeClass("has-error");                                                                   // 199
            }                                                                                                        // 200
            else {                                                                                                   // 201
              $formGroup.addClass("has-error");                                                                      // 202
            }                                                                                                        // 203
          }                                                                                                          // 204
        })                                                                                                           // 205
        .on("focus", ".form-control, .form-group.is-fileinput", function () {                                        // 206
          _addFormGroupFocus(this);                                                                                  // 207
        })                                                                                                           // 208
        .on("blur", ".form-control, .form-group.is-fileinput", function () {                                         // 209
          _removeFormGroupFocus(this);                                                                               // 210
        })                                                                                                           // 211
        // make sure empty is added back when there is a programmatic value change.                                  // 212
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on("change", ".form-group input", function () {                                                             // 214
          var $input = $(this);                                                                                      // 215
          if ($input.attr("type") == "file") {                                                                       // 216
            return;                                                                                                  // 217
          }                                                                                                          // 218
                                                                                                                     // 219
          var $formGroup = $input.closest(".form-group");                                                            // 220
          var value = $input.val();                                                                                  // 221
          if (value) {                                                                                               // 222
            $formGroup.removeClass("is-empty");                                                                      // 223
          } else {                                                                                                   // 224
            $formGroup.addClass("is-empty");                                                                         // 225
          }                                                                                                          // 226
        })                                                                                                           // 227
        // set the fileinput readonly field with the name of the file                                                // 228
        .on("change", ".form-group.is-fileinput input[type='file']", function () {                                   // 229
          var $input = $(this);                                                                                      // 230
          var $formGroup = $input.closest(".form-group");                                                            // 231
          var value = "";                                                                                            // 232
          $.each(this.files, function (i, file) {                                                                    // 233
            value += file.name + ", ";                                                                               // 234
          });                                                                                                        // 235
          value = value.substring(0, value.length - 2);                                                              // 236
          if (value) {                                                                                               // 237
            $formGroup.removeClass("is-empty");                                                                      // 238
          } else {                                                                                                   // 239
            $formGroup.addClass("is-empty");                                                                         // 240
          }                                                                                                          // 241
          $formGroup.find("input.form-control[readonly]").val(value);                                                // 242
        });                                                                                                          // 243
    },                                                                                                               // 244
    "ripples": function (selector) {                                                                                 // 245
      $((selector) ? selector : this.options.withRipples).ripples();                                                 // 246
    },                                                                                                               // 247
    "autofill": function () {                                                                                        // 248
      // This part of code will detect autofill when the page is loading (username and password inputs for example)  // 249
      var loading = setInterval(function () {                                                                        // 250
        $("input[type!=checkbox]").each(function () {                                                                // 251
          var $this = $(this);                                                                                       // 252
          if ($this.val() && $this.val() !== $this.attr("value")) {                                                  // 253
            $this.trigger("change");                                                                                 // 254
          }                                                                                                          // 255
        });                                                                                                          // 256
      }, 100);                                                                                                       // 257
                                                                                                                     // 258
      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them      // 259
      setTimeout(function () {                                                                                       // 260
        clearInterval(loading);                                                                                      // 261
      }, 10000);                                                                                                     // 262
    },                                                                                                               // 263
    "attachAutofillEventHandlers": function () {                                                                     // 264
      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;                                                                                                   // 266
      $(document)                                                                                                    // 267
        .on("focus", "input", function () {                                                                          // 268
          var $inputs = $(this).parents("form").find("input").not("[type=file]");                                    // 269
          focused = setInterval(function () {                                                                        // 270
            $inputs.each(function () {                                                                               // 271
              var $this = $(this);                                                                                   // 272
              if ($this.val() !== $this.attr("value")) {                                                             // 273
                $this.trigger("change");                                                                             // 274
              }                                                                                                      // 275
            });                                                                                                      // 276
          }, 100);                                                                                                   // 277
        })                                                                                                           // 278
        .on("blur", ".form-group input", function () {                                                               // 279
          clearInterval(focused);                                                                                    // 280
        });                                                                                                          // 281
    },                                                                                                               // 282
    "init": function (options) {                                                                                     // 283
      this.options = $.extend({}, this.options, options);                                                            // 284
      var $document = $(document);                                                                                   // 285
                                                                                                                     // 286
      if ($.fn.ripples && this.options.ripples) {                                                                    // 287
        this.ripples();                                                                                              // 288
      }                                                                                                              // 289
      if (this.options.input) {                                                                                      // 290
        this.input();                                                                                                // 291
        this.attachInputEventHandlers();                                                                             // 292
      }                                                                                                              // 293
      if (this.options.checkbox) {                                                                                   // 294
        this.checkbox();                                                                                             // 295
      }                                                                                                              // 296
      if (this.options.togglebutton) {                                                                               // 297
        this.togglebutton();                                                                                         // 298
      }                                                                                                              // 299
      if (this.options.radio) {                                                                                      // 300
        this.radio();                                                                                                // 301
      }                                                                                                              // 302
      if (this.options.autofill) {                                                                                   // 303
        this.autofill();                                                                                             // 304
        this.attachAutofillEventHandlers();                                                                          // 305
      }                                                                                                              // 306
                                                                                                                     // 307
      if (document.arrive && this.options.arrive) {                                                                  // 308
        if ($.fn.ripples && this.options.ripples) {                                                                  // 309
          $document.arrive(this.options.withRipples, function () {                                                   // 310
            $.material.ripples($(this));                                                                             // 311
          });                                                                                                        // 312
        }                                                                                                            // 313
        if (this.options.input) {                                                                                    // 314
          $document.arrive(this.options.inputElements, function () {                                                 // 315
            $.material.input($(this));                                                                               // 316
          });                                                                                                        // 317
        }                                                                                                            // 318
        if (this.options.checkbox) {                                                                                 // 319
          $document.arrive(this.options.checkboxElements, function () {                                              // 320
            $.material.checkbox($(this));                                                                            // 321
          });                                                                                                        // 322
        }                                                                                                            // 323
        if (this.options.radio) {                                                                                    // 324
          $document.arrive(this.options.radioElements, function () {                                                 // 325
            $.material.radio($(this));                                                                               // 326
          });                                                                                                        // 327
        }                                                                                                            // 328
        if (this.options.togglebutton) {                                                                             // 329
          $document.arrive(this.options.togglebuttonElements, function () {                                          // 330
            $.material.togglebutton($(this));                                                                        // 331
          });                                                                                                        // 332
        }                                                                                                            // 333
                                                                                                                     // 334
      }                                                                                                              // 335
    }                                                                                                                // 336
  };                                                                                                                 // 337
                                                                                                                     // 338
})(jQuery);                                                                                                          // 339
                                                                                                                     // 340
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/fezvrasta_bootstrap-material-design/dist/js/ripples.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals jQuery, navigator */                                                                                      // 2
                                                                                                                     // 3
(function($, window, document, undefined) {                                                                          // 4
                                                                                                                     // 5
  "use strict";                                                                                                      // 6
                                                                                                                     // 7
  /**                                                                                                                // 8
   * Define the name of the plugin                                                                                   // 9
   */                                                                                                                // 10
  var ripples = "ripples";                                                                                           // 11
                                                                                                                     // 12
                                                                                                                     // 13
  /**                                                                                                                // 14
   * Get an instance of the plugin                                                                                   // 15
   */                                                                                                                // 16
  var self = null;                                                                                                   // 17
                                                                                                                     // 18
                                                                                                                     // 19
  /**                                                                                                                // 20
   * Define the defaults of the plugin                                                                               // 21
   */                                                                                                                // 22
  var defaults = {};                                                                                                 // 23
                                                                                                                     // 24
                                                                                                                     // 25
  /**                                                                                                                // 26
   * Create the main plugin function                                                                                 // 27
   */                                                                                                                // 28
  function Ripples(element, options) {                                                                               // 29
    self = this;                                                                                                     // 30
                                                                                                                     // 31
    this.element = $(element);                                                                                       // 32
                                                                                                                     // 33
    this.options = $.extend({}, defaults, options);                                                                  // 34
                                                                                                                     // 35
    this._defaults = defaults;                                                                                       // 36
    this._name = ripples;                                                                                            // 37
                                                                                                                     // 38
    this.init();                                                                                                     // 39
  }                                                                                                                  // 40
                                                                                                                     // 41
                                                                                                                     // 42
  /**                                                                                                                // 43
   * Initialize the plugin                                                                                           // 44
   */                                                                                                                // 45
  Ripples.prototype.init = function() {                                                                              // 46
    var $element  = this.element;                                                                                    // 47
                                                                                                                     // 48
    $element.on("mousedown touchstart", function(event) {                                                            // 49
      /**                                                                                                            // 50
       * Verify if the user is just touching on a device and return if so                                            // 51
       */                                                                                                            // 52
      if(self.isTouch() && event.type === "mousedown") {                                                             // 53
        return;                                                                                                      // 54
      }                                                                                                              // 55
                                                                                                                     // 56
                                                                                                                     // 57
      /**                                                                                                            // 58
       * Verify if the current element already has a ripple wrapper element and                                      // 59
       * creates if it doesn't                                                                                       // 60
       */                                                                                                            // 61
      if(!($element.find(".ripple-container").length)) {                                                             // 62
        $element.append("<div class=\"ripple-container\"></div>");                                                   // 63
      }                                                                                                              // 64
                                                                                                                     // 65
                                                                                                                     // 66
      /**                                                                                                            // 67
       * Find the ripple wrapper                                                                                     // 68
       */                                                                                                            // 69
      var $wrapper = $element.children(".ripple-container");                                                         // 70
                                                                                                                     // 71
                                                                                                                     // 72
      /**                                                                                                            // 73
       * Get relY and relX positions                                                                                 // 74
       */                                                                                                            // 75
      var relY = self.getRelY($wrapper, event);                                                                      // 76
      var relX = self.getRelX($wrapper, event);                                                                      // 77
                                                                                                                     // 78
                                                                                                                     // 79
      /**                                                                                                            // 80
       * If relY and/or relX are false, return the event                                                             // 81
       */                                                                                                            // 82
      if(!relY && !relX) {                                                                                           // 83
        return;                                                                                                      // 84
      }                                                                                                              // 85
                                                                                                                     // 86
                                                                                                                     // 87
      /**                                                                                                            // 88
       * Get the ripple color                                                                                        // 89
       */                                                                                                            // 90
      var rippleColor = self.getRipplesColor($element);                                                              // 91
                                                                                                                     // 92
                                                                                                                     // 93
      /**                                                                                                            // 94
       * Create the ripple element                                                                                   // 95
       */                                                                                                            // 96
      var $ripple = $("<div></div>");                                                                                // 97
                                                                                                                     // 98
      $ripple                                                                                                        // 99
      .addClass("ripple")                                                                                            // 100
      .css({                                                                                                         // 101
        "left": relX,                                                                                                // 102
        "top": relY,                                                                                                 // 103
        "background-color": rippleColor                                                                              // 104
      });                                                                                                            // 105
                                                                                                                     // 106
                                                                                                                     // 107
      /**                                                                                                            // 108
       * Append the ripple to the wrapper                                                                            // 109
       */                                                                                                            // 110
      $wrapper.append($ripple);                                                                                      // 111
                                                                                                                     // 112
                                                                                                                     // 113
      /**                                                                                                            // 114
       * Make sure the ripple has the styles applied (ugly hack but it works)                                        // 115
       */                                                                                                            // 116
      (function() { return window.getComputedStyle($ripple[0]).opacity; })();                                        // 117
                                                                                                                     // 118
                                                                                                                     // 119
      /**                                                                                                            // 120
       * Turn on the ripple animation                                                                                // 121
       */                                                                                                            // 122
      self.rippleOn($element, $ripple);                                                                              // 123
                                                                                                                     // 124
                                                                                                                     // 125
      /**                                                                                                            // 126
       * Call the rippleEnd function when the transition "on" ends                                                   // 127
       */                                                                                                            // 128
      setTimeout(function() {                                                                                        // 129
        self.rippleEnd($ripple);                                                                                     // 130
      }, 500);                                                                                                       // 131
                                                                                                                     // 132
                                                                                                                     // 133
      /**                                                                                                            // 134
       * Detect when the user leaves the element                                                                     // 135
       */                                                                                                            // 136
      $element.on("mouseup mouseleave touchend", function() {                                                        // 137
        $ripple.data("mousedown", "off");                                                                            // 138
                                                                                                                     // 139
        if($ripple.data("animating") === "off") {                                                                    // 140
          self.rippleOut($ripple);                                                                                   // 141
        }                                                                                                            // 142
      });                                                                                                            // 143
                                                                                                                     // 144
    });                                                                                                              // 145
  };                                                                                                                 // 146
                                                                                                                     // 147
                                                                                                                     // 148
  /**                                                                                                                // 149
   * Get the new size based on the element height/width and the ripple width                                         // 150
   */                                                                                                                // 151
  Ripples.prototype.getNewSize = function($element, $ripple) {                                                       // 152
                                                                                                                     // 153
    return (Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth()) * 2.5;                   // 154
  };                                                                                                                 // 155
                                                                                                                     // 156
                                                                                                                     // 157
  /**                                                                                                                // 158
   * Get the relX                                                                                                    // 159
   */                                                                                                                // 160
  Ripples.prototype.getRelX = function($wrapper,  event) {                                                           // 161
    var wrapperOffset = $wrapper.offset();                                                                           // 162
                                                                                                                     // 163
    if(!self.isTouch()) {                                                                                            // 164
      /**                                                                                                            // 165
       * Get the mouse position relative to the ripple wrapper                                                       // 166
       */                                                                                                            // 167
      return event.pageX - wrapperOffset.left;                                                                       // 168
    } else {                                                                                                         // 169
      /**                                                                                                            // 170
       * Make sure the user is using only one finger and then get the touch                                          // 171
       * position relative to the ripple wrapper                                                                     // 172
       */                                                                                                            // 173
      event = event.originalEvent;                                                                                   // 174
                                                                                                                     // 175
      if(event.touches.length === 1) {                                                                               // 176
        return event.touches[0].pageX - wrapperOffset.left;                                                          // 177
      }                                                                                                              // 178
                                                                                                                     // 179
      return false;                                                                                                  // 180
    }                                                                                                                // 181
  };                                                                                                                 // 182
                                                                                                                     // 183
                                                                                                                     // 184
  /**                                                                                                                // 185
   * Get the relY                                                                                                    // 186
   */                                                                                                                // 187
  Ripples.prototype.getRelY = function($wrapper, event) {                                                            // 188
    var wrapperOffset = $wrapper.offset();                                                                           // 189
                                                                                                                     // 190
    if(!self.isTouch()) {                                                                                            // 191
      /**                                                                                                            // 192
       * Get the mouse position relative to the ripple wrapper                                                       // 193
       */                                                                                                            // 194
      return event.pageY - wrapperOffset.top;                                                                        // 195
    } else {                                                                                                         // 196
      /**                                                                                                            // 197
       * Make sure the user is using only one finger and then get the touch                                          // 198
       * position relative to the ripple wrapper                                                                     // 199
       */                                                                                                            // 200
      event = event.originalEvent;                                                                                   // 201
                                                                                                                     // 202
      if(event.touches.length === 1) {                                                                               // 203
        return event.touches[0].pageY - wrapperOffset.top;                                                           // 204
      }                                                                                                              // 205
                                                                                                                     // 206
      return false;                                                                                                  // 207
    }                                                                                                                // 208
  };                                                                                                                 // 209
                                                                                                                     // 210
                                                                                                                     // 211
  /**                                                                                                                // 212
   * Get the ripple color                                                                                            // 213
   */                                                                                                                // 214
  Ripples.prototype.getRipplesColor = function($element) {                                                           // 215
                                                                                                                     // 216
    var color = $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;
                                                                                                                     // 218
    return color;                                                                                                    // 219
  };                                                                                                                 // 220
                                                                                                                     // 221
                                                                                                                     // 222
  /**                                                                                                                // 223
   * Verify if the client browser has transistion support                                                            // 224
   */                                                                                                                // 225
  Ripples.prototype.hasTransitionSupport = function() {                                                              // 226
    var thisBody  = document.body || document.documentElement;                                                       // 227
    var thisStyle = thisBody.style;                                                                                  // 228
                                                                                                                     // 229
    var support = (                                                                                                  // 230
      thisStyle.transition !== undefined ||                                                                          // 231
      thisStyle.WebkitTransition !== undefined ||                                                                    // 232
      thisStyle.MozTransition !== undefined ||                                                                       // 233
      thisStyle.MsTransition !== undefined ||                                                                        // 234
      thisStyle.OTransition !== undefined                                                                            // 235
    );                                                                                                               // 236
                                                                                                                     // 237
    return support;                                                                                                  // 238
  };                                                                                                                 // 239
                                                                                                                     // 240
                                                                                                                     // 241
  /**                                                                                                                // 242
   * Verify if the client is using a mobile device                                                                   // 243
   */                                                                                                                // 244
  Ripples.prototype.isTouch = function() {                                                                           // 245
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);               // 246
  };                                                                                                                 // 247
                                                                                                                     // 248
                                                                                                                     // 249
  /**                                                                                                                // 250
   * End the animation of the ripple                                                                                 // 251
   */                                                                                                                // 252
  Ripples.prototype.rippleEnd = function($ripple) {                                                                  // 253
    $ripple.data("animating", "off");                                                                                // 254
                                                                                                                     // 255
    if($ripple.data("mousedown") === "off") {                                                                        // 256
      self.rippleOut($ripple);                                                                                       // 257
    }                                                                                                                // 258
  };                                                                                                                 // 259
                                                                                                                     // 260
                                                                                                                     // 261
  /**                                                                                                                // 262
   * Turn off the ripple effect                                                                                      // 263
   */                                                                                                                // 264
  Ripples.prototype.rippleOut = function($ripple) {                                                                  // 265
    $ripple.off();                                                                                                   // 266
                                                                                                                     // 267
    if(self.hasTransitionSupport()) {                                                                                // 268
      $ripple.addClass("ripple-out");                                                                                // 269
    } else {                                                                                                         // 270
      $ripple.animate({"opacity": 0}, 100, function() {                                                              // 271
        $ripple.trigger("transitionend");                                                                            // 272
      });                                                                                                            // 273
    }                                                                                                                // 274
                                                                                                                     // 275
    $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {                      // 276
      $ripple.remove();                                                                                              // 277
    });                                                                                                              // 278
  };                                                                                                                 // 279
                                                                                                                     // 280
                                                                                                                     // 281
  /**                                                                                                                // 282
   * Turn on the ripple effect                                                                                       // 283
   */                                                                                                                // 284
  Ripples.prototype.rippleOn = function($element, $ripple) {                                                         // 285
    var size = self.getNewSize($element, $ripple);                                                                   // 286
                                                                                                                     // 287
    if(self.hasTransitionSupport()) {                                                                                // 288
      $ripple                                                                                                        // 289
      .css({                                                                                                         // 290
        "-ms-transform": "scale(" + size + ")",                                                                      // 291
        "-moz-transform": "scale(" + size + ")",                                                                     // 292
        "-webkit-transform": "scale(" + size + ")",                                                                  // 293
        "transform": "scale(" + size + ")"                                                                           // 294
      })                                                                                                             // 295
      .addClass("ripple-on")                                                                                         // 296
      .data("animating", "on")                                                                                       // 297
      .data("mousedown", "on");                                                                                      // 298
    } else {                                                                                                         // 299
      $ripple.animate({                                                                                              // 300
        "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,                                        // 301
        "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,                                       // 302
        "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),                               // 303
        "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),                                // 304
        "opacity": 0.2                                                                                               // 305
      }, 500, function() {                                                                                           // 306
        $ripple.trigger("transitionend");                                                                            // 307
      });                                                                                                            // 308
    }                                                                                                                // 309
  };                                                                                                                 // 310
                                                                                                                     // 311
                                                                                                                     // 312
  /**                                                                                                                // 313
   * Create the jquery plugin function                                                                               // 314
   */                                                                                                                // 315
  $.fn.ripples = function(options) {                                                                                 // 316
    return this.each(function() {                                                                                    // 317
      if(!$.data(this, "plugin_" + ripples)) {                                                                       // 318
        $.data(this, "plugin_" + ripples, new Ripples(this, options));                                               // 319
      }                                                                                                              // 320
    });                                                                                                              // 321
  };                                                                                                                 // 322
                                                                                                                     // 323
})(jQuery, window, document);                                                                                        // 324
                                                                                                                     // 325
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/fezvrasta_bootstrap-material-design/meteor/init.js                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 1
  $.material.init();                                                                                                 // 2
});                                                                                                                  // 3
                                                                                                                     // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fezvrasta:bootstrap-material-design'] = {};

})();

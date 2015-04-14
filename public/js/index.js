(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MaydayVisitor = require('./MaydayVisitor');

window.visitor = new MaydayVisitor();

window.exampleResetExampleInfo = function() {
    visitor.addInfo({
      'uuid': 'abcd-1234-5678-efgh',
      'first_name': 'joseph',
      'last_name': 'smith',
      'is_volunteer': false,
      'actions': [
        {
          'name': 'email_zip',
          'order': 0,
          'completed': true,
          'template_id': 'md_action_email_zip',
        },
        {
          'name': 'research',
          'order': 1,
          'completed': false,
          'template_id': 'md_action_research'
        }
      ]
    });

    updateLog();
};

window.exampleVolunteer = function() {
    visitor.addInfo({
        is_volunteer: true
    });

    updateLog();
};

window.exampleCompleteResearchAction = function() {
    visitor.addAction({
        'name': 'research',
        'completed': true,
        'template_id': 'md_action_research'
    });

    updateLog();
};

window.exampleSuggestTemplate = function() {
    var template = visitor.suggestTemplate();

    alert('Suggested Template:\n' + template);

    updateLog();
};

window.examplePrefillForm = function() {
    visitor.populateForm('#example-form');
};

window.updateLog = function() {
    document.querySelector('#log').textContent = JSON.stringify(visitor.info);
};

updateLog();

},{"./MaydayVisitor":2}],2:[function(require,module,exports){
function MaydayVisitor() {
    // Let's start with a clean slate.
    this.info = {
        actions: []
    };

    // Load info from the client's localStorage.
    this.loadFromClient();
}

MaydayVisitor.prototype.loadFromClient = function() {
    if (localStorage.maydayVisitorInfo) {
        try {
            var info = JSON.parse(localStorage.maydayVisitorInfo);
            this.addInfo(info);
        } catch(e) {
            // There was an issue parsing the saved JSON.
        }
    }
};

MaydayVisitor.prototype.saveToClient = function() {
    // Before saving to localStorage, we'll need to convert the info Object into a string of JSON.
    localStorage.maydayVisitorInfo = JSON.stringify(this.info);
};

MaydayVisitor.prototype.loadFromServer = function() {
    // TODO: Load from the server...
};

MaydayVisitor.prototype.saveToServer = function() {
    // TODO: Save to the server...
};

MaydayVisitor.prototype.save = function() {
    this.saveToClient();

    // If the necessary fields are present, let's save to the server.
    if (this.hasRequiredInfo()) {
        this.saveToServer();
    }
};

MaydayVisitor.prototype.addAction = function(action) {
    // Figure out this action's order.
    action.order = this.info.actions.length;
    this.info.actions.push(action);
    this.save();
};

MaydayVisitor.prototype.addInfo = function(info) {
    // Accept an Object as input, merging each key & value into the instance's `info` Object.
    // Note: This does mean the entire `actions` array can be overwritten.
    for (var key in info) {
        this.info[key] = info[key];
    }

    this.save();
};

MaydayVisitor.prototype.populateForm = function(target) {
    var form;

    // Accept either a CSS selector string, or a DOM element reference.
    if (typeof target === 'string') {
        form = document.querySelector(target);
    } else {
        form = target;
    }

    // Fill inputs. We might want to add prefixes to the input DOM id's.
    for (var key in this.info) {
        var element = form.querySelector('#' + key);
        if (element) {
            element.value = this.info[key];
        }
    }
};

// These fields are required, before saving to the server.
MaydayVisitor.prototype.requiredInfoForServer = [
    'email',
    'phone'
];

// Does the `info` Object contain enough information for the server?
MaydayVisitor.prototype.hasRequiredInfo = function() {
    for (var i = 0; i < this.requiredInfoForServer.length; i++) {
        if (this.info[this.requiredInfoForServer[i]] === undefined) {
            return false;
        }
    }

    return true;
};

// This template will be suggested if every other suggested template has been completed.
MaydayVisitor.prototype.defaultTemplate = 'md_action_thanks';

// Sequence of templates to suggest.
MaydayVisitor.prototype.suggestedTemplates = [
    'md_action_email_zip',
    'md_action_research'
];

// Scan the `info.actions` Array, and don't suggest a template that has already been completed.
MaydayVisitor.prototype.suggestTemplate = function() {
    var actions = [];
    for (var i = 0; i < this.info.actions.length; i++) {
        if (this.info.actions[i].completed) {
            actions.push(this.info.actions[i].template_id);
        }
    }

    for (var i = 0; i < this.suggestedTemplates.length; i++) {
        if (actions.indexOf(this.suggestedTemplates[i]) === -1) {
            return this.suggestedTemplates[i];
        }
    }

    return this.defaultTemplate;
};

// Exporting the constructor function for the MaydayVisitor class, the CommonJS way.
module.exports = MaydayVisitor;

},{}]},{},[1]);

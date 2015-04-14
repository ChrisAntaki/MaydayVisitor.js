(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MaydayVisitor = require('./MaydayVisitor');

window.visitor = new MaydayVisitor();

window.updateLog = function() {
    document.querySelector('#log').textContent = JSON.stringify(visitor.info);
};

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

window.example

updateLog();

},{"./MaydayVisitor":2}],2:[function(require,module,exports){
function MaydayVisitor() {
    this.info = {
        actions: []
    };

    this.loadFromClient();
}

MaydayVisitor.prototype.loadFromClient = function() {
    if (localStorage.maydayVisitorInfo) {
        try {
            var info = JSON.parse(localStorage.maydayVisitorInfo);
            this.addInfo(info);
        } catch(e) {
            // Parsing error
        }
    }
};

MaydayVisitor.prototype.saveToClient = function() {
    localStorage.maydayVisitorInfo = JSON.stringify(this.info);
};

MaydayVisitor.prototype.loadFromServer = function() {
    // Load from the server
};

MaydayVisitor.prototype.saveToServer = function() {
    // Save to the server
};

MaydayVisitor.prototype.save = function() {
    this.saveToClient();

    if (this.hasRequiredInfo()) {
        this.saveToServer();
    }
};

MaydayVisitor.prototype.addAction = function(action) {
    action.order = this.info.actions.length;
    this.info.actions.push(action);
    this.save();
};

MaydayVisitor.prototype.addInfo = function(info) {
    for (var key in info) {
        this.info[key] = info[key];
    }

    this.save();
};

MaydayVisitor.prototype.populateForm = function(target) {
    var form;

    if (typeof target === 'string') {
        form = document.querySelector(target);
    } else {
        form = target;
    }

    for (var key in this.info) {
        var element = form.querySelector('#' + key);
        if (element) {
            element.value = this.info[key];
        }
    }
};

MaydayVisitor.prototype.requiredInfoForServer = [
    'email',
    'phone'
];

MaydayVisitor.prototype.hasRequiredInfo = function() {
    for (var i = 0; i < this.requiredInfoForServer.length; i++) {
        if (this.info[this.requiredInfoForServer[i]] === undefined) {
            return false;
        }
    }

    return true;
};

MaydayVisitor.prototype.defaultTemplate = 'md_action_thanks';

MaydayVisitor.prototype.suggestedTemplates = [
    'md_action_email_zip',
    'md_action_research'
];

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

module.exports = MaydayVisitor;

},{}]},{},[1]);

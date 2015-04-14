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

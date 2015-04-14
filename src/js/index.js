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

updateLog();

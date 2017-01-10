angular.module(
    'ArgumentationController').config(function ($translateProvider) {
    $translateProvider.translations('en', {
        TITLE: 'Hello',
        FOO: 'This is a paragraph.',
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_DE: 'german',
        SWITCH_INSTRUCTIONS: 'Check two arguments and press: ',
        SWITCH_HEADER: 'Switch Arguments',
        SWITCH_BUTTON: 'Switch',
        SAVE: 'Save',
        ADD_ARGUMENT: 'Add Argument',
        DELETE_HEADER: 'Delete Argument',
        DELETE_INSTRUCTIONS: 'Check an argument and press: ',
        DELETE_BUTTON: 'Delete'
    });
    $translateProvider.translations('de', {
        TITLE: 'Hallo',
        FOO: 'Dies ist ein Paragraph.',
        BUTTON_LANG_EN: 'englisch',
        BUTTON_LANG_DE: 'deutsch',
        SWITCH_INSTRUCTIONS: 'Wähle zwei Argumente aus und drücke: ',
        SWITCH_HEADER: 'Argumente tauschen',
        SWITCH_BUTTON: 'Tauschen',
        SAVE: 'Speichern',
        ADD_ARGUMENT: 'Argument hinzufügen',
        DELETE_HEADER: 'Argument löschen',
        DELETE_INSTRUCTIONS: 'Wähle ein Argument aus und drücke: ',
        DELETE_BUTTON: 'Löschen'
    });
    $translateProvider.preferredLanguage('de');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
});

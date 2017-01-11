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
        DELETE_BUTTON: 'Delete',
        ARGUMENTS: 'Arguments',
        BY: 'By',
        SEARCH: 'Search',
        SEARCH_EXAMPLE: 'Enter Searchterms, eg: Ethics Utilitarism Mill',
        NEXT: 'Next',
        PREVIOUS: 'Previous',
        VIEW_ARGUMENTATION: 'View Argumentation',
        ADDED_ARGUMENT: 'Argument has been added!',
        SAVED: 'Saved!',
        DELETE_ALERT_TITLE: 'Are you sure?',
        DELETE_ALERT_TEXT: 'You will not be able to recover this argument!',
        DELETE_ALERT_CONFIRM: 'Yes, delete it!',
        DELETE_ALERT_CANCEL: "No, don't! ",
        DELETE_ALERT_DELETED: "Argument has been deleted!"
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
        DELETE_BUTTON: 'Löschen',
        ARGUMENTS: 'Argumente',
        BY: 'Von',
        SEARCH: 'Suchen',
        SEARCH_EXAMPLE: 'Suchwörter eingeben, z.B. Ethik Utilitarismus Mill',
        NEXT: 'Weiter',
        PREVIOUS: 'Zurück',
        VIEW_ARGUMENTATION: 'Zur Argumentation',
        ADDED_ARGUMENT: 'Argument wurde hinzugefügt!',
        SAVED: 'Gespeichert!',
        DELETE_ALERT_TITLE: 'Sind Sie sicher?',
        DELETE_ALERT_TEXT: 'Das Argument kann danach nicht mehr wiederhergestellt werden!',
        DELETE_ALERT_CONFIRM: 'Ja, löschen!',
        DELETE_ALERT_CANCEL: "Abbrechen",
        DELETE_ALERT_DELETED: "Argument wurde gelöscht!"
    });
    $translateProvider.preferredLanguage('de');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
});

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
        NOTSAVED: 'Save *',
        ADD_ARGUMENT: 'Add Argument',
        DELETE_HEADER: 'Delete Argument',
        DELETE_INSTRUCTIONS: 'Check an argument and press: ',
        DELETE_BUTTON: 'Delete',
        ARGUMENTATIONS: "Argumentations",
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
        DELETE_ARGUMENTATION_ALERT_TEXT: 'You will not be able to recover this argumentation!',
        DELETE_ALERT_CONFIRM: 'Yes, delete it!',
        DELETE_ALERT_CANCEL: "No, don't! ",
        DELETE_ALERT_DELETED: "Argument has been deleted!",
        DELETE_ARGUMENTATION_ALERT_DELETED: "Argumentation has been deleted!",
        OVERVIEW: "Overview",
        OVERVIEW_COMMENT: "All your Argumentations and Comments",
        EDIT: "Edit",
        LEAVE_EDIT: "Leave Edit Mode",
        CREATE_ARGUMENTATION: "Create Argumentation",
        SHOW: "Show",
        UNSAVED_CHANGES: "Unsaved Changes",
        UNSAVED_CHANGES_COMMENT: "If you leave this page without saving, all changes will be lost",
        UNSAVED_CHANGES_CONFIRM: "Yes, proceed anyway",
        BACK: "Back"


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
        NOTSAVED: 'Speichern *',
        ADD_ARGUMENT: 'Argument hinzufügen',
        DELETE_HEADER: 'Argument löschen',
        DELETE_INSTRUCTIONS: 'Wähle ein Argument aus und drücke: ',
        DELETE_BUTTON: 'Löschen',
        ARGUMENTATIONS: "Argumentationen",
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
        DELETE_ARGUMENTATION_ALERT_TEXT: 'Die Argumentation kann danach nicht mehr wiederhergestellt werden!',
        DELETE_ALERT_CONFIRM: 'Ja, löschen!',
        DELETE_ALERT_CANCEL: "Abbrechen",
        DELETE_ALERT_DELETED: "Argument wurde gelöscht!",
        DELETE_ARGUMENTATION_ALERT_DELETED: "Argumentation wurde gelöscht!",
        OVERVIEW: "Übersicht",
        OVERVIEW_COMMENT: "Deine Argumentationen und Kommentare",
        EDIT: "Bearbeiten",
        LEAVE_EDIT: "Editiermodus verlassen",
        CREATE_ARGUMENTATION: "Argumentation erstellen",
        SHOW: "Zeigen",
        UNSAVED_CHANGES: "Ungespeicherte Veränderungen",
        UNSAVED_CHANGES_COMMENT: "Alle Veränderungen gehen verloren, wenn Sie nicht speichern",
        UNSAVED_CHANGES_CONFIRM: "Ja, Veränderungen nicht speichern",
        BACK: "Zurück"
    });
    $translateProvider.preferredLanguage('de');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
});

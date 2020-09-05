import { Application } from "stimulus";
import Turbolinks from "turbolinks";
Turbolinks.start();

// no-conflict mode
window.$ = window.jQuery.noConflict();

// Add stimulus app instance to global context
window.ttApp = Application.start();
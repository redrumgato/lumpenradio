'use strict';

require("Styles/main.scss");

var Pjax = require("pjax");

new Pjax({ selectors: ["title", "main", ".menu"] });


System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Seek;
    return {
        setters:[],
        execute: function() {
            (function (Seek) {
                Seek[Seek["Forward"] = 0] = "Forward";
                Seek[Seek["Backward"] = 1] = "Backward";
                Seek[Seek["Beginning"] = 2] = "Beginning";
                Seek[Seek["Score"] = 3] = "Score";
            })(Seek || (Seek = {}));
            exports_1("Seek", Seek);
        }
    }
});
//# sourceMappingURL=Seek.js.map
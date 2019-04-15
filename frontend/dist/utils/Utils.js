"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=Utils.js.map
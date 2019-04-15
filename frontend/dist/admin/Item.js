"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prefix_1 = require("./Prefix");
function getEmptyItem() {
    return {
        name: '',
        strengthRequired: 0,
        agilityRequired: 0,
        intelligenceRequired: 0,
        damage: 0,
        defense: 0,
        evasion: 0,
        wisdom: 0,
        itemType: '',
        prefix: Prefix_1.getEmptyPrefix(),
    };
}
exports.getEmptyItem = getEmptyItem;
//# sourceMappingURL=Item.js.map
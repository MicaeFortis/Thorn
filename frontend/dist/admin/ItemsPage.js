"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var React = require("react");
var Item_1 = require("./Item");
var Utils_1 = require("./../utils/Utils");
require("./items.css");
var Option = antd_1.Select.Option;
var FormItem = antd_1.Form.Item;
var getInitialState = function () {
    return {
        items: [],
        itemTypes: [],
        prefixes: [],
        item: Item_1.getEmptyItem(),
        editItemVisible: false,
        deleteItemVisible: false,
    };
};
var ItemsPage = /** @class */ (function (_super) {
    __extends(ItemsPage, _super);
    function ItemsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = getInitialState();
        _this.getColumns = function () {
            return [{
                    title: 'Item Name',
                    key: 'name',
                    render: function (text, record) { return (React.createElement("span", null,
                        React.createElement("span", { style: { color: 'red' } },
                            _this.getPrefixNameFromRecord(record),
                            " "),
                        record.name)); }
                }, {
                    title: React.createElement("span", { style: { color: 'orange' } }, "Strength Required"),
                    key: 'strengthRequired',
                    dataIndex: 'strengthRequired',
                }, {
                    title: React.createElement("span", { style: { color: 'green' } }, "Damage Given"),
                    key: 'damage',
                    render: function (text, record) { return (React.createElement("span", null,
                        record.damage,
                        " ",
                        React.createElement("span", { style: { color: 'red' } }, _this.getAdditionalValueForStatisticIfAny(record, 'DAMAGE')))); }
                }, {
                    title: React.createElement("span", { style: { color: 'green' } }, "Defense Given"),
                    key: 'defense',
                    render: function (text, record) { return (React.createElement("span", null,
                        record.defense,
                        " ",
                        React.createElement("span", { style: { color: 'red' } }, _this.getAdditionalValueForStatisticIfAny(record, 'DEFENSE')))); }
                }, {
                    title: React.createElement("span", { style: { color: 'orange' } }, "Agility Required"),
                    key: 'agilityRequired',
                    dataIndex: 'agilityRequired',
                }, {
                    title: React.createElement("span", { style: { color: 'green' } }, "Evasion Given"),
                    key: 'evasion',
                    render: function (text, record) { return (React.createElement("span", null,
                        record.evasion,
                        " ",
                        React.createElement("span", { style: { color: 'red' } }, _this.getAdditionalValueForStatisticIfAny(record, 'EVASION')))); }
                }, {
                    title: React.createElement("span", { style: { color: 'orange' } }, "Intelligence Required"),
                    key: 'intelligenceRequired',
                    dataIndex: 'intelligenceRequired',
                }, {
                    title: React.createElement("span", { style: { color: 'green' } }, "Wisdom Given"),
                    key: 'wisdom',
                    render: function (text, record) { return (React.createElement("span", null,
                        record.wisdom,
                        " ",
                        React.createElement("span", { style: { color: 'red' } }, _this.getAdditionalValueForStatisticIfAny(record, 'WISDOM')))); }
                }, {
                    title: 'Action',
                    key: 'action',
                    render: function (text, record) { return (React.createElement("span", null,
                        React.createElement("a", { onClick: function () { return _this.openEditModalWithRecord(record); } }, "Edit"),
                        React.createElement(antd_1.Divider, { type: "vertical" }),
                        React.createElement("a", { onClick: function () { return _this.openDeleteModalWithRecord(record); } }, "Delete"))); },
                }];
        };
        _this.openEditModalWithRecord = function (record) {
            _this.setState({ item: record }, function () {
                _this.setState({ editItemVisible: true }, function () {
                });
            });
        };
        _this.openDeleteModalWithRecord = function (record) {
            _this.setState({ item: record }, function () {
                _this.setState({ deleteItemVisible: true });
            });
        };
        _this.saveItem = function () {
            fetch('http://localhost:8080/api/items', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.item)
            })
                .then(function (res) { return _this.getItems(); });
        };
        _this.deleteItem = function () {
            fetch('http://localhost:8080/api/items', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.item)
            })
                .then(function (res) { return _this.getItems(); });
        };
        _this.changeItemProperty = function (propertyName, value) {
            var itemCopy = JSON.parse(JSON.stringify(_this.state.item));
            itemCopy[propertyName] = value;
            _this.setState({ item: itemCopy });
        };
        _this.renderPrefixesSelector = function () {
            var options = _this.state.prefixes.map(function (prefix) { return React.createElement(Option, { value: prefix.toString() }, prefix.name); });
            return React.createElement(antd_1.Select, { defaultValue: _this.state.item.prefix || '', style: { width: 120 }, onChange: function (value) {
                    _this.changeItemProperty('prefix', value);
                } }, options);
        };
        _this.renderItemTypesSelector = function () {
            var options = _this.state.itemTypes.map(function (itemType) { return React.createElement(Option, { value: itemType }, itemType); });
            return React.createElement(antd_1.Select, { defaultValue: _this.state.item.itemType || '', style: { width: 120 }, onChange: function (value) {
                    _this.changeItemProperty('itemType', value);
                } }, options);
        };
        _this.renderDeleteModal = function () { return (React.createElement(antd_1.Modal, { title: "Delete item", visible: _this.state.deleteItemVisible, footer: false, closable: true, afterClose: function () { return _this.setState({ deleteItemVisible: false }); }, onCancel: function () { return _this.setState({ deleteItemVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.deleteItem(); } },
                React.createElement("p", null, "Are You sure You want to delete this item?"),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Delete")))); };
        _this.renderEditModal = function () { return (React.createElement(antd_1.Modal, { title: "Add/Edit Item", visible: _this.state.editItemVisible, footer: false, closable: true, afterClose: function () { return _this.setState({ deleteItemVisible: false }); }, onCancel: function () { return _this.setState({ editItemVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.saveItem(); } },
                React.createElement(FormItem, { label: "Item Name" },
                    React.createElement(antd_1.Input, { value: _this.state.item.name || '', onChange: function (e) { return _this.changeItemProperty('name', e.target.value); } })),
                React.createElement(FormItem, { label: "Item Type" }, _this.renderItemTypesSelector()),
                React.createElement(FormItem, { label: "Strength Required" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.strengthRequired || 0, onChange: function (e) {
                            _this.changeItemProperty('strengthRequired', e);
                        } })),
                React.createElement(FormItem, { label: "Damage Given" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.damage || 0, onChange: function (e) {
                            _this.changeItemProperty('damage', e);
                        } })),
                React.createElement(FormItem, { label: "Defense Given" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.defense || 0, onChange: function (e) {
                            _this.changeItemProperty('defense', e);
                        } })),
                React.createElement(FormItem, { label: "Agility Required" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.agilityRequired || 0, onChange: function (e) {
                            _this.changeItemProperty('agilityRequired', e);
                        } })),
                React.createElement(FormItem, { label: "Evasion Given" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.evasion || 0, onChange: function (e) {
                            _this.changeItemProperty('evasion', e);
                        } })),
                React.createElement(FormItem, { label: "Intelligence Required" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.intelligenceRequired || 0, onChange: function (e) {
                            _this.changeItemProperty('intelligenceRequired', e);
                        } })),
                React.createElement(FormItem, { label: "Wisdom Given" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.item.wisdom || 0, onChange: function (e) {
                            _this.changeItemProperty('wisdom', e);
                        } })),
                React.createElement(FormItem, { label: "Prefix" }, _this.renderPrefixesSelector()),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Save Item")))); };
        return _this;
    }
    ItemsPage.prototype.componentDidMount = function () {
        this.getItems();
        this.getPrefixes();
        this.getItemTypes();
    };
    ItemsPage.prototype.getItems = function () {
        var _this = this;
        fetch('http://localhost:8080/api/items', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ items: json }); });
    };
    ItemsPage.prototype.getPrefixes = function () {
        var _this = this;
        fetch('http://localhost:8080/api/prefixes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ prefixes: json }); });
    };
    ItemsPage.prototype.getItemTypes = function () {
        var _this = this;
        fetch('http://localhost:8080/api/items/itemtypes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ itemTypes: json }); });
    };
    ItemsPage.prototype.getPrefixNameFromRecord = function (record) {
        if (!Utils_1.isEmpty(record.prefix)) {
            return record.prefix.name || '';
        }
        return '';
    };
    ;
    ItemsPage.prototype.getAdditionalValueForStatisticIfAny = function (record, statistic) {
        if (!Utils_1.isEmpty(record.prefix)) {
            return record.prefix.statistic === statistic ? '(+' + record.prefix.additionalValue + ')' : null;
        }
        return null;
    };
    ;
    ItemsPage.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(antd_1.Button, { className: "acceptButton floatRight", type: "primary", onClick: function () { return _this.openEditModalWithRecord(Item_1.getEmptyItem()); } }, "Add Item"),
                React.createElement(antd_1.Table, { columns: this.getColumns(), dataSource: this.state.items }),
                this.renderEditModal(),
                this.renderDeleteModal())));
    };
    return ItemsPage;
}(React.Component));
exports.default = ItemsPage;
//# sourceMappingURL=ItemsPage.js.map
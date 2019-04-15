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
var React = require("react");
var antd_1 = require("antd");
require("./prefixes.css");
var Enemy_1 = require("./Enemy");
var Option = antd_1.Select.Option;
var FormItem = antd_1.Form.Item;
var getInitialState = function () {
    return {
        enemies: [],
        enemyTypes: [],
        enemy: Enemy_1.getEmptyEnemy(),
        editEnemyVisible: false,
        deleteEnemyVisible: false,
    };
};
var EnemiesPage = /** @class */ (function (_super) {
    __extends(EnemiesPage, _super);
    function EnemiesPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = getInitialState();
        _this.getColumns = function () {
            return [{
                    title: 'Enemy Name',
                    key: 'name',
                    render: function (text, record) { return (React.createElement("span", null,
                        "[",
                        record.enemyType,
                        "] ",
                        record.name)); },
                }, {
                    title: 'Strength',
                    key: 'strength',
                    dataIndex: 'strength',
                }, {
                    title: 'Agility',
                    key: 'agility',
                    dataIndex: 'agility',
                }, {
                    title: 'Intelligence',
                    key: 'intelligence',
                    dataIndex: 'intelligence',
                }, {
                    title: 'Hit Points',
                    key: 'hitPoints',
                    dataIndex: 'hitPoints',
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
            _this.setState({ enemy: record }, function () {
                _this.setState({ editEnemyVisible: true }, function () {
                    _this.setEnemyEnemyTypeIfNotSet();
                });
            });
        };
        _this.openDeleteModalWithRecord = function (record) {
            _this.setState({ enemy: record }, function () {
                _this.setState({ deleteEnemyVisible: true });
            });
        };
        _this.saveEnemy = function () {
            fetch('http://localhost:8080/api/enemies', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.enemy)
            })
                .then(function (res) { return _this.getEnemies(); });
        };
        _this.deleteEnemy = function () {
            fetch('http://localhost:8080/api/enemies', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.enemy)
            })
                .then(function (res) { return _this.getEnemies(); });
        };
        _this.changeEnemyProperty = function (propertyName, value) {
            var enemyCopy = JSON.parse(JSON.stringify(_this.state.enemy));
            enemyCopy[propertyName] = value;
            _this.setState({ enemy: enemyCopy });
        };
        _this.renderEnemyTypesSelector = function () {
            var options = _this.state.enemyTypes.map(function (enemyType) { return React.createElement(Option, { value: enemyType }, enemyType); });
            return React.createElement(antd_1.Select, { defaultValue: _this.state.enemy.enemyType || _this.state.enemyTypes[0] || '', style: { width: 120 }, onChange: function (value) {
                    _this.changeEnemyProperty('enemyType', value);
                } }, options);
        };
        _this.setEnemyEnemyTypeIfNotSet = function () {
            if (!_this.state.enemy.enemyType) {
                _this.changeEnemyProperty("enemyType", _this.state.enemyTypes[0]);
            }
        };
        _this.renderDeleteModal = function () { return (React.createElement(antd_1.Modal, { title: "Delete Enemy", visible: _this.state.deleteEnemyVisible, footer: false, closable: true, afterClose: function () { return _this.setState({ deleteEnemyVisible: false }); }, onCancel: function () { return _this.setState({ deleteEnemyVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.deleteEnemy(); } },
                React.createElement("p", null, "Are You sure You want to delete this enemy?"),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Delete")))); };
        _this.renderEditModal = function () { return (React.createElement(antd_1.Modal, { title: "Add/Edit Enemy", visible: _this.state.editEnemyVisible, footer: false, closable: true, afterClose: function () { return _this.setState({ editEnemyVisible: false }); }, onCancel: function () { return _this.setState({ editEnemyVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.saveEnemy(); } },
                React.createElement(FormItem, { label: "Enemy Name" },
                    React.createElement(antd_1.Input, { value: _this.state.enemy.name || '', onChange: function (e) { return _this.changeEnemyProperty('name', e.target.value); } })),
                React.createElement(FormItem, { label: "Enemy Type" }, _this.renderEnemyTypesSelector()),
                React.createElement(FormItem, { label: "Strength" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.enemy.strength || 0, onChange: function (e) {
                            _this.changeEnemyProperty('strength', e);
                        } })),
                React.createElement(FormItem, { label: "Agility" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.enemy.agility || 0, onChange: function (e) {
                            _this.changeEnemyProperty('agility', e);
                        } })),
                React.createElement(FormItem, { label: "Intelligence" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.enemy.intelligence || 0, onChange: function (e) {
                            _this.changeEnemyProperty('intelligence', e);
                        } })),
                React.createElement(FormItem, { label: "Hit Points" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.enemy.hitPoints || 0, onChange: function (e) {
                            _this.changeEnemyProperty('hitPoints', e);
                        } })),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Save Enemy")))); };
        return _this;
    }
    EnemiesPage.prototype.componentDidMount = function () {
        this.getEnemies();
        this.getEnemyTypes();
    };
    EnemiesPage.prototype.getEnemies = function () {
        var _this = this;
        fetch('http://localhost:8080/api/enemies', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ enemies: json }); });
    };
    EnemiesPage.prototype.getEnemyTypes = function () {
        var _this = this;
        fetch('http://localhost:8080/api/enemies/enemytypes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ enemyTypes: json }); });
    };
    EnemiesPage.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(antd_1.Button, { className: "acceptButton floatRight", type: "primary", onClick: function () { return _this.openEditModalWithRecord(Enemy_1.getEmptyEnemy()); } }, "Add Enemy"),
                React.createElement(antd_1.Table, { columns: this.getColumns(), dataSource: this.state.enemies }),
                this.renderEditModal(),
                this.renderDeleteModal())));
    };
    return EnemiesPage;
}(React.Component));
exports.default = EnemiesPage;
//# sourceMappingURL=EnemiesPage.js.map
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
var Option = antd_1.Select.Option;
var FormItem = antd_1.Form.Item;
var Prefixes = /** @class */ (function (_super) {
    __extends(Prefixes, _super);
    function Prefixes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            prefixes: [],
            statistics: [],
            prefix: {
                name: '',
                additionalValue: 0,
                statistic: '',
            },
            editPrefixVisible: false,
            deletePrefixVisible: false,
        };
        _this.getColumns = function () {
            return [{
                    title: 'Prefix Name',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: 'Statistic Value',
                    key: 'additionalValue',
                    render: function (text, record) { return (React.createElement("p", null,
                        React.createElement("span", { style: { fontWeight: 'bold' } },
                            "[",
                            record.statistic,
                            "]"),
                        " ",
                        record.additionalValue)); },
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
            _this.setState({ prefix: record }, function () {
                _this.setState({ editPrefixVisible: true }, function () {
                    _this.setPrefixStatisticIfNotSet();
                });
            });
        };
        _this.openDeleteModalWithRecord = function (record) {
            _this.setState({ prefix: record }, function () {
                _this.setState({ deletePrefixVisible: true });
            });
        };
        _this.savePrefix = function () {
            fetch('http://localhost:8080/api/prefixes', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.prefix)
            })
                .then(function (res) { return _this.getPrefixes(); });
        };
        _this.deletePrefix = function () {
            fetch('http://localhost:8080/api/prefixes', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_this.state.prefix)
            })
                .then(function (res) { return _this.getPrefixes(); });
        };
        _this.changePrefixProperty = function (propertyName, value) {
            var prefixCopy = JSON.parse(JSON.stringify(_this.state.prefix));
            prefixCopy[propertyName] = value;
            _this.setState({ prefix: prefixCopy });
        };
        _this.renderStatisticsSelector = function () {
            var options = _this.state.statistics.map(function (statistic) { return React.createElement(Option, { value: statistic }, statistic); });
            return React.createElement(antd_1.Select, { defaultValue: _this.state.prefix.statistic || _this.state.statistics[0]
                    || '', style: { width: 120 }, onChange: function (value) {
                    _this.changePrefixProperty('statistic', value);
                } }, options);
        };
        _this.setPrefixStatisticIfNotSet = function () {
            if (!_this.state.prefix.statistic) {
                _this.changePrefixProperty("statistic", _this.state.statistics[0]);
            }
        };
        _this.renderDeleteModal = function () { return (React.createElement(antd_1.Modal, { title: "Delete prefix", visible: _this.state.deletePrefixVisible, footer: false, closable: true, onHide: function () { return _this.setState({ deletePrefixVisible: false }); }, onCancel: function () { return _this.setState({ deletePrefixVisible: false }); }, onExit: function () { return _this.setState({ deletePrefixVisible: false }); }, onBackdropClick: function () { return _this.setState({ deletePrefixVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.deletePrefix(); } },
                React.createElement("p", null, "Are You sure You want to delete this prefix?"),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Delete")))); };
        _this.renderEditModal = function () { return (React.createElement(antd_1.Modal, { title: "Add/Edit Prefix", visible: _this.state.editPrefixVisible, footer: false, closable: true, onHide: function () { return _this.setState({ editPrefixVisible: false }); }, onCancel: function () { return _this.setState({ editPrefixVisible: false }); }, onExit: function () { return _this.setState({ editPrefixVisible: false }); }, onBackdropClick: function () { return _this.setState({ editPrefixVisible: false }); } },
            React.createElement(antd_1.Form, { onSubmit: function () { return _this.savePrefix(); } },
                React.createElement(FormItem, { label: "Prefix Name" },
                    React.createElement(antd_1.Input, { value: _this.state.prefix.name || '', onChange: function (e) { return _this.changePrefixProperty('name', e.target.value); } })),
                React.createElement(FormItem, { label: "Statistic" }, _this.renderStatisticsSelector()),
                React.createElement(FormItem, { label: "Additional Value" },
                    React.createElement(antd_1.InputNumber, { value: _this.state.prefix.additionalValue || 0, onChange: function (e) {
                            _this.changePrefixProperty('additionalValue', e);
                        } })),
                React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Save Prefix")))); };
        return _this;
    }
    Prefixes.prototype.componentDidMount = function () {
        this.getPrefixes();
        this.getStatistics();
    };
    Prefixes.prototype.getPrefixes = function () {
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
    Prefixes.prototype.getStatistics = function () {
        var _this = this;
        fetch('http://localhost:8080/api/prefixes/powerups', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return _this.setState({ statistics: json }); });
    };
    Prefixes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(antd_1.Button, { className: "acceptButton floatRight", type: "primary", onClick: function () { return _this.openEditModalWithRecord({}); } }, "Add Prefix"),
                React.createElement(antd_1.Table, { columns: this.getColumns(), dataSource: this.state.prefixes }),
                this.renderEditModal(),
                this.renderDeleteModal())));
    };
    return Prefixes;
}(React.Component));
exports.default = Prefixes;
//# sourceMappingURL=Prefixes.js.map
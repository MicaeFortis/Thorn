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
var PrefixesPage = require("./admin/PrefixesPage");
var ItemsPage = require("./admin/ItemsPage");
require("antd/dist/antd.css");
var Dashboard = require("./admin/Dashboard");
var react_router_dom_1 = require("react-router-dom");
var antd_1 = require("antd");
var EnemiesPage_1 = require("./admin/EnemiesPage");
var Header = antd_1.Layout.Header, Footer = antd_1.Layout.Footer, Content = antd_1.Layout.Content;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: false,
        };
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(antd_1.Layout, null,
                React.createElement(Header, { style: { position: 'fixed', zIndex: 1, width: '100%' } },
                    React.createElement("div", { className: "logo" }),
                    React.createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['1'], style: { lineHeight: '64px' } },
                        React.createElement(antd_1.Menu.Item, { key: "/admin/" },
                            React.createElement(react_router_dom_1.Link, { to: "/admin/" }, "Dashboard")),
                        React.createElement(antd_1.Menu.Item, { key: "/prefixes" },
                            React.createElement(react_router_dom_1.Link, { to: "/admin/prefixes" }, "Prefixes")),
                        React.createElement(antd_1.Menu.Item, { key: "/items" },
                            React.createElement(react_router_dom_1.Link, { to: "/admin/items" }, "Items")),
                        React.createElement(antd_1.Menu.Item, { key: "/enemies" },
                            React.createElement(react_router_dom_1.Link, { to: "/admin/enemies" }, "Enemies")))),
                React.createElement(Content, { style: { padding: '0 50px', marginTop: 80 } },
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { exact: true, path: "/admin/", component: Dashboard.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/admin/prefixes", component: PrefixesPage.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/admin/items", component: ItemsPage.default }),
                        React.createElement(react_router_dom_1.Route, { path: "/admin/enemies", component: EnemiesPage_1.default }))),
                React.createElement(Footer, { style: { textAlign: 'center' } }, "Dive into fantasy world of Thorn"))));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map
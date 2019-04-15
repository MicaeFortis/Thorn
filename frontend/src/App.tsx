import * as React from 'react';
import * as PrefixesPage from './admin/PrefixesPage';
import * as ItemsPage from './admin/ItemsPage';
import * as RegisterPage from './RegisterPage';
import * as Enemy from './admin/Enemy';
import 'antd/dist/antd.css';
import * as Dashboard from './admin/Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import EnemiesPage from './admin/EnemiesPage';

const {Header, Footer, Content} = Layout;


class App extends React.Component {

    state = {
        collapsed: false,
    };

    render() {
        return (
            <Router>
                <Layout>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="/admin/">
                                <Link to="/admin/">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="/prefixes">
                                <Link to="/admin/prefixes">Prefixes</Link>
                            </Menu.Item>
                            <Menu.Item key="/items">
                                <Link to="/admin/items">Items</Link>
                            </Menu.Item>
                            <Menu.Item key="/enemies">
                                <Link to="/admin/enemies">Enemies</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 80 }}
                    >
                        <Switch>
                            <Route exact path="/" component={Dashboard.default}/>
                            <Route path="/login" component={Dashboard.default}/> 
                            <Route path="/register" component={RegisterPage.default}/>
                            <Route path="/admin/prefixes" component={PrefixesPage.default}/>
                            <Route path="/admin/items" component={ItemsPage.default}/>
                            <Route path="/admin/enemies" component={EnemiesPage}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Dive into fantasy world of Thorn
                    </Footer>
                </Layout>
            </Router>
        )
    }
}

export default App;


import React from 'react';
import Prefixes from './admin/Prefixes';
import Items from './admin/Items';
import Enemy from './admin/Enemy';
import 'antd/dist/antd.css';
import Dashboard from './admin/Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Layout, Menu} from 'antd';

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
                            <Route exact path="/admin/" component={Dashboard}/>
                            <Route path="/admin/prefixes" component={Prefixes}/>
                            <Route path="/admin/items" component={Items}/>
                            <Route path="/admin/enemies" component={Enemy}/>
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


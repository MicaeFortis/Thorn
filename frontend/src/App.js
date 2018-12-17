import React from 'react';
import Prefixes from './Prefixes';
import 'antd/dist/antd.css';
import Dashboard from './Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';

const {Header, Footer, Sider, Content} = Layout;


class App extends React.Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
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
                            <Menu.Item key="/">
                                <Link to="/">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="/prefixes">
                                <Link to="/prefixes">Prefixes</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 80 }}
                    >
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route path="/prefixes" component={Prefixes}/>
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


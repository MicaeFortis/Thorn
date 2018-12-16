import React from 'react';
import Applications from './Applications';
import Services from './Services';
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
                            <Menu.Item key="/applications">
                                <Link to="/applications">Applications</Link>
                            </Menu.Item>
                            <Menu.Item key="/services">
                                <Link to="/services">Services</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 80 }}
                    >
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route path="/applications" component={Applications}/>
                            <Route path="/services" component={Services}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        For purposes of better scheduling! W Company @2018
                    </Footer>
                </Layout>
            </Router>
        )
    }
}

export default App;


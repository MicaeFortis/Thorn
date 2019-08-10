import * as React from 'react';
import {
  Table,
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Select,
} from 'antd';
import { User, getEmptyUser } from './User';
import { api } from './api/Api';
import { observer, inject } from 'mobx-react';
import { AppStoreType, AppStore } from './store/AppStore';

const FormItem = Form.Item;

interface Props {
  appStore?: AppStore,
}

interface State {
  user: User,
}

const getInitialState = (): State => {
  return {
    user: getEmptyUser(),
  }
}

@inject('appStore')
@observer
class LoginPage extends React.Component<Props, State> {
  
  state = getInitialState();

  changeUserProperty = (propertyName: string, value: number | string) => {
    let userCopy = JSON.parse(JSON.stringify(this.state.user));
    userCopy[propertyName] = value;
    this.setState({user: userCopy});
  };

  login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    api.request({
      url: 'login',
      method: 'POST',
      data: this.state.user,
    })
    .then(res => this.setAuthenticationHeader(res))
    .catch(err => alert(JSON.stringify(err)));
  };

  setAuthenticationHeader = (res: any) => {
    this.props.appStore!.setAuthenticationHeader(res.headers.authorization)
  }

  renderLoginForm = () => (
        <Form onSubmit={(e) => this.login(e)}>
          <FormItem label="Username">
            <Input value={this.state.user.username || ''} placeholder="Username"
                   onChange={e => this.changeUserProperty('username', e.target.value)}/>
          </FormItem>
          <FormItem label="Password">
            <Input value={this.state.user.password || ''}
                   type="password" placeholder="Password"
                   onChange={e => this.changeUserProperty('password', e.target.value)}/>
          </FormItem>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form>
  );

  render() {
    return (
        <div>
          <div>
            <span>{this.props.appStore!.authenticationHeader}</span>
            {this.renderLoginForm()}
          </div>
        </div>
    );
  }
}

export default LoginPage;
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

const FormItem = Form.Item;

type RegisterState = {
  user: User,
}

const getInitialState = (): RegisterState => {
  return {
    user: getEmptyUser(),
  }
}

class RegisterPage extends React.Component<{}, RegisterState> {
  
  state = getInitialState();

  changeUserProperty = (propertyName: string, value: number | string) => {
    let userCopy = JSON.parse(JSON.stringify(this.state.user));
    userCopy[propertyName] = value;
    this.setState({user: userCopy});
  };

  saveUser = (): void => {
    fetch('http://localhost:8080/auth/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    });
  };

  renderRegisterForm = () => (
        <Form onSubmit={() => this.saveUser()}>
          <FormItem label="Username">
            <Input value={this.state.user.username || ''} placeholder="Username"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changeUserProperty('username',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Password">
            <Input value={this.state.user.password || ''}
                   type="password" placeholder="Password"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changeUserProperty('password',
                       e.target.value)}/>
          </FormItem>
          <Button type="primary" htmlType="submit">Let's start with the world of thorn!</Button>
        </Form>
  );

  render() {
    return (
        <div>
          <div>
            {this.renderRegisterForm()}
          </div>
        </div>
    );
  }
}

export default RegisterPage;
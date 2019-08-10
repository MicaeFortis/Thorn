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
  message,
} from 'antd';
import './prefixes.css';
import { getEmptyEnemy, Enemy } from './Enemy';
import {isEmpty} from './../utils/Utils';
import { observer, inject } from 'mobx-react';
import { AppStore } from '../store/AppStore';
import { api } from '../api/Api';

const Option = Select.Option;
const FormItem = Form.Item;

interface Props {
  appStore?: AppStore,
}

interface State {
  enemies: Enemy[],
  enemyTypes: string[],
  enemy: Enemy,
  editEnemyVisible: boolean,
  deleteEnemyVisible: boolean,
}

const getInitialState = (): State => {
  return {
    enemies: [],
    enemyTypes: [],
    enemy: getEmptyEnemy(),
    editEnemyVisible: false,
    deleteEnemyVisible: false,
  }
}

@inject('appStore')
@observer
class EnemiesPage extends React.Component<Props, State> {
  
  state = getInitialState();

  componentDidMount() {
    this.getEnemies();
    this.getEnemyTypes();
  }

  getEnemies = (): void => {
    api.request<Array<Enemy>>({
      url: 'api/enemies',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
    .then(res => this.setState({enemies: res.data}))
    .catch(err => {
      if (err.response.data.status === 403) {
        message.error('You are not supposed to be here!');
      }
    });
  }

  getEnemyTypes() {
    api.request<Array<string>>({
      url: 'api/enemies/enemytypes',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
    .then(res => this.setState({enemyTypes: res.data}))
    .catch(err => {});
  }

  getColumns = () => {
    return [{
      title: 'Enemy Name',
      key: 'name',
      render: (text: string, record: Enemy) => (
          <span>
            [{record.enemyType}] {record.name}
          </span>
      ),
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
      render: (text: string, record: Enemy) => (
          <span>
                  <a onClick={() => this.openEditModalWithRecord(
                      record)}>Edit</a>
                  <Divider type="vertical"/>
                  <a onClick={() => this.openDeleteModalWithRecord(record)}>Delete</a>
                </span>
      ),
    }];
  };

  openEditModalWithRecord = (record: Enemy) => {
    this.setState({enemy: record}, () => {
      this.setState({editEnemyVisible: true}, () => {
        this.setEnemyEnemyTypeIfNotSet();
      })
    })
  };

  openDeleteModalWithRecord = (record: Enemy) => {
    this.setState({enemy: record}, () => {
      this.setState({deleteEnemyVisible: true})
    })
  };

  saveEnemy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.request({
      url: 'api/enemies',
      method: 'POST',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.enemy
    })
    .then(() => {
      this.getEnemies()
      this.setState({editEnemyVisible: false}) 
    })
    .catch(err => alert(JSON.stringify(err)));
  };

  deleteEnemy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.request({
      url: 'api/enemies',
      method: 'DELETE',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.enemy
    })
    .then(() => {
      this.getEnemies()
      this.setState({deleteEnemyVisible: false}) 
    })
    .catch(err => alert(JSON.stringify(err)));
  };

  changeEnemyProperty = (propertyName: string, value: number | string) => {
    let enemyCopy = JSON.parse(JSON.stringify(this.state.enemy));
    enemyCopy[propertyName] = value;
    this.setState({enemy: enemyCopy});
  };

  renderEnemyTypesSelector = () => {
    let options = this.state.enemyTypes.map(
        (enemyType) => <Option value={enemyType}>{enemyType}</Option>);
    return <Select
        defaultValue={this.state.enemy.enemyType || this.state.enemyTypes[0] || ''} style={{width: 120}}
        onChange={(value: string) => {
          this.changeEnemyProperty('enemyType', value)
        }}>
      {options}
    </Select>
  };

  setEnemyEnemyTypeIfNotSet = () => {
    if (!this.state.enemy.enemyType) {
      this.changeEnemyProperty("enemyType", this.state.enemyTypes[0]);
    }
  };

  renderDeleteModal = () => (
      <Modal
          title="Delete Enemy"
          visible={this.state.deleteEnemyVisible}
          footer={false}
          closable={true}
          afterClose={() => this.setState({deleteEnemyVisible: false})}
          onCancel={() => this.setState({deleteEnemyVisible: false})}
      >
        <Form onSubmit={(e) => this.deleteEnemy(e)}>
          <p>Are You sure You want to delete this enemy?</p>
          <Button type="primary" htmlType="submit">Delete</Button>
        </Form>
      </Modal>
  );

  renderEditModal = () => (
      <Modal
          title="Add/Edit Enemy"
          visible={this.state.editEnemyVisible}
          footer={false}
          closable={true}
          afterClose={() => this.setState({editEnemyVisible: false})}
          onCancel={() => this.setState({editEnemyVisible: false})}
      >
        <Form onSubmit={(e) => this.saveEnemy(e)}>
          <FormItem label="Enemy Name">
            <Input value={this.state.enemy.name || ''}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changeEnemyProperty('name',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Enemy Type">
            {this.renderEnemyTypesSelector()}
          </FormItem>
          <FormItem label="Strength">
            <InputNumber value={this.state.enemy.strength || 0}
                         onChange={(e: any) => {
                           this.changeEnemyProperty(
                               'strength', e)
                         }}/>
          </FormItem>
          <FormItem label="Agility">
            <InputNumber value={this.state.enemy.agility || 0}
                         onChange={(e: any) => {
                           this.changeEnemyProperty(
                               'agility', e)
                         }}/>
          </FormItem>
          <FormItem label="Intelligence">
            <InputNumber value={this.state.enemy.intelligence || 0}
                         onChange={(e: any) => {
                           this.changeEnemyProperty(
                               'intelligence', e)
                         }}/>
          </FormItem>
          <FormItem label="Hit Points">
            <InputNumber value={this.state.enemy.hitPoints || 0}
                         onChange={(e: any) => {
                           this.changeEnemyProperty(
                               'hitPoints', e)
                         }}/>
          </FormItem>
          <Button type="primary" htmlType="submit">Save Enemy</Button>
        </Form>
      </Modal>
  );

  render() {
    return (
        <div>
          <div>
            <Button className="acceptButton floatRight" type="primary"
                    onClick={() => this.openEditModalWithRecord(getEmptyEnemy())}>Add
              Enemy</Button>
            <Table columns={this.getColumns()}
                   dataSource={this.state.enemies}/>
            {this.renderEditModal()}
            {this.renderDeleteModal()}
          </div>
        </div>
    );
  }
}

export default EnemiesPage;
import React from 'react';
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
import './prefixes.css';
import {isEmpty} from './../utils/Utils';

const Option = Select.Option;
const FormItem = Form.Item;

class Prefixes extends React.Component {

  state = {
    enemies: [],
    enemyTypes: [],
    enemy: {
      name: '',
      strength: 0,
      agility: 0,
      intelligence: 0,
      enemyType: '',
      hitPoints: 0,
      dead: false,
    },
    editEnemyVisible: false,
    deleteEnemyVisible: false,
  };

  componentDidMount() {
    this.getEnemies();
    this.getEnemyTypes();
  }

  getEnemies() {
    fetch('http://localhost:8080/api/enemies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({enemies: json}));
  }

  getEnemyTypes() {
    fetch('http://localhost:8080/api/enemies/enemytypes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({enemyTypes: json}));
  }

  getColumns = () => {
    return [{
      title: 'Enemy Name',
      key: 'name',
      render: (text, record) => (
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
      render: (text, record) => (
          <span>
                  <a onClick={() => this.openEditModalWithRecord(
                      record)}>Edit</a>
                  <Divider type="vertical"/>
                  <a onClick={() => this.openDeleteModalWithRecord(record)}>Delete</a>
                </span>
      ),
    }];
  };

  openEditModalWithRecord = (record) => {
    this.setState({enemy: record}, () => {
      this.setState({editEnemyVisible: true}, () => {
        this.setEnemyEnemyTypeIfNotSet();
      })
    })
  };

  openDeleteModalWithRecord = (record) => {
    this.setState({enemy: record}, () => {
      this.setState({deleteEnemyVisible: true})
    })
  };

  saveEnemy = () => {
    fetch('http://localhost:8080/api/enemies', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.enemy)
    })
    .then(res => this.getEnemies());
  };

  deleteEnemy = () => {
    fetch('http://localhost:8080/api/enemies', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.enemy)
    })
    .then(res => this.getEnemies());
  };

  changeEnemyProperty = (propertyName, value) => {
    let enemyCopy = JSON.parse(JSON.stringify(this.state.enemy));
    enemyCopy[propertyName] = value;
    this.setState({enemy: enemyCopy});
  };

  renderEnemyTypesSelector = () => {
    let options = this.state.enemyTypes.map(
        (enemyType) => <Option value={enemyType}>{enemyType}</Option>);
    return <Select
        defaultValue={this.state.enemy.enemyType || this.state.enemyTypes[0] || ''} style={{width: 120}}
        onChange={(value) => {
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
          onHide={() => this.setState({deleteEnemyVisible: false})}
          onCancel={() => this.setState({deleteEnemyVisible: false})}
          onExit={() => this.setState({deleteEnemyVisible: false})}
          onBackdropClick={() => this.setState({deleteEnemyVisible: false})}
      >
        <Form onSubmit={() => this.deleteEnemy()}>
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
          onHide={() => this.setState({editEnemyVisible: false})}
          onCancel={() => this.setState({editEnemyVisible: false})}
          onExit={() => this.setState({editEnemyVisible: false})}
          onBackdropClick={() => this.setState({editEnemyVisible: false})}
      >
        <Form onSubmit={() => this.saveEnemy()}>
          <FormItem label="Enemy Name">
            <Input value={this.state.enemy.name || ''}
                   onChange={(e) => this.changeEnemyProperty('name',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Enemy Type">
            {this.renderEnemyTypesSelector()}
          </FormItem>
          <FormItem label="Strength">
            <InputNumber value={this.state.enemy.strength || 0}
                         onChange={(e) => {
                           this.changeEnemyProperty(
                               'strength', e)
                         }}/>
          </FormItem>
          <FormItem label="Agility">
            <InputNumber value={this.state.enemy.agility || 0}
                         onChange={(e) => {
                           this.changeEnemyProperty(
                               'agility', e)
                         }}/>
          </FormItem>
          <FormItem label="Intelligence">
            <InputNumber value={this.state.enemy.intelligence || 0}
                         onChange={(e) => {
                           this.changeEnemyProperty(
                               'intelligence', e)
                         }}/>
          </FormItem>
          <FormItem label="Hit Points">
            <InputNumber value={this.state.enemy.hitPoints || 0}
                         onChange={(e) => {
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
                    onClick={() => this.openEditModalWithRecord({})}>Add
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

export default Prefixes;
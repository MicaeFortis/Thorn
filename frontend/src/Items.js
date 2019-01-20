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
import {isEmpty} from './Utils';

const Option = Select.Option;
const FormItem = Form.Item;

class Prefixes extends React.Component {

  state = {
    items: [],
    itemTypes: [],
    prefixes: [],
    item: {
      name: '',
      strengthRequired: 0,
      agilityRequired: 0,
      intelligenceRequired: 0,
      damage: 0,
      defense: 0,
      evasion: 0,
      wisdom: 0,
      itemType: '',
      prefix: {},
    },
    editItemVisible: false,
    deleteItemVisible: false,
  };

  componentDidMount() {
    this.getItems();
    this.getPrefixes();
    this.getItemTypes();
  }

  getItems() {
    fetch('http://localhost:8080/api/items', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({items: json}));
  }

  getPrefixes() {
    fetch('http://localhost:8080/api/prefixes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({prefixes: json}));
  }

  getItemTypes() {
    fetch('http://localhost:8080/api/items/itemtypes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({itemTypes: json}));
  }

  getPrefixNameFromRecord = (record) => {
    if (!isEmpty(record.prefix)) {
      return record.prefix.name || '';
    }
    return '';
  };

  getAdditionalValueForStatisticIfAny = (record, statistic) => {
    if (!isEmpty(record.prefix)) {
      return record.prefix.statistic === statistic ? '(+' + record.prefix.additionalValue + ')' : null;
    }
    return null;
  };

  getColumns = () => {
    return [{
      title: 'Item Name',
      key: 'name',
      render: (text, record) => (
          <span>
            <span style={{color: 'red'}}>{this.getPrefixNameFromRecord(record)} </span>{record.name}
          </span>
      )
    }, {
      title: <span style={{color: 'orange'}}>Strength Required</span>,
      key: 'strengthRequired',
      dataIndex: 'strengthRequired',
    }, {
      title: <span style={{color: 'green'}}>Damage Given</span>,
      key: 'damage',
      render: (text, record) => (
        <span>
          {record.damage} <span style={{color: 'red'}}>{this.getAdditionalValueForStatisticIfAny(record, 'DAMAGE')}</span>
        </span>
      )
    }, {
      title: <span style={{color: 'green'}}>Defense Given</span>,
      key: 'defense',
      render: (text, record) => (
          <span>
          {record.defense} <span style={{color: 'red'}}>{this.getAdditionalValueForStatisticIfAny(record, 'DEFENSE')}</span>
        </span>
      )
    }, {
      title: <span style={{color: 'orange'}}>Agility Required</span>,
      key: 'agilityRequired',
      dataIndex: 'agilityRequired',
    }, {
      title: <span style={{color: 'green'}}>Evasion Given</span>,
      key: 'evasion',
      render: (text, record) => (
          <span>
          {record.evasion} <span style={{color: 'red'}}>{this.getAdditionalValueForStatisticIfAny(record, 'EVASION')}</span>
        </span>
      )
    }, {
      title: <span style={{color: 'orange'}}>Intelligence Required</span>,
      key: 'intelligenceRequired',
      dataIndex: 'intelligenceRequired',
    }, {
      title: <span style={{color: 'green'}}>Wisdom Given</span>,
      key: 'wisdom',
      render: (text, record) => (
          <span>
          {record.wisdom} <span style={{color: 'red'}}>{this.getAdditionalValueForStatisticIfAny(record, 'WISDOM')}</span>
        </span>
      )
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
    this.setState({item: record}, () => {
      this.setState({editItemVisible: true}, () => {

      })
    })
  };

  openDeleteModalWithRecord = (record) => {
    this.setState({item: record}, () => {
      this.setState({deleteItemVisible: true})
    })
  };

  saveItem = () => {
    fetch('http://localhost:8080/api/items', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item)
    })
    .then(res => this.getItems());
  };

  deleteItem = () => {
    fetch('http://localhost:8080/api/items', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.item)
    })
    .then(res => this.getItems());
  };

  changeItemProperty = (propertyName, value) => {
    let itemCopy = JSON.parse(JSON.stringify(this.state.item));
    itemCopy[propertyName] = value;
    this.setState({item: itemCopy});
  };

  renderPrefixesSelector = () => {
    let options = this.state.prefixes.map(
        (prefix) => <Option value={prefix}>{prefix.name}</Option>);
    return <Select
        defaultValue={this.state.item.prefix || ''} style={{width: 120}}
        onChange={(value) => {
          this.changeItemProperty('prefix', value)
        }}>
      {options}
    </Select>
  };

  renderItemTypesSelector = () => {
    let options = this.state.itemTypes.map(
        (itemType) => <Option value={itemType}>{itemType}</Option>);
    return <Select
        defaultValue={this.state.item.itemType || ''} style={{width: 120}}
        onChange={(value) => {
          this.changeItemProperty('itemType', value)
        }}>
      {options}
    </Select>
  };

  renderDeleteModal = () => (
      <Modal
          title="Delete item"
          visible={this.state.deleteItemVisible}
          footer={false}
          closable={true}
          onHide={() => this.setState({deleteItemVisible: false})}
          onCancel={() => this.setState({deleteItemVisible: false})}
          onExit={() => this.setState({deleteItemVisible: false})}
          onBackdropClick={() => this.setState({deleteItemVisible: false})}
      >
        <Form onSubmit={() => this.deleteItem()}>
          <p>Are You sure You want to delete this item?</p>
          <Button type="primary" htmlType="submit">Delete</Button>
        </Form>
      </Modal>
  );

  renderEditModal = () => (
      <Modal
          title="Add/Edit Item"
          visible={this.state.editItemVisible}
          footer={false}
          closable={true}
          onHide={() => this.setState({editItemVisible: false})}
          onCancel={() => this.setState({editItemVisible: false})}
          onExit={() => this.setState({editItemVisible: false})}
          onBackdropClick={() => this.setState({editItemVisible: false})}
      >
        <Form onSubmit={() => this.saveItem()}>
          <FormItem label="Item Name">
            <Input value={this.state.item.name || ''}
                   onChange={(e) => this.changeItemProperty('name',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Item Type">
            {this.renderItemTypesSelector()}
          </FormItem>
          <FormItem label="Strength Required">
            <InputNumber value={this.state.item.strengthRequired || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'strengthRequired', e)
                         }}/>
          </FormItem>
          <FormItem label="Damage Given">
            <InputNumber value={this.state.item.damage || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'damage', e)
                         }}/>
          </FormItem>
          <FormItem label="Defense Given">
            <InputNumber value={this.state.item.defense || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'defense', e)
                         }}/>
          </FormItem>
          <FormItem label="Agility Required">
            <InputNumber value={this.state.item.agilityRequired || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'agilityRequired', e)
                         }}/>
          </FormItem>
          <FormItem label="Evasion Given">
            <InputNumber value={this.state.item.evasion || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'evasion', e)
                         }}/>
          </FormItem>
          <FormItem label="Intelligence Required">
            <InputNumber value={this.state.item.intelligenceRequired || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'intelligenceRequired', e)
                         }}/>
          </FormItem>
          <FormItem label="Wisdom Given">
            <InputNumber value={this.state.item.wisdom || 0}
                         onChange={(e) => {
                           this.changeItemProperty(
                               'wisdom', e)
                         }}/>
          </FormItem>
          <FormItem label="Prefix">
            {this.renderPrefixesSelector()}
          </FormItem>
          <Button type="primary" htmlType="submit">Save Item</Button>
        </Form>
      </Modal>
  );

  render() {
    return (
        <div>
          <div>
            <Button className="acceptButton floatRight" type="primary"
                    onClick={() => this.openEditModalWithRecord({})}>Add
              Item</Button>
            <Table columns={this.getColumns()}
                   dataSource={this.state.items}/>
            {this.renderEditModal()}
            {this.renderDeleteModal()}
          </div>
        </div>
    );
  }
}

export default Prefixes;
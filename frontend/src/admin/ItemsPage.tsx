import { Button, Divider, Form, Input, InputNumber, Modal, Select, Table, message } from 'antd';
import * as React from 'react';
import { Item, getEmptyItem } from './Item';
import { Prefix } from './Prefix';
import { isEmpty } from './../utils/Utils';
import './items.css';
import { inject, observer } from 'mobx-react';
import { api } from '../api/Api';
import { AppStore } from '../store/AppStore';
import _ from 'lodash';

const Option = Select.Option;
const FormItem = Form.Item;

interface Props {
  appStore?: AppStore,
}

interface State {
  items: Item[],
  itemTypes: string[],
  prefixes: Prefix[],
  item: Item,
  editItemVisible: boolean,
  deleteItemVisible: boolean,
}

const getInitialState = (): State => {
  return {
    items: [],
    itemTypes: [],
    prefixes: [],
    item: getEmptyItem(),
    editItemVisible: false,
    deleteItemVisible: false,
  }
}

@inject('appStore')
@observer
class ItemsPage extends React.Component<Props, State> {

  state = getInitialState();


  componentDidMount() {
    this.getItems();
    this.getPrefixes();
    this.getItemTypes();
  }

  getItems() {
    api.request<Array<Item>>({
      url: 'api/items',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
      .then(res => this.setState({ items: res.data }))
      .catch(err => {
        if (err.response.data.status === 403) {
          message.error('You are not supposed to be here!');
        }
      });
  }

  getPrefixes() {
    api.request<Array<Prefix>>({
      url: 'api/prefixes',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
      .then(res => this.setState({ prefixes: res.data }))
      .catch(err => { });
  }

  getItemTypes() {
    api.request<string[]>({
      url: 'api/items/itemtypes',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
      .then(res => this.setState({ itemTypes: res.data }))
      .catch(err => { });
  }

  getPrefixNameFromRecord(record: Item): string {
    if (!isEmpty(record.prefix)) {
      return record.prefix!.name || '';
    }
    return '';
  };

  getAdditionalValueForStatisticIfAny(record: Item, statistic?: string): string {
    if (!isEmpty(record.prefix)) {
      return record.prefix!.statistic === statistic ? '(+' + record.prefix!.additionalValue + ')' : '';
    }
    return '';
  };

  getColumns = () => {
    return [{
      title: 'Item Name',
      key: 'name',
      render: (text: string, record: Item) => (
        <span>
          <span style={{ color: 'red' }}>{this.getPrefixNameFromRecord(record)} </span>{record.name}
        </span>
      )
    }, {
      title: <span style={{ color: 'orange' }}>Strength Required</span>,
      key: 'strengthRequired',
      dataIndex: 'strengthRequired',
    }, {
      title: <span style={{ color: 'green' }}>Damage Given</span>,
      key: 'damage',
      render: (text: string, record: Item) => (
        <span>
          {record.damage} <span style={{ color: 'red' }}>{this.getAdditionalValueForStatisticIfAny(record, 'DAMAGE')}</span>
        </span>
      )
    }, {
      title: <span style={{ color: 'green' }}>Defense Given</span>,
      key: 'defense',
      render: (text: string, record: Item) => (
        <span>
          {record.defense} <span style={{ color: 'red' }}>{this.getAdditionalValueForStatisticIfAny(record, 'DEFENSE')}</span>
        </span>
      )
    }, {
      title: <span style={{ color: 'orange' }}>Agility Required</span>,
      key: 'agilityRequired',
      dataIndex: 'agilityRequired',
    }, {
      title: <span style={{ color: 'green' }}>Evasion Given</span>,
      key: 'evasion',
      render: (text: string, record: Item) => (
        <span>
          {record.evasion} <span style={{ color: 'red' }}>{this.getAdditionalValueForStatisticIfAny(record, 'EVASION')}</span>
        </span>
      )
    }, {
      title: <span style={{ color: 'orange' }}>Intelligence Required</span>,
      key: 'intelligenceRequired',
      dataIndex: 'intelligenceRequired',
    }, {
      title: <span style={{ color: 'green' }}>Wisdom Given</span>,
      key: 'wisdom',
      render: (text: string, record: Item) => (
        <span>
          {record.wisdom} <span style={{ color: 'red' }}>{this.getAdditionalValueForStatisticIfAny(record, 'WISDOM')}</span>
        </span>
      )
    }, {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Item) => (
        <span>
          <a onClick={() => this.openEditModalWithRecord(
            record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => this.openDeleteModalWithRecord(record)}>Delete</a>
        </span>
      ),
    }];
  };

  openEditModalWithRecord = (record: Item) => {
    this.setState({ item: record }, () => {
      this.setState({ editItemVisible: true });
    })
  };

  openDeleteModalWithRecord = (record: Item) => {
    this.setState({ item: record }, () => {
      this.setState({ deleteItemVisible: true });
    })
  };

  saveItem = (e: React.FormEvent) => {
    e.preventDefault();
    api.request({
      url: 'api/items',
      method: 'POST',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.item
    })
      .then(() => {
        this.getItems()
        this.setState({ editItemVisible: false })
      })
      .catch(err => {
        if (err.response.data.status === 403) {
          message.error('Couldn\'t save item!');
        }
      });
  };

  deleteItem = (e: React.FormEvent) => {
    e.preventDefault();
    api.request({
      url: 'api/items',
      method: 'DELETE',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.item
    })
      .then(() => {
        this.getItems()
        this.setState({ deleteItemVisible: false })
      })
      .catch(err => alert(JSON.stringify(err)));
  };

  changeItemProperty = (propertyName: string, value: any) => {
    let itemCopy = JSON.parse(JSON.stringify(this.state.item));
    itemCopy[propertyName] = value;
    this.setState({ item: itemCopy });
  };

  renderPrefixesSelector = () => {
    let options = this.state.prefixes.map(
      (prefix) => <Option key={prefix.id!.toString()} value={prefix.id!}>{prefix.name}</Option>);
    return <Select
      defaultValue={this.getSelectedPrefixId(this.state.item)} style={{ width: 120 }}
      onChange={(value) => {
        let prefixChoosen: Prefix = this.state.prefixes.find(p => p.id === value)!;
        this.changeItemProperty('prefix', prefixChoosen)
      }}>
      {options}
    </Select>
  };

  getSelectedPrefixId = (item: Item): string | number => {
    if (_.isEmpty(item.prefix)) {
      return '';
    }
    return item.prefix!.id!;
  }

  renderItemTypesSelector = () => {
    let options = this.state.itemTypes.map(
      (itemType) => <Option key={itemType} value={itemType}>{itemType}</Option>);
    return <Select
      defaultValue={this.state.item.itemType} style={{ width: 120 }}
      onChange={(value: string) => {
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
      afterClose={() => this.setState({ deleteItemVisible: false })}
      onCancel={() => this.setState({ deleteItemVisible: false })}
    >
      <Form onSubmit={(e) => this.deleteItem(e)}>
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
      afterClose={() => this.setState({ deleteItemVisible: false })}
      onCancel={() => this.setState({ editItemVisible: false })}
    >
      <Form onSubmit={(e) => this.saveItem(e)}>
        <FormItem label="Item Name">
          <Input value={this.state.item.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changeItemProperty('name',
              e.target.value)} />
        </FormItem>
        <FormItem label="Item Type">
          {this.renderItemTypesSelector()}
        </FormItem>
        <FormItem label="Strength Required">
          <InputNumber value={this.state.item.strengthRequired || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'strengthRequired', e)
            }} />
        </FormItem>
        <FormItem label="Damage Given">
          <InputNumber value={this.state.item.damage || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'damage', e)
            }} />
        </FormItem>
        <FormItem label="Defense Given">
          <InputNumber value={this.state.item.defense || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'defense', e)
            }} />
        </FormItem>
        <FormItem label="Agility Required">
          <InputNumber value={this.state.item.agilityRequired || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'agilityRequired', e)
            }} />
        </FormItem>
        <FormItem label="Evasion Given">
          <InputNumber value={this.state.item.evasion || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'evasion', e)
            }} />
        </FormItem>
        <FormItem label="Intelligence Required">
          <InputNumber value={this.state.item.intelligenceRequired || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'intelligenceRequired', e)
            }} />
        </FormItem>
        <FormItem label="Wisdom Given">
          <InputNumber value={this.state.item.wisdom || 0}
            onChange={(e: any) => {
              this.changeItemProperty(
                'wisdom', e)
            }} />
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
            onClick={() => this.openEditModalWithRecord(getEmptyItem())}>Add
              Item</Button>
          <Table columns={this.getColumns()}
            dataSource={this.state.items} />
          {this.renderEditModal()}
          {this.renderDeleteModal()}
        </div>
      </div>
    );
  }
}

export default ItemsPage;
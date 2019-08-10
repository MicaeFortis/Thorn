import * as React from 'react';
import { Prefix, getEmptyPrefix } from './Prefix';
import { Item } from './Item';
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
  prefixes: Prefix[],
  statistics: string[],
  prefix: Prefix,
  editPrefixVisible: boolean,
  deletePrefixVisible: boolean,
}

const getInitialState = (): State => {
  return {
    prefixes: [],
    statistics: [],
    prefix: getEmptyPrefix(),
    editPrefixVisible: false,
    deletePrefixVisible: false,
  }
}

@inject('appStore')
@observer
class PrefixesPage extends React.Component<Props, State> {

  state = getInitialState();

  componentDidMount() {
    this.getPrefixes();
    this.getStatistics();
  }

  getPrefixes() {
    api.request<Array<Prefix>>({
      url: 'api/prefixes',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
    .then(res => this.setState({prefixes: res.data}))
    .catch(err => {
      if (err.response.data.status === 403) {
        message.error('You are not supposed to be here!');
      }
    });
  }

  getStatistics() {
    api.request<Array<string>>({
      url: 'api/prefixes/powerups',
      method: 'GET',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      }
    })
    .then(res => this.setState({statistics: res.data}))
    .catch(err => {});
  }

  getColumns = () => {
    return [{
      title: 'Prefix Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Statistic Value',
      key: 'additionalValue',
      render: (text: string, record: Prefix) => (
          <p>
            <span style={{fontWeight: 'bold'}}>[{record.statistic}]</span> {record.additionalValue}
        </p>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Prefix) => (
          <span>
                  <a onClick={() => this.openEditModalWithRecord(
                      record)}>Edit</a>
                  <Divider type="vertical"/>
                  <a onClick={() => this.openDeleteModalWithRecord(record)}>Delete</a>
                </span>
      ),
    }];
  };

  openEditModalWithRecord = (record: Prefix) => {
    this.setState({prefix: record}, () => {
      this.setState({editPrefixVisible: true}, () => {
        this.setPrefixStatisticIfNotSet();
      })
    })
  };

  openDeleteModalWithRecord = (record: Prefix) => {
    this.setState({prefix: record}, () => {
      this.setState({deletePrefixVisible: true})
    })
  };

  savePrefix = (e: React.FormEvent) => {
    e.preventDefault();
    api.request({
      url: 'api/prefixes',
      method: 'POST',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.prefix
    })
    .then(() => {
      this.getPrefixes()
      this.setState({editPrefixVisible: false}) 
    })
    .catch(err => alert(JSON.stringify(err)));
  };

  deletePrefix = (e: React.FormEvent) => {
    e.preventDefault();
    api.request({
      url: 'api/prefixes',
      method: 'DELETE',
      headers: {
        'Authorization': this.props.appStore!.authenticationHeader
      },
      data: this.state.prefix
    })
    .then(() => {
      this.getPrefixes()
      this.setState({deletePrefixVisible: false}) 
    })
    .catch(err => {
      if (err.response.status === 409) {
        message.error(err.response.data.message);
      } else {
        message.error("Unexpected error!");
      }
    });
  };

  changePrefixProperty = (propertyName: string, value: any) => {
    let prefixCopy = JSON.parse(JSON.stringify(this.state.prefix));
    prefixCopy[propertyName] = value;
    this.setState({prefix: prefixCopy});
  };

  renderStatisticsSelector = (): React.ReactChild => {
    let options = this.state.statistics.map(
        (statistic) => <Option value={statistic}>{statistic}</Option>);
    return <Select
        defaultValue={this.state.prefix.statistic || this.state.statistics[0]
        || ''} style={{width: 120}}
        onChange={(value: string) => {
          this.changePrefixProperty('statistic', value)
        }}>
      {options}
    </Select>
  };

  setPrefixStatisticIfNotSet = () => {
    if (!this.state.prefix.statistic) {
      this.changePrefixProperty("statistic", this.state.statistics[0]);
    }
  };

  renderDeleteModal = (): React.ReactElement => (
      <Modal
          title="Delete prefix"
          visible={this.state.deletePrefixVisible}
          footer={false}
          closable={true}
          afterClose={() => this.setState({deletePrefixVisible: false})}
          onCancel={() => this.setState({deletePrefixVisible: false})}
      >
        <Form onSubmit={(e) => this.deletePrefix(e)}>
          <p>Are You sure You want to delete this prefix?</p>
          <Button type="primary" htmlType="submit">Delete</Button>
        </Form>
      </Modal>
  );

  renderEditModal = (): React.ReactElement  => (
      <Modal
          title="Add/Edit Prefix"
          visible={this.state.editPrefixVisible}
          footer={false}
          closable={true}
          afterClose={() => this.setState({editPrefixVisible: false})}
          onCancel={() => this.setState({editPrefixVisible: false})}
      >
        <Form onSubmit={(e) => this.savePrefix(e)}>
          <FormItem label="Prefix Name">
            <Input value={this.state.prefix.name || ''}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changePrefixProperty('name',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Statistic">
            {this.renderStatisticsSelector()}
          </FormItem>
          <FormItem label="Additional Value">
            <InputNumber value={this.state.prefix.additionalValue || 0}
                         onChange={(e: any) => {
                           this.changePrefixProperty(
                               'additionalValue', e)
                         }}/>
          </FormItem>
          <Button type="primary" htmlType="submit">Save Prefix</Button>
        </Form>
      </Modal>
  );

  render() {
    return (
        <div>
          <div>
            <Button className="acceptButton floatRight" type="primary"
                    onClick={() => this.openEditModalWithRecord(getEmptyPrefix())}>Add
              Prefix</Button>
            <Table columns={this.getColumns()}
                   dataSource={this.state.prefixes}/>
            {this.renderEditModal()}
            {this.renderDeleteModal()}
          </div>
        </div>
    );
  }
}

export default PrefixesPage;
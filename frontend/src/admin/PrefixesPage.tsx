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
} from 'antd';
import './prefixes.css';

const Option = Select.Option;
const FormItem = Form.Item;

type PrefixesState = {
  prefixes: Prefix[],
  statistics: string[],
  prefix: Prefix,
  editPrefixVisible: boolean,
  deletePrefixVisible: boolean,
}

const getInitialState = (): PrefixesState => {
  return {
    prefixes: [],
    statistics: [],
    prefix: getEmptyPrefix(),
    editPrefixVisible: false,
    deletePrefixVisible: false,
  }
}

class PrefixesPage extends React.Component<{}, PrefixesState> {

  state = getInitialState();

  componentDidMount() {
    this.getPrefixes();
    this.getStatistics();
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

  getStatistics() {
    fetch('http://localhost:8080/api/prefixes/powerups', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => this.setState({statistics: json}));
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

  savePrefix = () => {
    fetch('http://localhost:8080/api/prefixes', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.prefix)
    })
    .then(res => this.getPrefixes());
  };

  deletePrefix = () => {
    fetch('http://localhost:8080/api/prefixes', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.prefix)
    })
    .then(res => this.getPrefixes());
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
        <Form onSubmit={() => this.deletePrefix()}>
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
        <Form onSubmit={() => this.savePrefix()}>
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
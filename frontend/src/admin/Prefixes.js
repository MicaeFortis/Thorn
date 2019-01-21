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

const Option = Select.Option;
const FormItem = Form.Item;

class Prefixes extends React.Component {

  state = {
    prefixes: [],
    statistics: [],
    prefix: {
      name: '',
      additionalValue: 0,
      statistic: '',
    },
    editPrefixVisible: false,
    deletePrefixVisible: false,
  };

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
      render: (text, record) => (
          <p>
            <span style={{fontWeight: 'bold'}}>[{record.statistic}]</span> {record.additionalValue}
        </p>
      ),
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
    this.setState({prefix: record}, () => {
      this.setState({editPrefixVisible: true}, () => {
        this.setPrefixStatisticIfNotSet();
      })
    })
  };

  openDeleteModalWithRecord = (record) => {
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

  changePrefixProperty = (propertyName, value) => {
    let prefixCopy = JSON.parse(JSON.stringify(this.state.prefix));
    prefixCopy[propertyName] = value;
    this.setState({prefix: prefixCopy});
  };

  renderStatisticsSelector = () => {
    let options = this.state.statistics.map(
        (statistic) => <Option value={statistic}>{statistic}</Option>);
    return <Select
        defaultValue={this.state.prefix.statistic || this.state.statistics[0]
        || ''} style={{width: 120}}
        onChange={(value) => {
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

  renderDeleteModal = () => (
      <Modal
          title="Delete prefix"
          visible={this.state.deletePrefixVisible}
          footer={false}
          closable={true}
          onHide={() => this.setState({deletePrefixVisible: false})}
          onCancel={() => this.setState({deletePrefixVisible: false})}
          onExit={() => this.setState({deletePrefixVisible: false})}
          onBackdropClick={() => this.setState({deletePrefixVisible: false})}
      >
        <Form onSubmit={() => this.deletePrefix()}>
          <p>Are You sure You want to delete this prefix?</p>
          <Button type="primary" htmlType="submit">Delete</Button>
        </Form>
      </Modal>
  );

  renderEditModal = () => (
      <Modal
          title="Add/Edit Prefix"
          visible={this.state.editPrefixVisible}
          footer={false}
          closable={true}
          onHide={() => this.setState({editPrefixVisible: false})}
          onCancel={() => this.setState({editPrefixVisible: false})}
          onExit={() => this.setState({editPrefixVisible: false})}
          onBackdropClick={() => this.setState({editPrefixVisible: false})}
      >
        <Form onSubmit={() => this.savePrefix()}>
          <FormItem label="Prefix Name">
            <Input value={this.state.prefix.name || ''}
                   onChange={(e) => this.changePrefixProperty('name',
                       e.target.value)}/>
          </FormItem>
          <FormItem label="Statistic">
            {this.renderStatisticsSelector()}
          </FormItem>
          <FormItem label="Additional Value">
            <InputNumber value={this.state.prefix.additionalValue || 0}
                         onChange={(e) => {
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
                    onClick={() => this.openEditModalWithRecord({})}>Add
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

export default Prefixes;
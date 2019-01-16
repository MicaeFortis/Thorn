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
    fetch('http://localhost:8080/api/statistics', {
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
        <span>
          [{record.statistic}] {record.additionalValue}
        </span>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <span>
                  <a onClick={() => this.openEditModalWithRecord(record)}>Edit</a>
                  <Divider type="vertical"/>
                  <a onClick={() => this.openDeleteModalWithRecord(record)}>Delete</a>
                </span>
      ),
    }];
  };

  handleOk = () => {

  };

  handleCancel = () => {

  };

  openEditModalWithRecord = (record) => {
    this.setState({prefix: record}, () => {
      this.setState({editPrefixVisible: true})
    })
  };

  openDeleteModalWithRecord = (record) => {
    this.setState({prefix: record}, () => {
      this.setState({deletePrefixVisible: true})
    })
  };

  savePrefix = () => {
    alert(JSON.stringify(this.state.prefix));
    fetch('http://localhost:8080/api/prefixes', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.prefix)
    })
    .then(res => res.json())
    .then(json => this.setState({prefixes: json}));
  };

  deletePrefix = () => {
    alert(JSON.stringify(this.state.prefix));
    fetch('http://localhost:8080/api/prefixes', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.prefix)
    });
  };

  changePrefixProperty = (propertyName, value) => {
    let prefixCopy = JSON.parse(JSON.stringify(this.state.prefix));
    prefixCopy[propertyName] = value;
    this.setState({prefix: prefixCopy});
  };

  renderStatisticsSelector = () => {
    let options = this.state.statistics.map((statistic) => <Option value={statistic}>{statistic}</Option>);
    return <Select defaultValue={this.state.statistics[0] || ''} style={{width: 120}}
                   onChange={() => {}}>
      {options}
    </Select>
  };

  renderDeleteModal = () => (
      <Modal
          title="Delete prefix"
          visible={this.state.deletePrefixVisible}
          footer={false}
      >
        <Button type="primary"
                onClick={() => this.deletePrefix()}>Delete</Button>
      </Modal>
  );

  renderEditModal = () => (
    <Modal

        title="Add/Edit Prefix"
        visible={this.state.editPrefixVisible}
        footer={false}
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
                       onChange={(e) => this.changePrefixProperty(
                           'additionalValue', e.value)}/>
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
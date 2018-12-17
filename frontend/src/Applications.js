import React from 'react';
import { Table, Divider, Form, Input, InputNumber, Button, Modal, Tag } from 'antd';
import './application.css';

const FormItem = Form.Item;


class Applications extends React.Component {

    state = {
        applications: [],
        application: {},
        editApplicationVisible: false,
    };

    componentDidMount() {
        fetch('http://localhost:8080/api/applications', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => this.setState({applications: json}));
    }

    getColumns = () => {
        return [{
            title: 'Application Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Creator',
            dataIndex: 'creatorName',
            key: 'creatorName',
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                  <a onClick={() => this.openModalWithRecord(record)}>Edit</a>
                  <Divider type="vertical"/>
                  <a href="javascript:;">Delete</a>
                </span>
            ),
        }];
    };

    handleOk = () => {

    };

    handleCancel = () => {

    };

    openModalWithRecord = (record) => {
        this.setState({application: record}, () => {
            this.setState({editApplicationVisible: true})
        })
    };

    render() {
        return (
            <div>
                <div>
                    <Button className="acceptButton floatRight" type="primary" onClick={() => alert('klikniete!')}>Add Application</Button>
                    <Table columns={this.getColumns()} dataSource={this.state.applications} />
                    <Modal
                        title="Add/Edit Application"
                        visible={this.state.editApplicationVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form>
                            <FormItem label="Application Name">
                                <Input value={this.state.application.name}/>
                            </FormItem>
                            <FormItem label="Additional Value">
                                <Input value={this.state.application.creatorName}/>
                            </FormItem>
                            <FormItem label="Price">
                                <InputNumber value={this.state.application.price}/>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Applications;
import React from 'react';
import { Table, Divider, Form, Input, InputNumber, Button, Modal, Tag } from 'antd';
import './application.css';

const FormItem = Form.Item;


class Applications extends React.Component {

    state = {
        prefixes: [],
        prefix: {
            name: '',
            additionalValue: 0
        },
        editPrefixVisible: false,
    };

    componentDidMount() {
        fetch('http://localhost:8080/api/prefixes', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => this.setState({prefixes: json}));
    }

    getColumns = () => {
        return [{
            title: 'Prefix Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Additional Value',
            dataIndex: 'additionalValue',
            key: 'additionalValue',
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
        this.setState({prefix: record}, () => {
            this.setState({editPrefixVisible: true})
        })
    };

    savePrefix = () => {
        console.log(this.state.prefix);
        fetch('http://localhost:8080/api/prefixes', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                prefixDto: this.state.prefix
            }
        })
            .then(res => res.json())
            .then(json => this.setState({prefixes: json}));
    };

    render() {
        return (
            <div>
                <div>
                    <Button className="acceptButton floatRight" type="primary" onClick={() => this.openModalWithRecord({})}>Add Prefix</Button>
                    <Table columns={this.getColumns()} dataSource={this.state.prefixes} />
                    <Modal
                        title="Add/Edit Prefix"
                        visible={this.state.editPrefixVisible}
                        footer={false}
                    >
                        <Form onSubmit={() => this.savePrefix()}>
                            <FormItem  label="Prefix Name">
                                <Input value={this.state.prefix.name}  onKeyUp={(value) => this.setState(prevState => ({
                                    prefix: {
                                        ...prevState.prefix,
                                        name: value
                                    }
                                }))}/>
                            </FormItem>
                            <FormItem label="Additional Value">
                                <InputNumber value={this.state.prefix.additionalValue} onChange={(value) => this.setState(prevState => ({
                                    prefix: {
                                        ...prevState.prefix,
                                        additionalValue: value
                                    }
                                }))}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">Save P</Button>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Applications;
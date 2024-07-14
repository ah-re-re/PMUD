import { deleteRequest, getRequest, postRequest } from "@/hook/api";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";


const UserAdmin = () => {
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getRequest('/users')
            .then(data => {
                console.log(data)
                setData(data)
            })
    }, [reload])
    const onDelete = (user: any) => {
        deleteRequest('/users/' + user?._id)
            .then(data => setReload(prev => !prev)
            )
    }
    const onCreate = (e: any) => {
        postRequest('/auth/sign-up', {
            username: e.username,
            password: e.password
        })
            .then(data => {
                setVisible(false)
                setReload(prev => !prev)
            })
    }
    const columns = [
        {
            title: "Tên tài khoản",
            dataIndex: "username",
            width: "25%",
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            width: "20%",
            render: (value: string) => <Input.Password className="border-none" value={value} />,
        },
        {
            title: "Quyền",
            dataIndex: "role",
            width: "25%",
        },
        {
            dataIndex: "action",
            render: (text: any, record: any) => (
                <div>
                    <Popconfirm
                        title="Bạn có muốn xóa tài khoản này không?"
                        onConfirm={() => onDelete(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger type="primary">
                            <DeleteOutlined /> Xóa
                        </Button>
                    </Popconfirm>
                    ,
                </div>
            ),
        },
    ];
    return (
        <div>
            <Button
                style={{ marginBottom: "30px" }}
                type="primary"
                onClick={() => setVisible(true)}
            >
                <PlusOutlined />
                Tạo tài khoản
            </Button>
            <Table
                rowKey={(record) => record.id}
                tableLayout="fixed"
                columns={columns}
                dataSource={data}
            />
            <Modal
                title="Tạo tài khoản mới"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={false}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={(e) => onCreate(e)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserAdmin
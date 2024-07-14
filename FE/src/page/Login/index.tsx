import { postRequest } from '@/hook/api';
import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      let data = await postRequest('/auth/sign-in', values)
      if(data?.accessToken){
        localStorage.setItem('accessToken', data.accessToken)
        navigate('/admin/home')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='w-full h-screen flex flex-row items-center justify-center bg-green-400'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '40vw', height: '30vh' }}
        className='p-4 rounded-xl bg-rose-200 shadow-xl'
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className='w-full'
        >
          <Input width={'100%'} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className='w-full'
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
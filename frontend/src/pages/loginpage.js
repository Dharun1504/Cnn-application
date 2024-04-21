import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';  
import image1 from "./1.jpeg";

const LoginPage = ({setAuthenticated}) => {
  const navigate=useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const formattedValues = {
        username:values.username,
        password:values.password,
      };
      const res = await axios.post('/api/v1/login', formattedValues);

      if (res.data.message==='Login successful') {
        message.success('Login Successful!');
        setAuthenticated(true);
        navigate(`/home/${res.data.user_id}`);
      } else {
        message.error(res.data.message);
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      message.error('Invalid User Name or Password');
      setAuthenticated(false);
    }
  };

  return (
 
    <div className='login-container'>
    <div className='left'>
      <img src={image1} className="image1" alt="image1"></img>
      <div className="title">
        <h1 className="title-heading">JAZZ</h1>
      </div>
    </div>
    <div className='right'>
      
      <div className='login-form-container'>
      <h1 className='text-center'>Welcome!</h1>
        <Form onFinish={onFinishHandler} className='login-form'>
          

          <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
            <Input className='input-field' placeholder='Enter your username' />
          </Form.Item>

          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password className='input-field' placeholder='Enter your password' />
          </Form.Item>

          <Form.Item className='button-center'>
          <Button type='primary' htmlType='submit' className='login-button'>
            LOGIN
          </Button>
          </Form.Item>



<Form.Item className='link-center'>
  Don't have an account? <Link to='/signup' className='register-link'>Register now!</Link>
</Form.Item>

        </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

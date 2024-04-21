import React from 'react';
import { Form, Input, message,Button } from 'antd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/SignupStyles.css'; 
const Signup=()=>{
    const navigate=useNavigate();
    const onFinishHandler=async(values)=>{
        try{
            const a=values.password;
            const b=values.Confirm_Password;
            if(a===b)
            {
                const formvalues={
                    username:values.username,
                    password:values.password,
                    user_id:values.user_id,
                }
                const res=await axios.post('/api/v1/signup',formvalues);
                console.log(res.data.success)
                if(res.data.success){
                    message.success("Created Successfuly");
                    navigate(`/home/${values.user_id}`);
                }
                else{
                    message.error(res.data.message);
                }
            }
            else
            {
                message.error("Password Doesn't Match")
            }
        }
        catch(error)
        {
            console.log(error);
            message.error("Something Went Wrong");
        }

    }
    return(
        <div>
            <div>
                <h1>Signup</h1>
                <Form onFinish={onFinishHandler}>
                    <Form.Item label="Create User Name" name="username" rules={[{required:true,message:"Name is Required "}]}>
                        <Input className='inputfield' placeholder='Enter your name'/>
                    </Form.Item>
                    <Form.Item label="New User ID" name="user_id" rules={[{required:true,message:"Name is Required "}]}>
                        <Input className='inputfield' placeholder='Enter your id'/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{required:true,message:"Name is Required "}]}>
                        <Input className='inputfield' placeholder='' type='password'/>
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="Confirm_Password" rules={[{required:true,message:"Name is Required "}]}>
                        <Input className='inputfield' placeholder=''/>
                    </Form.Item>
                    <Form.Item className='text-center11'>
                         <Button htmlType='submit' className='button'>Start</Button>
                     </Form.Item>  
                </Form>
            </div>
        </div>
    )
}

export default Signup;
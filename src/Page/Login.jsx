import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../CSS/Login.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email รูปแบบไม่ถูกต้อง'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password ต้องมีความยาวไม่ต่ำกว่า 8 ตัว')
});

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    const { email, password } = data;
    if (email === 'aa@bb.cc' && password === '12345678') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      alert('Email or password incorrect');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="tap">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="tap" >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <Button variant="contained" type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;

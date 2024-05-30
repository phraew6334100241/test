import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
      navigate('/home');
    } else {
      alert('Email or password incorrect');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

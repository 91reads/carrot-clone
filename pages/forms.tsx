import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Forms() {
  const { register, handleSubmit } = useForm();
  const onVaild = () => {
    console.log('i m vaild')
  };
  return (
    <form onSubmit={handleSubmit(onVaild)}>
      <input {...register('username', {
        required: true,
      })} type="text" placeholder="username" />
      <input {...register('email', {
        required: true,
      })} type="email" placeholder="email" />
      <input {...register('password', {
        
      })} type="password" placeholder="password" />
      <input type="submit" value="Create Account" />
    </form>
  )
}
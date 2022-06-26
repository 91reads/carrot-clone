import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

type LoginForm = {
  username: string;
  password: string;
  email: string;
  gender: string
}

export default function Forms() {
  const { register, handleSubmit, formState: { errors }} = useForm<LoginForm>({
    mode: 'onChange'
  });
  const onVaild = (data: LoginForm) => {
    console.log('i m vaild', data)
  };
  const onInvaild = (errors: FieldErrors) => {
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(onVaild, onInvaild)}>
      <input {...register('username', {
        required: 'username is required',
        minLength: {
          value: 4,
          message: "min length is 5"
        }
      })} type="text" placeholder="username" />
      <input {...register('email', {
        required: 'email is required',
        validate: {
          notGmail: value => !value.includes("@gmail.com") || "Don't use Gmail"
        }
      })} type="email" placeholder="email" />
      {errors.email?.message}
      <input {...register('password', {
        required: 'password is required',
      })} type="password" placeholder="password" />
      <select {...register('gender', {
        required: 'gender is required'
      })}>
        <option value='hi'>hi</option>
        <option value='bye'>bye</option>
      </select>
      <input type="submit" value="Create Account" />
    </form>
  )
}
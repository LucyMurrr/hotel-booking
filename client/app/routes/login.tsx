/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { redirect, useFetcher, useBlocker } from 'react-router';
import client from '@api';
// import useAuth from '../authContext';

type ErrorsType = {
  name: string;
  email: string;
  password: string;
};

export async function clientAction({
  request,
}: {
  request: Request;
}) {
  const formData = await request.formData();
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const errors: ErrorsType = {
    name: '',
    email: '',
    password: '',
  };
  if (name.length < 2) {
    errors.name = 'Name should be at least 2 characters';
  }
  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters';
  }

  if (errors.name || errors.email || errors.password) {
    return { errors };
  }

  try {
    const userCreateDto = { name, email, password };
    const response = await client.usersCreate({ userCreateDto });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   return { errors: { ...errorData } };
    // }

    // const loginData = await response();
    localStorage.setItem('token', response.email);
    console.log(111, response);
    return redirect('/');
  } catch (error) {
    return { errors: { general: 'Network error. Please try again.', error } };
  }
}

const Login: React.FC = () => {
//   const auth = useAuth();
//   const { login } = auth;
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher();
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));
  const formRef = useRef<HTMLFormElement>(null);

  //   useEffect(() => {
  //     if (fetcher.data?.ok) {
  //       formRef.current?.reset();
  //       if (blocker.state === 'blocked') {
  //         blocker.reset();
  //       }
  //       //   login();
  //       console.log(fetcher.data);
  //     }
  //   }, [fetcher.data, login]);

  const errors = fetcher.data?.errors;

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      onChange={(event) => {
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;
        setIsDirty(Boolean(email || password));
      }}
    >
      <div className="flex flex-col gap-4 justify-around mt-3">
        <p>
          <input type="name" name="name" placeholder="name" />
          {errors?.name && <em>{errors.name}</em>}
        </p>
        <p>
          <input type="email" name="email" placeholder="email" />
          {errors?.email && <em>{errors.email}</em>}
        </p>
        <p>
          <input type="password" name="password" placeholder="password" />
          {errors?.password && <em>{errors.password}</em>}
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
        >
          Зарегистрироваться
        </button>
      </div>
      {blocker.state === 'blocked' && (
        <div>
          <p>Wait! You didn&apos;t send the message yet:</p>
          <p>
            <button type="button" onClick={() => blocker.proceed()}>
              Leave
            </button>{' '}
            <button type="button" onClick={() => blocker.reset()}>
              Stay here
            </button>
          </p>
        </div>
      )}
    </fetcher.Form>
  );
};

export default Login;

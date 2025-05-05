/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { redirect, useFetcher, data, useBlocker } from 'react-router';
import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../authContext';
import type { Route } from './+types/login';

export async function clientAction({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  type ErrorsType = {
    name: string,
    password: string,
  };

  const errors: ErrorsType = {
    name: '',
    password: '',
  };

  if (!email.includes('@')) {
    errors.name = 'Invalid email address';
  }
  if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters';
  }
  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return redirect('/');
}

const Login = () => {
  const { login } = useAuth();
  const [isDirty, setIsDirty] = useState(false);
  const fetcher = useFetcher();
  const blocker = useBlocker(
    useCallback(() => isDirty, [isDirty]),
  );
  const formRef = useRef<HTMLFormElement>(null);
  // useEffect(() => {
  //   if (fetcher.data?.ok) {
  //     formRef.current?.reset();
  //     if (blocker.state === 'blocked') {
  //       blocker.reset();
  //     }
  //   }
  // }, [fetcher.data]);

  const errors = fetcher.data?.errors;
  if (!errors) {
    login(fetcher.data);
  }
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
      <div className="flex flex-col gap-4 justify-arround mt-3">
        <p>
          <input type="name" name="name" placeholder="name" />
          {errors?.name ? <em>{errors.name}</em> : null}
        </p>
        <p>
          <input type="password" name="password" placeholder="password" />
          {errors?.password ? (
            <em>{errors.password}</em>
          ) : null}
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
        >
          Войти
        </button>
      </div>
      {blocker.state === 'blocked' && (
        <div>
          <p>Wait! You didn&apos;t send the message yet:</p>
          <p>
            <button
              type="button"
              onClick={() => blocker.proceed()}
            >
              Leave
            </button>{' '}
            <button
              type="button"
              onClick={() => blocker.reset()}
            >
              Stay here
            </button>
          </p>
        </div>
      )}
    </fetcher.Form>
  );
};

export default Login;

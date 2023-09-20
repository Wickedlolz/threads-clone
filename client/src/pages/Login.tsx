import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../store';
import { setUser } from '../store/reduces/authSlice';

interface Inputs {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Handles user login using the provided email and password.
     *
     * @param {Object} data - User input containing email and password.
     * @param {string} data.email - The user's email for authentication.
     * @param {string} data.password - The user's password for authentication.
     */
    const handleLogin: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true);
        authService
            .login(data.email, data.password)
            .then((user) => {
                dispatch(setUser(user));
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <article className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6'
                        >
                            Email address{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required!',
                                    },
                                })}
                                name='email'
                                type='email'
                                autoComplete='email'
                                className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                        {errors.email?.type === 'required' && (
                            <span className='text-red-500 text-sm'>
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 '
                            >
                                Password <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='password'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required!',
                                    },
                                })}
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                        {errors.password?.type === 'required' && (
                            <span className='text-red-500 text-sm'>
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <button
                            disabled={isLoading}
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300'
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Don't have an account?{' '}
                    <Link
                        to='/signup'
                        className='font-semibold leading-6 text-blue-400 hover:text-blue-500'
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </article>
    );
};

export default Login;

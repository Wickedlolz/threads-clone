import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setUser } from '../store/reduces/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services';
import { toast } from 'react-toastify';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface Inputs {
    name: string;
    username: string;
    email: string;
    password: string;
    rePassword: string;
}

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /**
     * Handles user sign-up by registering provided user data.
     *
     * This function sets loading state, calls the authentication service to register the user using the provided data,
     * and updates the application state upon successful registration. If an error occurs during the registration process,
     * it displays an error toast message.
     *
     * @param {Inputs} data - User data for registration.
     * @returns {void}
     */
    const handleSignUp: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true);
        authService
            .register(data)
            .then((user) => {
                dispatch(setUser(user));
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <article className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                    Sign Up
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(handleSignUp)}
                >
                    <div className='w-full flex flex-col sm:flex-row justify-between'>
                        <div>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium leading-6'
                            >
                                Full Name{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='name'
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Name is required!',
                                        },
                                    })}
                                    name='name'
                                    type='text'
                                    className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                            {errors.name?.type === 'required' && (
                                <span className='text-red-500 text-sm'>
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6'
                            >
                                Username <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='username'
                                    {...register('username', {
                                        required: {
                                            value: true,
                                            message: 'Username is required!',
                                        },
                                    })}
                                    name='username'
                                    type='text'
                                    className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                            {errors.username?.type === 'required' && (
                                <span className='text-red-500 text-sm'>
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                    </div>
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
                                    pattern: {
                                        value: /^[A-Za-z0-9]{2,}@[a-z]+\.[a-z]{2,3}$/,
                                        message:
                                            'Invalid email. Email format must be (example@yahoo.com)',
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
                        {errors.email?.type === 'pattern' && (
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
                        <div className='mt-2 flex gap-1'>
                            <input
                                id='password'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required!',
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters long.',
                                    },
                                })}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                autoComplete='current-password'
                                className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                            <button
                                onClick={() =>
                                    setShowPassword((state) => !state)
                                }
                                className='bg-white text-black border-0 outline-none py-1 px-2 rounded-md'
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </button>
                        </div>
                        {errors.password?.type === 'required' && (
                            <span className='text-red-500 text-sm'>
                                {errors.password.message}
                            </span>
                        )}
                        {errors.password?.type === 'minLength' && (
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
                    Already a user?{' '}
                    <Link
                        to='/login'
                        className='font-semibold leading-6 text-blue-400 hover:text-blue-500'
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </article>
    );
};

export default SignUp;

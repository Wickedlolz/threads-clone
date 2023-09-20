import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <article className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
                    Sign Up
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6'>
                    <div className='w-full flex flex-col sm:flex-row justify-between'>
                        <div>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium leading-6'
                            >
                                Name <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    required
                                    className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
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
                                    name='username'
                                    type='text'
                                    required
                                    className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
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
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
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
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300'
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Already have account?{' '}
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

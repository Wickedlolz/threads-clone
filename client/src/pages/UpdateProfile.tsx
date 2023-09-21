import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setUser } from '../store/reduces/authSlice';
import usePreviewImage from '../hooks/usePreviewImage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

interface Inputs {
    name: string;
    username: string;
    email: string;
    photoURL: string | ArrayBuffer | null;
    bio: string;
}

const UpdateProfile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const { handleImageChange, imageUrl } = usePreviewImage();
    const { register, handleSubmit } = useForm<Inputs>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUpdateProfile: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true);
        authService
            .updateProfile({ ...data, photoURL: imageUrl })
            .then((user) => {
                dispatch(setUser(user));
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <section className='w-96 mx-auto'>
            <div className='mt-5 md:mt-0 md:col-span-2'>
                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                    <div className='shadow sm:rounded-md sm:overflow-hidden'>
                        <div className='px-4 py-5 space-y-6 sm:p-6'>
                            <div>
                                <div className='mt-1 flex items-center'>
                                    <div className='w-[40%]'>
                                        <img
                                            className='h-20 w-20 rounded-full overflow-hidden bg-gray-100 object-cover'
                                            src={
                                                (imageUrl as string) ||
                                                user?.photoURL
                                            }
                                            alt={user?.username}
                                        />
                                    </div>
                                    <div className='w-[60%]'>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                fileRef.current?.click()
                                            }
                                            className='w-full bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        >
                                            Change
                                        </button>
                                        <input
                                            type='file'
                                            ref={fileRef}
                                            onChange={handleImageChange}
                                            className='hidden'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div>
                                    <label
                                        htmlFor='fullName'
                                        className='block text-sm font-medium'
                                    >
                                        Full Name
                                    </label>
                                    <div className='mt-1 flex rounded-md shadow-sm'>
                                        <input
                                            type='text'
                                            {...register('name')}
                                            defaultValue={user?.name}
                                            name='fullName'
                                            id='fullName'
                                            className='focus:ring-indigo-500 focus:border-indigo-500 text-black flex-1 block w-full p-2 rounded-md sm:text-sm border-gray-300'
                                            placeholder='Full Name'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor='username'
                                        className='block text-sm font-medium'
                                    >
                                        Username
                                    </label>
                                    <div className='mt-1 flex rounded-md shadow-sm'>
                                        <input
                                            type='text'
                                            {...register('username')}
                                            defaultValue={user?.username}
                                            name='username'
                                            id='username'
                                            className='focus:ring-indigo-500 focus:border-indigo-500 text-black flex-1 block w-full p-2 rounded-md sm:text-sm border-gray-300'
                                            placeholder='Username'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium'
                                >
                                    Email Address
                                </label>
                                <div className='mt-1 flex rounded-md shadow-sm'>
                                    <input
                                        type='email'
                                        {...register('email')}
                                        defaultValue={user?.email}
                                        name='email'
                                        id='email'
                                        className='focus:ring-indigo-500 focus:border-indigo-500 text-black flex-1 block w-full p-2 rounded-md sm:text-sm border-gray-300'
                                        placeholder='Email Address'
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor='bio'
                                    className='block text-sm font-medium'
                                >
                                    Bio
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        id='bio'
                                        {...register('bio')}
                                        defaultValue={user?.bio}
                                        name='bio'
                                        rows={3}
                                        className='shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
                                        placeholder='Bio...'
                                    ></textarea>
                                </div>
                                <p className='mt-2 text-sm text-gray-500'>
                                    Brief description for your profile.
                                </p>
                            </div>
                        </div>
                        <div className='px-4 py-3 flex items-center justify-end sm:px-5'>
                            <button
                                disabled={isLoading}
                                type='submit'
                                className='primaryBtn align-middle w-full sm:w-auto'
                            >
                                {isLoading && <Spinner isSmall />}
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;

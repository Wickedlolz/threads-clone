import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { createThread, updateThread } from '../store/reduces/threadsSlice';
import usePreviewImage from '../hooks/usePreviewImage';
import { toast } from 'react-toastify';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import Spinner from './Spinner';

const MAX_CHAR = 500;

const CreateThread = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const updating = useAppSelector((state) => state.threads.updating);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [remainingChar, setRemainingChar] = useState<number>(MAX_CHAR);

    /**
     * Event handler for text area input change.
     *
     * This function updates the state based on the input text from a text area.
     *
     * @param {ChangeEvent<HTMLTextAreaElement>} event - The event object representing the change in the text area.
     *
     * @returns {void}
     */
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = event.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.substring(0, MAX_CHAR);
            setText(truncatedText);
            setRemainingChar(0);
        } else {
            setRemainingChar(MAX_CHAR - inputText.length);
            setText(inputText);
        }
    };

    /**
     * Handles the creation of a thread by preventing the default form event, handling potential errors,
     * and dispatching relevant actions.
     *
     * @param {FormEvent<HTMLFormElement>} event - The form event triggering the thread creation.
     *
     * @returns {void}
     */
    const handleCreteThread = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);

        if (text.length === 0) {
            setError(true);
            return;
        }

        dispatch(createThread({ text, imageUrl: imageUrl as string }))
            .unwrap()
            .then((thread) => {
                dispatch(updateThread({ ...thread, postedBy: user }));
                setOpenModal(false);
                setText('');
                setImageUrl(null);
                toast.success('Thread created successfully.');
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <button
                onClick={() => setOpenModal((state) => !state)}
                className="fixed bottom-10 right-10 bg-gray-600 p-3 rounded-full hover:bg-gray-700 duration-300"
            >
                <AiOutlinePlus />
            </button>
            {openModal && (
                <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full">
                    <div className="relative rounded-lg shadow dark:bg-gray-900">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setOpenModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Create Thread
                            </h3>
                            <form
                                className="space-y-6"
                                onSubmit={handleCreteThread}
                            >
                                <div>
                                    <textarea
                                        value={text}
                                        onChange={handleTextChange}
                                        cols={30}
                                        rows={6}
                                        placeholder="Thread content goes here..."
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    ></textarea>
                                    <p className="text-xs font-bold text-right m-1 text-white">
                                        {remainingChar}/{MAX_CHAR}
                                    </p>
                                    {error && (
                                        <span className="text-red-500 text-sm">
                                            Thread content is required!
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={imageRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                    <BsFillImageFill
                                        className="cursor-pointer"
                                        size={20}
                                        onClick={() =>
                                            imageRef.current?.click()
                                        }
                                    />
                                </div>
                                <div>
                                    {imageUrl && (
                                        <div className="w-full h-52 flex mt-5 relative">
                                            <img
                                                className="w-full object-cover"
                                                src={imageUrl as string}
                                                alt="slected image"
                                            />
                                            <button
                                                onClick={() =>
                                                    setImageUrl(null)
                                                }
                                                className="bg-gray-800 absolute top-2 right-2 rounded-full p-2"
                                            >
                                                <IoMdClose />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="primaryBtn w-full"
                                >
                                    {updating && <Spinner isSmall />}
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateThread;

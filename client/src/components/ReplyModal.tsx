import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeModal } from '../store/reduces/replyModalSlice';
import { updateThread } from '../store/reduces/threadsSlice';
import { threadService } from '../services';
import { toast } from 'react-toastify';

import Spinner from './Spinner';

const ReplyModal = () => {
    const dispatch = useAppDispatch();
    const { replyTo, threadId } = useAppSelector((state) => state.replyModal);
    const [replyText, setReplyText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleReply = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(false);

        if (replyText.length === 0) {
            setError(true);
            return;
        }

        setIsLoading(true);
        threadService
            .replyToThreadById(threadId!, replyText)
            .then((thread) => {
                dispatch(updateThread(thread));
                dispatch(closeModal());
                toast.success('Reply successfully.');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow dark:bg-gray-900">
                <button
                    type="button"
                    className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => dispatch(closeModal())}
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
                    <h3 className="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                        Reply to @{replyTo}
                    </h3>
                    <form className="space-y-6" onSubmit={handleReply}>
                        <div>
                            <input
                                value={replyText}
                                onChange={(event) =>
                                    setReplyText(event.target.value)
                                }
                                type="text"
                                placeholder="Reply goes here..."
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                            {error && (
                                <span className="text-red-500 text-sm">
                                    Reply is required!
                                </span>
                            )}
                        </div>
                        <button type="submit" className="primaryBtn w-full">
                            {isLoading && <Spinner isSmall />}
                            Reply
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;

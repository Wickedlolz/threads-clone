import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { authService } from '../services';
import { removeUser } from '../store/reduces/authSlice';
import { clearThreads } from '../store/reduces/threadsSlice';
import { clearConversations } from '../store/reduces/conversationSlice';
import { toast } from 'react-toastify';

const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /**
     * Logs the user out by invoking the authService's logout function.
     * Upon successful logout, it dispatches actions to remove the user and clear threads,
     * then navigates to the home page.
     *
     * @returns {void}
     */
    const logout = () => {
        authService
            .logout()
            .then(() => {
                dispatch(removeUser());
                dispatch(clearThreads());
                dispatch(clearConversations());
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return logout;
};

export default useLogout;

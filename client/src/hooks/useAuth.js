import { useContext, useState } from 'react';
import { Context } from '../main';
import { login, registration } from '../http/userAPI';

const useAuth = (isLogin) => {
    const { user } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleAuthAction = async () => {
        setError('');

        if (!email || !password || (!isLogin && !username)) {
            setError('Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, username);
            }
            user.setUser(data); 
            user.setIsAuth(true);
            return true; 
        } catch (e) {
            console.error(e); 
            if (e.response && e.response.data && typeof e.response.data === 'object') {
                errorMessage = e.response.data.message || 'Unknown error.';
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            return false; 
        }
    };

    return {
        email,
        password,
        username,
        error,
        setEmail,
        setPassword,
        setUsername,
        handleAuthAction,
    };
};

export default useAuth;

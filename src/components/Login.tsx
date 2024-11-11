import React, {useState} from 'react';
import Api from '../api';

interface LoginProps {
    onLogin: (isAuth:boolean) => void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const apiResponse = await Api.post("auth/login", {
                email: email,
                password: password,
            });
            if (apiResponse.message.code !== 100) {
                setError(apiResponse.message.messages.join("<br />"));
            } else {
                localStorage.clear();
                localStorage.setItem("sid", apiResponse.data?.sessions[0].id);
                Api.setSid(apiResponse.data?.sessions[0].id);
                onLogin(true);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container mt-5">
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text"
                           className="form-control"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password"
                           className="form-control"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;

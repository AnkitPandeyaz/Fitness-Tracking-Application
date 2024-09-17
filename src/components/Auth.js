import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in with Google:', error);
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth-button">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                    {isLogin && (
                        <button type="button" onClick={handleGoogleLogin} className="google-button">
                            Login with Google
                        </button>
                    )}
                </form>
                {error && <p className="error">{error}</p>}
                <p>
                    {isLogin ? (
                        <>
                            Don't have an account? <Link to="#" onClick={() => setIsLogin(false)}>Sign Up</Link>
                        </>
                    ) : (
                        <>
                            Already have an account? <Link to="#" onClick={() => setIsLogin(true)}>Login</Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;

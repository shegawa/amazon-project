import React, { useContext } from 'react';
import './signup.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../../Utility/Firebase";
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { ClipLoader } from 'react-spinners';
import { Type } from '../../Utility/action.Type';
function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        signIn: false,
        signUP: false,
    });
    const [{ user }, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const navStateData = useLocation();
    const authHandler = async (e) => {
        e.preventDefault()
        if (e.target.name == "signin") {
            setLoading({ ...loading, signIn: true });
            signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
                setLoading({ ...loading, signIn: false });
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err) => {
                setError(err.message);
                setLoading({ ...loading, signIn: false });
            });
        } else {
            setLoading({ ...loading, signUP: true });
            createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
                setLoading({ ...loading, signUP: false });
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err) => {
                setError(err.message);
                setLoading({ ...loading, signUP: false });
            })
        }

    }
    return (
        <section className='login'>
            <Link to="/">  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg " alt="" />    </Link>
            <div className='login-container'>
                <h1> Sign In</h1>
                {
                    navStateData?.state?.msg && (
                        <small style={{
                            padding: "5px",
                            textAlign: "center",
                            color: "red",
                            fontWeight: "bold",
                        }}>{navStateData?.state?.msg}</small>
                    )}
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id='email' />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' />
                    </div>
                    <button type="submit" onClick={authHandler} name="signin" className='signin'>
                        {
                            loading.signIn ? (
                                <ClipLoader color="#36d7b7" size={15} />
                            ) : ("sign In")
                        }
                    </button>
                </form>
                <p> By signing-in you agree to the Amazon fake project condtions of use & sale. Please see our privacy notice, our cookies and our interst-based and notice. </p>
                <button type="submit" onClick={authHandler} name="signup" className='account'>
                    {
                        loading.signIn ? (
                            <ClipLoader color="#36d7b7" size={15} />
                        ) : ("Create Your Amazon Account")}
                </button>
                {error && (
                    <small style={{ paddingTop: "5px", color: "red" }}>{error} </small>
                )}
            </div>
        </section >
    );
}

export default Auth;



















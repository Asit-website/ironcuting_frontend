import React,{useState} from 'react';
import loginImage1 from "../../image/loginImage.png";
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const {login,setUser} = useMain();
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ans = await login(value);
        console.log(ans);
        // console.log(ans.)
        // notify(ans.status, ans.message);
        alert("login success")
        if (ans.status) {
            setUser(ans.user);
            localStorage.setItem('iron_user', JSON.stringify(ans.user));
            localStorage.setItem('iron_token', JSON.stringify({
                token: ans.token,
                rememberMe: document.getElementById('remember')?.checked,
                expiry: new Date().getTime() + 24 * 60 * 60 * 1000 // 1 Day
            }));
            
            if (ans.user.role === 'ADMIN') {
                navigate('/dashboard');
            }
            else {
                navigate('/');
            }
        }
    }
    return (
        <div class="iron-login-man">
            <div class="iron-login-main">
                <div class="iron-login-flex">
                   <div class="iron-login-left">
                       <img src={loginImage1} alt="login-img"/>
                   </div>
                   <div class="right">
                       <div class="login-page">
                           <h2>Log In</h2>
                           <div class="login-form-main">
                               <form>
                                   <div class="login-form">
                                       <label for="email">Email</label>
                                       <input id="email" type="text" placeholder="Enter your email"/>
                                   </div>
                                   <div class="login-form">
                                       <label>password</label>
                                       <input type="text" placeholder="Enter your password"/>
                                   </div>
                                   <div class="forget-pass">
                                       <div class="check-remember">
                                           <input type="checkbox" name="remember"/>
                                           <label>Remember me</label>
                                       </div>
                                       <div class="login-password">
                                           <span class="psw"><a href="#">Forgot password?</a></span>
                                       </div>
                                   </div>
                                   <div class="Login-btn">
                                       <button type="button" class="Logbtn">Log in</button>
                                       <p>Terms of Use and Privacy Policy.</p>
                                   </div>
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Auth;

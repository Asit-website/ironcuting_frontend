import React,{useState} from 'react'
import loginImage1 from '../../image/loginImage.png';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';
const ResetPassword = ({notify}) => {
    const { changePassword } = useMain();
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
        otp: '',
        password: '',
        password1: ''
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (value.password === value.password1) {
            const ans = await changePassword({ email: JSON.parse(localStorage.getItem('b-reset')).email, password: value.password });

            if (ans.status) {
                notify(ans.status, ans.message);
                navigate("/");
            }
            else {
                notify(ans.status, ans.message);
            }
        }
        else {
            notify(false, "Password and confirm password must be same!");
        }
    };
  return (
   <>
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
                               <form onSubmit={handleSubmit}>
                                   
                                   <div class="login-form">
                                       <label htmlFor='password'>password</label>
                                       <input onChange={handleChange} name='password' value={value.password} id='password' type="text" placeholder="Enter password"/>
                                   </div>
                                   <div class="login-form">
                                       <label htmlFor='password'>password</label>
                                       <input onChange={handleChange} name='password1' value={value.password1} id='password' type="text" placeholder="Enter confirm password"/>
                                   </div>
                                   <div class="Login-btn">
                                       <button type="submit" class="Logbtn">Log in</button>
                                       <p>Terms of Use and Privacy Policy.</p>
                                   </div>
                               </form>
                           </div>
                       </div>
                   </div>

               </div>
               
           </div>
        </div>
   </>
  )
}

export default ResetPassword

import React,{useState} from 'react'
import loginImage1 from "../../image/loginImage.png";
import { useMain } from '../../hooks/useMain'
import { useNavigate } from 'react-router-dom';
const ForgotPass = ({notify}) => {
    const {sendOtp} = useMain();

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

    const send = async (e) => {
        e.preventDefault();

        let ans = await sendOtp({ email: value.email });
        if (ans.status) {
            localStorage.setItem('b-reset', JSON.stringify({ email: value.email, otp: ans.otp }));
            notify(ans.status, ans.message);
            navigate('/getOtp');
        }
        else {
            notify(ans.status, ans.message);
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
                               <form onSubmit={send}>
                                   <div class="login-form">
                                       <label htmlFor="email">Email</label>
                                       <input name='email' onChange={handleChange} id="email" type="email" value={value.email} placeholder="Enter your email"/>
                                   </div>
                                   <div class="Login-btn">
                                       <button type="submit" class="Logbtn">Reset Password</button>
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

export default ForgotPass

import React from 'react'
import loginImage1 from '../../image/loginImage.png';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';
const GetOtp = ({notify}) => {
    const { sendOtp, submitOtp } = useMain()
    const navigate = useNavigate();

    const resend = async () => {
        let ans = await sendOtp({ email: JSON.parse(localStorage.getItem('b-reset')).email });
        if (ans.status) {
            localStorage.setItem('b-reset', JSON.stringify({ email: JSON.parse(localStorage.getItem('b-reset')).email, otp: ans.otp }));
            notify(ans.status, ans.message);
        }
        else {
            notify(ans.status, ans.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let otp1='';
        let b1 = document.querySelectorAll('.signin_input');
        for(let i of b1)
        {
            otp1+=i.children[0].value;
        }

        const ans = await submitOtp({ otp: JSON.parse(localStorage.getItem('b-reset')).otp, otp1 });

        if (ans.status) {
            notify(ans.status, ans.message);
            navigate("/reset-password");
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
                           <h2>Check your email</h2>
                           <p className='text-center mt-2'>We’ve sent a code to <span className='font-semibold'>{JSON.parse(localStorage.getItem('b-reset'))?.email}</span></p>
                           <div class="login-form-main">
                               <form onSubmit={handleSubmit}>
                                   <div className="flex align-items-center">
                                   <div class="login-form login-form11 signin_input">
                                       <input className='text-center' maxLength="1" type="text"/>
                                   </div>
                                   <div class="login-form login-form11 signin_input">
                                       <input className='text-center'  type="text" maxLength="1"/>
                                   </div>
                                   <div class="login-form login-form11 signin_input">
                                       <input className='text-center' type="text" maxLength="1"/>
                                   </div>
                                   <div class="login-form login-form11 signin_input">
                                       <input className='text-center' type="text" maxLength="1"/>
                                   </div>
                                   </div>
                                   <div class="Login-btn">
                                       <button type="submit" class="Logbtn">Verify</button>
                                       <p>Didn’t get a code? <span onClick={resend} className='font-semibold'>Click to resend</span></p>
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

export default GetOtp

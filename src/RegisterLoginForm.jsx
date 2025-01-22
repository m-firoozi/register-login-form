import React from "react";
import { useState } from "react";

const RegisterLoginForm=() =>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const [isLogin,setIsLogin]=useState(false);

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setMessage("");

        const emailRegister= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegister.test(email)){
            setMessage("ایمیل وارد شده معتبر نیست");
            return;
        }

        if(password.length < 8){
            setMessage("رمز عبور باید حداقل 8 کاراکتر باشد");
            return;
        }


        try{
            if(isLogin){
                const response = await fetch("https://6790c0adaf8442fd73778cfa.mockapi.io/api/form/users");
                const users=await response.json();
                const user= users.find((u)=> u.email === email && u.password === password);
                if(user){
                    setMessage("ورود موفقیت آمیز بود");
                } else{
                    setMessage("ایمیل یا رمز عبور اشتباه است");
                }
            }else{

            const response = await fetch("https://6790c0adaf8442fd73778cfa.mockapi.io/api/form/users",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body : JSON.stringify({email,password}),
            });
            
            if (response.ok){
                setMessage("ثبت نام با موفقیت انجام شد");
            }else {
                setMessage("خطایی رخ داده است");
            }
        }

        }catch(error){
            setMessage("مشکلی در اتصال به سرور پیش آمده است");
        }
    };
    return(
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"20px"}}>
                <h2>{isLogin ? "فرم ورود" : "فرم ثبت نام"}</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                <div>
                    <label>ایمیل:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width:"100%",padding:"8px",marginBottom:"10px"}}/>

                </div>
                <div>
                    <label>رمز عبور</label>
                    <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} required style={{width:"100%",padding:"8px",marginBottom:"10px"}}/>

                </div>
                <button type="submit" style={{padding:"10px 20px"}}>
                    {isLogin ? "ورود" : "ثبت نام"}
                </button>
            </form>
            <button onClick={() =>{
                setIsLogin(!isLogin);
                setMessage("")
            }}
            style={{marginTop:"10px",padding:"10px 20px"}}>
                {isLogin ? "رفتن به فرم ثبت نام" : " رفتن به فرم ورود"}
            </button>
        </div>
    )
};
 export default RegisterLoginForm;
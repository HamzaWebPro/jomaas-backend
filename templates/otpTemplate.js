const otpTemplate = (otp) => {
  return `<div style="background: linear-gradient(to bottom, #005B89, #61443E); display: flex; justify-content: center; align-items: center;  padding: 20px; box-sizing: border-box;">
  <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; max-width: 400px; width: 100%; box-sizing: border-box;">
    <img src="https://i.postimg.cc/xdWRWKNj/PNG-1.png" alt="Logo" style="width: 100px; height: 50px; margin: 20px auto; display: block;">
    <p style="color: #61443E; font-size: 18px; margin-bottom: 20px;">Your password reset OTP code is <span style="font-weight: bold; font-size: 25px; color: #FCB900;">${otp}</span>. Insert the code to the match OTP page and finally reset the password.</p>
  </div>
</div>
`;
};

module.exports = otpTemplate;

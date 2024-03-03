const verificationTemplate = (verificationToken) => {
  return `<div style="background: linear-gradient(to bottom, #005B89, #61443E); display: flex; justify-content: center; align-items: center;  padding: 20px; box-sizing: border-box;">
  <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; max-width: 400px; width: 100%; box-sizing: border-box;">
    <img src="https://i.postimg.cc/xdWRWKNj/PNG-1.png" alt="Logo" style="width: 100px; height: 50px; margin: 20px auto; display: block;">
    <p style="color: #61443E; font-size: 18px; margin-bottom: 20px;">Please click the following link to verify your account:</p>
    <a href="https://jomaas-order.vercel.app/verify?token=${verificationToken}" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #FCB900; color: #ffffff; border-radius: 5px; transition: background-color 0.3s;"
      target="_blank">Verify Account</a>
  </div>
</div>`;
};

module.exports = verificationTemplate;

const nodemailer = require("nodemailer");
// Email
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "nk105000@gmail.com",
      pass: process.env.MAIL_PASSWORD
    },
  });
  
  // Mail Endpoint
  // async..await is not allowed in global scope, must use a wrapper
  exports.sendMail = async function ({ to, subject, html, text }) {
    const info = await transporter.sendMail({
      from: '"Zwitter" <nayakshubhanshu060705@gmail.com>', // sender address
      to: to, // list of receivers
      subject,
      text,
      html, // html body
    });
    return info;
  };
exports.ResetSuccess = function (email) {
  return `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Receipt</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
    
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
    
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      </style>
    
    </head>
    <body style="background-color: #D2C7BA;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:50px;">
   
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 10px 90px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style=" margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Password Changed Successfully</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
  
        <tr>
          <td align="center" bgcolor="#D2C7BA">
  
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr style="">
                <td align="left" bgcolor="#ffffff" style="text-align:center; padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 17px; line-height: 20px;">
                  <p style="margin: 0;">Your Password of shop pulse account with email of ${email} is successfully changed.</p>
                </td>
              </tr>
  
    
            </table>
  
          </td>
        </tr>
  
        <tr>
        </tr>
  
        <tr>
          <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
  
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <p style="margin: 0;">You received this email because we received a request of forgot passsword form your Shop Pulse account. If you didn't request you can safely ignore or delete this email.</p>
                </td>
              </tr>
  
  
    
            </table>
  
          </td>
        </tr>
  
    
      </table>
  
    </body>
    </html>`;
};

exports.ResetReq = function (resetPageLink) {
  return `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Receipt</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
    
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
    
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      a {
    width: 200px;
    height: 50px;
    margin-top:10px;
    border: 3px solid ;
    transition: all 0.3s;
    cursor: pointer;
    background: white;
    font-size: 1em;
    font-weight: 550;
    font-family: 'Montserrat', sans-serif;
  }
  
  a:hover {
    font-size: 1.2em;
  }
      </style>
    
    </head>
    <body style="background-color: #D2C7BA;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:50px;">
   
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="text-align:center; padding: 10px 20px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style=" margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Password Request</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
  
        <tr>
          <td align="center" bgcolor="#D2C7BA">
  
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr style="">
                <td align="left" bgcolor="#ffffff" style="text-align:center; padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 17px; line-height: 20px;">
                  <p style="margin: 0;">Your Request to Change Password of shop pulse account is successfully Aprroved Click Reset to Proceed Further</p>
  <a href=${resetPageLink}>
    Reset
  </a>
                </td>
              </tr>
  
    
            </table>
          </td>
        </tr>
  
        <tr>
        </tr>
  
        <tr>
          <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
  
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <p style="margin: 0;">You received this email because we received a request of forgot passsword form your Shop Pulse account. If you didn't request you can safely ignore or delete this email.</p>
                </td>
              </tr>
  
  
    
            </table>
  
          </td>
        </tr>
  
    
      </table>
  
    </body>
    </html>`;
};

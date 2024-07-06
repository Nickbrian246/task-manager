export function registerUserTokenEmailMessageTemplate(numericToken:string, email:string){
  const registerTokenMessage = {
    to: `${email}`,
    from: 'nbjm1234@outlook.com', // Use the email address or domain you verified above
    subject: 'authentication token',
    text: 'authentication token',
    html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Hello,</p>
          <p>Thank you for using Task Manager. Here is your authentication token:</p>
          <p style="font-size: 20px; font-weight: bold; color: #333;">${numericToken}</p>
          <p>Please use this token to complete your authentication process.</p>
          <p>Best regards,</p>
          <p>The Task Manager Team</p>
          </div>
  `,
  };
  return registerTokenMessage
}
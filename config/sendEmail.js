const Brevo = require("@getbrevo/brevo");

async function sendEmail(email,otp) {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: { name: "Store", email: "bipinadhikari552@gmail.com" },
      to: [{ email:email, name: "Receiver" }],
      subject: "Hello from WineStroe",
      htmlContent: `<h1>This is the OTP </h1><p>${otp}</p>`,
    };

    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("Email sent:", response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = { sendEmail };

import Brevo from "@getbrevo/brevo";

export default async function sendEmail(){
    try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const emailData = {
      sender: { name: "Store", email: "bipinadhikari552@gmail.com" },
      to: [{ email: "bipinadhikari654@gmail.com", name: "Receiver" }],
      subject: "Hello from Brevo + Node.js",
      htmlContent: "<h1>This is a test email </h1><p>Working perfectly.</p>",
    };

    const response = await apiInstance.sendTransacEmail(emailData);
    console.log("Email sent:", response);

  } catch (err) {
    console.error("Error sending email:", err);
  }
}


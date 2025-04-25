const fs = require("fs");
const path = require("path");
const transporter = require("./config");
const envs = require("../config/environments");

const sendRecoveryCode = async (to, code) => {
  try {
    const htmlFilePath = path.resolve("./src/email/templates/recovery.html");
    const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
    const date = new Date().toLocaleDateString("es", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const [one, two, three, four, five, six] = code.toString().split("");
    const personalizedHtmlContent = htmlContent
      .replace("{{frontend1}}", envs.URL_FRONTEND)
      .replace("{{date}}", date)
      .replace("{{one}}", one)
      .replace("{{two}}", two)
      .replace("{{three}}", three)
      .replace("{{four}}", four)
      .replace("{{five}}", five)
      .replace("{{six}}", six)
      .replace("{{frontend2}}", envs.URL_FRONTEND);
    const response = await transporter.sendMail({
      from: `"Portal diplomado" < ${envs.EMAIL_USER} >`,
      to,
      subject: "Recuperar contraseña en Portal diplomado",
      html: personalizedHtmlContent,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendRecoveryCode };

var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

function sendConfirmationEmail(name, email, token, model) {
    let url = `http://${process.env.IP}:${process.env.PORT}/api/verifyaccount/`,
    code = `${url + token}?type=${model}`;
    transport
        .sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "lUXURY DELIVERY CONFIRMATION ACCOUNT",
            html:
            `<h1 >Confirmacion de correo electronico</h1>
          <h1> ${name}</h1>
          <p>Gracias por inscribirte. Por favor confirma tu correo electronico ingresando al siguiente enlace:</p>
          <a href="${code}">Click aqui</a> `,
        })
        .catch((err) => console.log(err));
}

module.exports = function verificationToken(schema) {
    schema.add({
        token: {
            type: String,
            unique: false,
        },
    });

    schema.pre("save", function (next) {
        let doc = this;
        if (doc.isModified("email") || doc.isNew) {
            doc.active = false;
            doc.token = jwt.sign({ email: doc.email }, process.env.SECRET);
        }
        next();
    });

    schema.post("save", function (doc) {
        if (!doc.active)
            sendConfirmationEmail(
                doc.name,
                doc.email,
                doc.token,
                String(doc.constructor.modelName).toLowerCase()
            );
    });
};

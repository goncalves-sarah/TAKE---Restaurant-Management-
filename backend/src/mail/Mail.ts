import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { resolve } from 'path';

const transport = createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
    }
});

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: false,
        extname: '.html',
        partialsDir: resolve('./src/mail/template/'),
    },
    viewPath: resolve('./src/mail/template/'),
    extName: '.html'
}))

export default transport;
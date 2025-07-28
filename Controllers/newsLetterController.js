import nodemailer from 'nodemailer';


export const sendMail = async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(404).json({ msg: "email not found" });
    }

    try {

        //transporter
        const transpoter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASS
            }
        });

        //mail options;
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            replyTo: email,                   // ✅ sets the user's email for replies

            subject: "New Subscriber of DreamScapes",
            text: `You have a new subscriber with name:${name} and email:${email}`
        };

        //send mail
        await transpoter.sendMail(mailOptions);
        res.status(200).json({ msg: "mail sent successfully" });

    } catch (error) {
        res.status(500).json({ msg: "internal server error while subscribing " + error });
    }

}
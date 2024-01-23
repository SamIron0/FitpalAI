import WaitlistEmailTemplate from '@/components/WaitlistEmailTemplate';
import { NextApiHandler } from 'next';
import { Resend } from 'resend';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { name, email } = req.query;
    const resend = new Resend('re_N34y4JVC_51XbLjazeSGG4cLdn1HjsFtn');

    const toEmail = email ? String(email) : 'samuelironkwec@gmail.com'; // Ensure toEmail is always a string
    const userName = name ? String(name) : ''; // Ensure toEmail is always a string

    await resend.emails.send({
      from: 'FitpalAI <samuel@fitpalai.com>',
      to: toEmail,
      subject: 'Thank you for joining the fitpal community!',
      react: WaitlistEmailTemplate(userName)
    });

    res
      .status(200)
      .json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

export default handler;

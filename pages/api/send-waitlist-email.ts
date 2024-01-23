import WaitlistEmailTemplate from '@/components/WaitlistEmailTemplate';
import { NextApiHandler } from 'next';
import { Resend } from 'resend';

const handler: NextApiHandler = async (req, res) => {
  try {
    const resend = new Resend('re_N34y4JVC_51XbLjazeSGG4cLdn1HjsFtn');
    resend.emails.send({
      from: 'FitpalAI <samuel@fitpalai.com>',
      to: ['samuelironkwec@gmail.com'],
      subject: 'Thank you for joining the fitpal community!',
      react: WaitlistEmailTemplate()
    });
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
};

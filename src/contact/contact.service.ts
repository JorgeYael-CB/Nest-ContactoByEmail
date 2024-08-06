import { Transporter, createTransport } from 'nodemailer';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmail } from './dto/create-contact.dto';
import { envs } from 'src/config';



@Injectable()
export class ContactService {

  private readonly mailerUser: string;
  private readonly transporter: Transporter
  private mailerHost = envs.mailerHost;


  constructor(){
    this.mailerUser = envs.mailserUser;
    this.transporter = createTransport({
      host: this.mailerHost,
      auth: {
        user: envs.mailserUser,
        pass: envs.mailerPass,
      }
    });
  }


  async contactByEmail({asunto, email, message, name, phoneNumber}: SendEmail) {
    //TODO: enviamos el email
    try {
      const info = await this.transporter.sendMail({
        from: email,
        to: this.mailerUser,
        subject: asunto,
        html: `
          <h1>Alguien quiere contactarte</h1>
          <hr/>
          <h2>--- Datos del usuario ---</h2>
          <p> <strong>Nombre: </strong> ${name} </p>
          <p> <strong>Email: </strong> ${email} </p>
          <p> <strong>Numero de telefono: </strong> ${phoneNumber ? phoneNumber : 'No agregado'} </p>
          <p> <strong>Mensaje: </strong> ${message} </p>
        `,
      });

      if( !info ){
        throw new BadRequestException('An unexpected error occurred while sending the email, please try again later.')
      }

      return 'Email enviado correctamente!';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error.');
    };
  };

}

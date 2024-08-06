import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  mailserUser: get('MAILER_EMAIL').required().asString(),
  mailerPass: get('MAILER_PASSWORD').required().asString(),
  mailerHost: get('MAILER_HOST').required().asString(),
  port: get('PORT').required().asPortNumber(),
}

import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendEmail } from './dto/create-contact.dto';


@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() sendEmail: SendEmail) {
    return this.contactService.contactByEmail(sendEmail);
  }


}

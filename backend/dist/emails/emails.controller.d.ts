import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
export declare class EmailsController {
    private readonly emailsService;
    constructor(emailsService: EmailsService);
    create(createEmailDto: CreateEmailDto): Promise<import("./entities/email.entity").Email>;
    findAll(): Promise<import("./entities/email.entity").Email[]>;
    findOne(id: number): Promise<import("./entities/email.entity").Email>;
    update(id: number, updateEmailDto: UpdateEmailDto): Promise<import("./entities/email.entity").Email>;
    remove(id: number): Promise<void>;
}

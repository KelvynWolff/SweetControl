import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
export declare class EmailsService {
    private readonly emailRepository;
    constructor(emailRepository: Repository<Email>);
    create(createEmailDto: CreateEmailDto): Promise<Email>;
    findAll(): Promise<Email[]>;
    findOne(id: number): Promise<Email>;
    update(id: number, updateEmailDto: UpdateEmailDto): Promise<Email>;
    remove(id: number): Promise<void>;
}

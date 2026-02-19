import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findByBusiness(businessId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { businessId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateRole(id: string, businessId: string, role: UserRole): Promise<User> {
    const user = await this.findOne(id);
    if (!user || user.businessId !== businessId) {
      throw new NotFoundException('Staff member not found');
    }
    user.role = role;
    return this.usersRepository.save(user);
  }

  async remove(id: string, businessId: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user || user.businessId !== businessId) {
      throw new NotFoundException('Staff member not found');
    }
    if (user.role === UserRole.OWNER) {
      throw new BadRequestException('Cannot remove the business owner');
    }
    await this.usersRepository.remove(user);
  }
}

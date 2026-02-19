import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { BusinessesService } from '../businesses/businesses.service';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { Otp } from './entities/otp.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private businessesService: BusinessesService,
    private mailService: MailService,
    private jwtService: JwtService,
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  async sendOtp(email: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 min expiry

    // Save OTP
    const otp = this.otpRepository.create({
      email,
      code,
      expiresAt,
    });
    await this.otpRepository.save(otp);

    // Send Email
    await this.mailService.sendOtp(email, code);
    
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(email: string, code: string) {
    const otpRecord = await this.otpRepository.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });

    if (!otpRecord) {
      throw new BadRequestException('OTP not found');
    }

    if (otpRecord.code !== code) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new BadRequestException('OTP expired');
    }

    // OTP Valid
    await this.otpRepository.remove(otpRecord); // Consume OTP
    return { message: 'OTP verified successfully' };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registrationData: any) {
    const existingUser = await this.usersService.findByEmail(registrationData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Determine Role (Default to OWNER if businessName is provided, else CUSTOMER)
    let role = registrationData.role || UserRole.CUSTOMER;
    
    // Security: Prevent unauthorized ADMIN registration
    if (role === UserRole.ADMIN) {
      throw new UnauthorizedException('Cannot register as Admin publicly');
    }

    if (registrationData.businessName && !registrationData.role) {
      role = UserRole.OWNER;
    }

    // 1. Create User
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const user = await this.usersService.create({
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      password: hashedPassword,
      role: role as UserRole,
      phone: registrationData.phone,
      businessId: registrationData.businessId, // For staff/managers joining existing business
    });

    // 2. Create Business (only for Owners)
    if (role === UserRole.OWNER && registrationData.businessName) {
      const business = await this.businessesService.create({
        name: registrationData.businessName,
        category: registrationData.category,
        monthlyVisitors: registrationData.monthlyVisitors,
        goal: registrationData.goal,
        ownerId: user.id,
      });
      
      // Optionally link the owner user to the new businessId
      user.businessId = business.id;
      await this.usersService.create(user); // Save update
    }

    const { password, ...result } = user;
    return result;
  }
}

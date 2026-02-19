import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { BusinessesService } from '../businesses/businesses.service';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let businessesService: BusinessesService;
  let mailService: MailService;
  let otpRepository: any;

  const mockUser = {
    id: 'user-id',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: UserRole.CUSTOMER,
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockBusinessesService = {
    create: jest.fn(),
  };

  const mockMailService = {
    sendOtp: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'jwt-token'),
  };

  const mockOtpRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: BusinessesService, useValue: mockBusinessesService },
        { provide: MailService, useValue: mockMailService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: getRepositoryToken(Otp), useValue: mockOtpRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    businessesService = module.get<BusinessesService>(BusinessesService);
    mailService = module.get<MailService>(MailService);
    otpRepository = module.get(getRepositoryToken(Otp));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user data if validation is successful', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual({ id: 'user-id', email: 'test@example.com', role: UserRole.CUSTOMER });
    });

    it('should return null if password does not match', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('sendOtp', () => {
    it('should throw ConflictException if user exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      await expect(service.sendOtp('test@example.com')).rejects.toThrow(ConflictException);
    });

    it('should generate OTP, save it, and send email', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockOtpRepository.create.mockReturnValue({ code: '1234' });
      mockOtpRepository.save.mockResolvedValue({ id: 'otp-id' });
      mockMailService.sendOtp.mockResolvedValue(true);

      const result = await service.sendOtp('new@example.com');
      
      expect(mockOtpRepository.create).toHaveBeenCalled();
      expect(mockOtpRepository.save).toHaveBeenCalled();
      expect(mockMailService.sendOtp).toHaveBeenCalledWith('new@example.com', expect.any(String));
      expect(result).toEqual({ message: 'OTP sent successfully' });
    });
  });

  describe('verifyOtp', () => {
    it('should verify valid OTP', async () => {
      const validOtp = {
        email: 'test@example.com',
        code: '1234',
        expiresAt: new Date(Date.now() + 10000), // Future
      };
      mockOtpRepository.findOne.mockResolvedValue(validOtp);
      mockOtpRepository.remove.mockResolvedValue(true);

      const result = await service.verifyOtp('test@example.com', '1234');
      
      expect(result).toEqual({ message: 'OTP verified successfully' });
      expect(mockOtpRepository.remove).toHaveBeenCalledWith(validOtp);
    });

    it('should throw BadRequestException if OTP expired', async () => {
      const expiredOtp = {
        email: 'test@example.com',
        code: '1234',
        expiresAt: new Date(Date.now() - 10000), // Past
      };
      mockOtpRepository.findOne.mockResolvedValue(expiredOtp);

      await expect(service.verifyOtp('test@example.com', '1234')).rejects.toThrow(BadRequestException);
    });
  });
});

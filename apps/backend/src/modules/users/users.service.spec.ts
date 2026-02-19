import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: any;

  const mockUser = {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: UserRole.STAFF,
    businessId: 'biz-1',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should find users by business', async () => {
    mockRepository.find.mockResolvedValue([mockUser]);
    const result = await service.findByBusiness('biz-1');
    expect(result).toHaveLength(1);
    expect(repository.find).toHaveBeenCalledWith({
      where: { businessId: 'biz-1' },
      order: { createdAt: 'DESC' },
    });
  });

  it('should update role if user belongs to business', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockUser);
    const result = await service.updateRole('user-1', 'biz-1', UserRole.MANAGER);
    expect(result.role).toBe(UserRole.MANAGER);
  });

  it('should throw NotFoundException if user not in business during update', async () => {
    mockRepository.findOneBy.mockResolvedValue({ ...mockUser, businessId: 'other-biz' });
    await expect(service.updateRole('user-1', 'biz-1', UserRole.MANAGER)).rejects.toThrow(NotFoundException);
  });

  it('should remove staff', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockUser);
    await service.remove('user-1', 'biz-1');
    expect(repository.remove).toHaveBeenCalled();
  });

  it('should throw BadRequestException when trying to remove OWNER', async () => {
    mockRepository.findOneBy.mockResolvedValue({ ...mockUser, role: UserRole.OWNER });
    await expect(service.remove('user-1', 'biz-1')).rejects.toThrow(BadRequestException);
  });
});

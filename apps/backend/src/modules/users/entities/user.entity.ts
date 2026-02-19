import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AbstractBaseEntity } from '../../../common/entities/base.entity';
import { Business } from '../../businesses/entities/business.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Visit } from '../../visitors/entities/visit.entity';

export enum UserRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  STAFF = 'staff',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity('users')
export class User extends AbstractBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ nullable: true })
  phone: string;

  // Relation to the business they belong to (Staff/Manager/Owner)
  @ManyToOne(() => Business, (business) => business.staff, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @Column({ nullable: true })
  businessId: string;

  // Relation to businesses they own
  @OneToMany(() => Business, (business) => business.owner)
  ownedBusinesses: Business[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Visit, (visit) => visit.customer)
  visits: Visit[];
}
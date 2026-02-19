import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractBaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { Visit } from '../../visitors/entities/visit.entity';

export enum BusinessType {
  RESTAURANT = 'RESTAURANT',
  RETAIL = 'RETAIL',
  GYM = 'GYM',
  EVENT = 'EVENT',
}

@Entity('businesses')
export class Business extends AbstractBaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: BusinessType,
    default: BusinessType.RETAIL,
  })
  type: BusinessType;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  monthlyVisitors: string;

  @Column({ nullable: true })
  goal: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: 'text', nullable: true })
  welcomeMessage: string;

  @Column({ type: 'text', nullable: true })
  successMessage: string;

  @Column({ type: 'text', nullable: true })
  privacyMessage: string;

  @Column({ type: 'text', nullable: true })
  rewardMessage: string;

  @Column({ default: false })
  rewardEnabled: boolean;

  @Column({ default: 5 })
  rewardVisitThreshold: number;

  // Relation to the owner
  @ManyToOne(() => User, (user) => user.ownedBusinesses)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: string;

  // Relation to staff members
  @OneToMany(() => User, (user) => user.business)
  staff: User[];

  @OneToMany(() => Device, (device) => device.business)
  devices: Device[];

  @OneToMany(() => Visit, (visit) => visit.business)
  visits: Visit[];
}
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TimestampEntity } from '../../Generic/timestamp.entity';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: 'user' })
  role: string;
}

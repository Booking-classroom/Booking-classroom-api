import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimestampEntity {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
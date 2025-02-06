import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";

@Entity('classroom')
export class ClassroomEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'int', nullable: false})
    capacity: number;

    @Column({type: 'boolean', nullable: false, default: true})
    isAvailable: boolean;


}

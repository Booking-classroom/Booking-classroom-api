import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../Generic/timestamp.entity";

@Entity('classroom')
export class ClassroomEntity extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password: string;

}

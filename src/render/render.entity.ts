import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Render{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    package_id: number;

    @Column()
    filename: string;
    
    @Column({type :'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}
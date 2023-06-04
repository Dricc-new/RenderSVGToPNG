import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pack } from "./pack.entity";

@Entity()
export class Render{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    packId: number;

    @ManyToOne(() => Pack, pack => pack.id)
    pack: Pack;

    @Column()
    filename: string;
    
    @Column({type :'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}
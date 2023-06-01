import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Package{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    cant: number;
    
    @Column()
    email: string;
}
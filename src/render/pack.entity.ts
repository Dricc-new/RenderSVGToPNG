import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Render } from "./render.entity";

@Entity()
export class Pack{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    cant: number;
    
    @Column()
    email: string;

    @OneToMany(() => Render, render => render.pack)
    renders: Render[];
}
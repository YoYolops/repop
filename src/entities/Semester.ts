import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('semesters')
export default class Semester {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        semester: string;
}

import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import DisciplineEntity from './DisciplineEntity';
import Semester from './interfaces/Semester';

@Entity('semesters')
export default class SemesterEntity implements Semester {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        semester: string;

    @OneToMany(() => DisciplineEntity, (discipline: DisciplineEntity) => discipline.semester)
        disciplines: DisciplineEntity[];
}

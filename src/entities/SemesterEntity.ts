import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import DisciplineEntity from './DisciplineEntity';

@Entity('semesters')
export default class SemesterEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        semester: string;

    @OneToMany(() => DisciplineEntity, (discipline: DisciplineEntity) => discipline.semester)
        disciplines: DisciplineEntity[];
}

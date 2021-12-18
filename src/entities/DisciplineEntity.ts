import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import ExamEntity from './ExamEntity';
import Discipline from './interfaces/Discipline';
import SemesterEntity from './SemesterEntity';
import TeacherEntity from './TeacherEntity';

@Entity('disciplines')
export default class DisciplineEntity implements Discipline {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column({ name: 'semester_id' })
        semesterId: number;

    @ManyToOne(() => SemesterEntity, (semester: SemesterEntity) => semester.disciplines)
    @JoinColumn({ name: 'semester_id' })
        semester: SemesterEntity;

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.discipline)
        exams: ExamEntity[];

    @ManyToMany(() => TeacherEntity, (teacher: TeacherEntity) => teacher.id, { eager: true })
    @JoinTable({
        name: 'teachers_group',
        joinColumn: {
            name: 'discipline_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id',
        },
    })
        teacher: TeacherEntity[];
}

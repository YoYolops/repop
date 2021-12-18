import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import ExamEntity from './ExamEntity';
import Teacher from './interfaces/Teacher';

@Entity('teachers')
export default class TeacherEntity implements Teacher {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.teacher, { eager: true })
        exams: ExamEntity[];
}

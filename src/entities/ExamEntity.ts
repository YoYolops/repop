import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Exam } from '../controllers/interfaces/Request';
import CategoryEntity from './CategorieEntity';
import DisciplineEntity from './DisciplineEntity';
import TeacherEntity from './TeacherEntity';

@Entity('exams')
export default class ExamEntity implements Exam {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column({ name: 'exam_link' })
        examLink: string;

    @Column({ name: 'discipline_id' })
        disciplineId: number;

    @Column({ name: 'teacher_id' })
        teacherId: number;

    @Column({ name: 'category_id' })
        categoryId: number;

    @ManyToOne(
        () => DisciplineEntity,
        (discipline: DisciplineEntity) => discipline.exams,
    )
    @JoinColumn({ name: 'discipline_id' })
        discipline: DisciplineEntity;

    @ManyToOne(() => TeacherEntity, (teacher: TeacherEntity) => teacher.exams)
    @JoinColumn({ name: 'teacher_id' })
        teacher: TeacherEntity;

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.exams, { eager: true })
    @JoinColumn({ name: 'category_id' })
        category: CategoryEntity;
}

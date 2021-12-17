import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exams')
export default class Exam {
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
}

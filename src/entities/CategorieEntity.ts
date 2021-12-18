import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import ExamEntity from './ExamEntity';

@Entity('categories')
export default class CategoryEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.category)
        exams: ExamEntity[];
}

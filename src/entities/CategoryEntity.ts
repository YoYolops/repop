import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import ExamEntity from './ExamEntity';
import Category from './interfaces/Category';

@Entity('categories')
export default class CategoryEntity implements Category {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.category)
        exams: ExamEntity[];
}

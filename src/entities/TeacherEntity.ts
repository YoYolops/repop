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

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.teacher)
        exams: ExamEntity[];

    getClearedData() {
        return {
            id: this.id,
            name: this.name,
            exams: this.exams?.map((exam) => ({
                id: exam.id,
                name: exam.name,
                examLink: exam.examLink,
                categoryName: exam.category.name,
            })),
        };
    }
}

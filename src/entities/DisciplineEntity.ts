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

    @ManyToOne(
        () => SemesterEntity,
        (semester: SemesterEntity) => semester.disciplines,
        { eager: true },
    )
    @JoinColumn({ name: 'semester_id' })
        semester: SemesterEntity;

    @OneToMany(() => ExamEntity, (exam: ExamEntity) => exam.discipline, { eager: true })
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

    // Clear the repeated data:
    getClearedData() {
        return {
            id: this.id,
            name: this.name,
            semesterId: this.semester.id,
            semester: this.semester.semester,
            teachers: [...this.teacher],
            exams: this.exams.map((exam) => ({
                id: exam.id,
                name: exam.name,
                examLink: exam.examLink,
                categoryId: exam.category.id,
                categoryName: exam.category.name,
                teacher: this.teacher.find((teacher) => teacher.id === exam.teacherId).name,
            })),
        };
    }
}

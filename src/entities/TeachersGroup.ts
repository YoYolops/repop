import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teachers_group')
export default class TeachersGroup {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name: 'discipline_id' })
        disciplineId: number;

    @Column({ name: 'teacher_id' })
        teacherId: string;
}

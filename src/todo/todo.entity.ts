import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  scheduledAt: Date;

  @Column({ nullable: true })
  duration: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    // const now = new Date();
    // const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    // this.createdAt = koreaTime;
    // this.updatedAt = koreaTime;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    // const now = new Date();
    // const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    // this.updatedAt = koreaTime;
    // console.log("업데이트 시간 설정:", now, koreaTime);
  }
} 
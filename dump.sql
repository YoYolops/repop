CREATE TABLE "exams" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"exam_link" TEXT NOT NULL,
	"discipline_id" int NOT NULL,
	"teacher_id" int NOT NULL,
	"category_id" int NOT NULL,
	CONSTRAINT "exams_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teachers" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "teachers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "disciplines" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"semester_id" int NOT NULL,
	CONSTRAINT "disciplines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teachers_group" (
	"id" serial NOT NULL,
	"discipline_id" int NOT NULL,
	"teacher_id" int NOT NULL,
	CONSTRAINT "teachers_group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "semesters" (
	"id" serial NOT NULL,
	"semester" TEXT NOT NULL,
	CONSTRAINT "semesters_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "exams" ADD CONSTRAINT "exams_fk0" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk1" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk2" FOREIGN KEY ("category_id") REFERENCES "categories"("id");


ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_fk0" FOREIGN KEY ("semester_id") REFERENCES "semesters"("id");

ALTER TABLE "teachers_group" ADD CONSTRAINT "teachers_group_fk0" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id");
ALTER TABLE "teachers_group" ADD CONSTRAINT "teachers_group_fk1" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");

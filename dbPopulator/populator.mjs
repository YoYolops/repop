import connection from "./connection.mjs";
import * as factory from './factories.mjs' ;

// to run, type in your terminal: node ./dbPopulator/populator.mjs

void async function populateDatabase() {
    console.log("Starting...")
    const pdfLink = 'https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf';
    const examNames = [
        '2021.1','2021.2','2020.1','2020.2','2019.1','2019.2',
        '2018.1', '2018.2',
    ]
    const disciplinesNames = [
        "Cálculo I","Cálculo II", "Cálculo III", "Cálculo IV",
        "Física I", "Física II","Física III", "Física IV", "Física Avançada",
        "Sociologia","Ergonomia","Fotografia","Metodologia Científica","Física Experimental",
        "Química Orgânica","Teoria dos Jogos","Empreendedorismo", "Comunicação Social",
        "História do Brasil I", "História do Brasil II", "História do Brasil III",
        "Economia Moderna","Física Experimental I", "Física Experimental II", "Física Experimental III",
    ]

    console.log("Populating Teachers")
    const createdTeachersPromises = [];

    for(let i = 0; i < 10; i++) {
        const fakeTeacher = factory.createTeacher();
        createdTeachersPromises.push(connection.query(`
            INSERT INTO teachers (name) VALUES ($1) RETURNING *;
        `, [fakeTeacher.name]))
    }
    const createdTeachers = await Promise.all(createdTeachersPromises);
    console.log("........Done!")

    console.log("Populating categories")
    const categorieNames = ['P1', 'P2', 'P3', '2ch', 'Outras']
    const categoriesCreatedPromises = categorieNames.map(category => connection.query(`
        INSERT INTO categories (name) VALUES ($1) RETURNING *;
    `, [category]))
    const createdCategories = await Promise.all(categoriesCreatedPromises);
    console.log("........Done!")

    console.log("Populating semesters")
    const createdSemestersPromise = []
    for(let i = 1; i < 14; i++) {
        createdSemestersPromise.push(
            connection.query(`INSERT INTO semesters (semester) VALUES (${i === 14 ? 'Eletiva' : i}) RETURNING *;`)
        )
    }
    const createdSemesters = await Promise.all(createdSemestersPromise);
    console.log("........Done!")

    console.log("Populating disciplines")
    const createdDisciplinesPromises = disciplinesNames.map((name, index) => connection.query(`
       INSERT INTO disciplines (name, semester_id) VALUES ($1, $2) RETURNING *;
    `, [ name, createdSemesters[index % createdSemesters.length].rows[0].id ]))
    const createdDisciplines = await Promise.all(createdDisciplinesPromises);
    console.log("........Done!")

    console.log("Populating exams")
    const createdExamsPromises = []
    for(let i = 0; i < 20; i++) {
        createdExamsPromises.push(connection.query(`
            INSERT INTO exams (name, exam_link, discipline_id, teacher_id, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [
            examNames[i % examNames.length],
            pdfLink,
            createdDisciplines[i % createdDisciplines.length].rows[0].id,
            createdTeachers[i % createdTeachers.length].rows[0].id,
            createdCategories[i % createdCategories.length].rows[0].id
        ]))
    }
    await Promise.all(createdExamsPromises);
    console.log("........Done!")

    console.log("Populating teachers groups")
    const createdTeacherGroupsPromise = [];
    for(let i = 0; i < createdDisciplines.length; i++) {
        createdTeacherGroupsPromise.push(connection.query(`
            INSERT INTO teachers_group (discipline_id, teacher_id) VALUES ($1, $2)
            RETURNING *;
        `, [ createdDisciplines[i % createdDisciplines.length].rows[0].id, createdTeachers[i % createdTeachers.length].rows[0].id ]))
    }
    await Promise.all(createdTeacherGroupsPromise);
    console.log("........Done!")
    console.log("Wait while db connection is closed...");
}()
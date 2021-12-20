
<p align="center" >
    <img src="./assets/ico.png" width="200" height="200"/>
</p>

![total lines](https://img.shields.io/tokei/lines/github/YoYolops/repop) ![last commit](https://img.shields.io/github/last-commit/YoYolops/repop?style=flat-square) ![issues](https://img.shields.io/github/package-json/v/YoYolops/repop?style=flat-square)

# repop

O repop é uma aplicação backend desenvolvida para gerenciar os dados de um repositório público onde estudantes podem compartilhar provas uns com os outros.
Essa aplicação foi feita para servir o web app repof, <a href="https://github.com/YoYolops/repof" target="_blank">você pode achá-lo clicando aqui</a>.

### Tecnologias usadas:
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-2D79C7?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

### Cobertura de testes
<p align="center" >
    <img src="./assets/coverage.png" width="100%"/>
</p>

### DB design
<p align="center" >
    <img src="./assets/dbdesign.png" width="100%"/>
</p>

## Rotas:

- **POST `/exams`**
    
    Adiciona uma nova prova, não é necessário nenhum tipo de autenticação para enviar provas, o formato do body deve ser: .
    
    ```json
    {
      "name": "2020.1",
      "examLink": "https://linkpropdf.pdf",
      "disciplineId": 3,
      "teacherId": 6,
      "categoryId": 2,
    }
    ```
    
    O retorno é um id da prova cadastrada
    
    ```json
    {
      "id": 6
    }
    ```
    
- **GET `/exams/teacher`**
    
    Retorna um array com todas as provas cadastradas, organizadas por professor, seguindo o padrão:

    
    ```json
      {
          "id": 10,
          "name": "Crystal Sporer",
          "exams": [
            {
              "id": 1,
              "name": "2021.1",
              "examLink": "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf",
              "categoryName": "P1"
            },
            {
              "id": 11,
              "name": "2020.1",
              "examLink": "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf",
              "categoryName": "P1"
            }
          ]
        }
    ```
    
- **GET `/exams/discipline`**
    
    Retorna um array com todas as provas cadastradas, organizadas por disciplina, seguindo o padrão:

    
    ```json
        {
            "id": 1,
            "name": "Cálculo I",
            "semesterId": 1,
            "semester": "1",
            "teachers": [
              {
                "id": 10,
                "name": "Crystal Sporer"
              }
            ],
            "exams": [
              {
                "id": 1,
                "name": "2021.1",
                "examLink": "https://download.inep.gov.br/enem/provas_e_gabaritos/2021_PV_impresso_D1_CD1.pdf",
                "categoryId": 1,
                "categoryName": "P1",
                "teacher": "Crystal Sporer"
              }
            ]
          },
    ```
  
    
    

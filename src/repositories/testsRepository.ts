import client from "../database.js"

async function getTests(){
    const tests = await client.terms.findMany({
            include: {
                disciplines: {
                    include: {
                        teachersDisciplines: {
                            include: {
                                teachers: true,
                                tests: {
                                    include: {
                                        categories: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    )
    return tests;
}

async function getTestsBy(by){
    const testsByTeacher = await client.teachers.findMany({
        include: {
            teachersDisciplines: {
                include: {
                    tests: true
                }
            }
        }
    })

    return testsByTeacher;
}

export default {
    getTests,
    getTestsBy
}
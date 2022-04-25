import testsRepository from "../repositories/testsRepository.js"

async function tests(){
    const tests = await testsRepository.getTests()
    return tests;
}

async function testsBy(by) {
    if(by === "teacher"){
        const testsByTeacher = await testsRepository.getTestsBy(by);
        return testsByTeacher;
    }

    throw{
        type: "Unprocessable_Entity",
        message: "Invalid data"
    }
}

export default{
    tests,
    testsBy
}
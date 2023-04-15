import fs from 'fs'


// export const chooseRandom = (array = [], numItems) => {
//   // TODO implement chooseRandom

//   if (array.length == 0 || array.length == 1) {
//     return array;
//   }

//   if (numItems > array.length || numItems < 1) {
//     let max = array.length;
//     let randomNumbers = [];
//     for (let i = 1; i < max; i++) {
//       randomNumbers.push(i);
//     }
//     numItems = randomNumbers[Math.floor(randomNumbers.length * Math.random())]

//   }

//   let newArr = [];
//   let arrayCopy = [...array];
//   let randomValue;
//   for (let i = 0; i < numItems; i++) {
//     randomValue = arrayCopy[Math.floor(arrayCopy.length * Math.random())];
//     let index = arrayCopy.indexOf(randomValue);
//     newArr.push(randomValue);
//     arrayCopy.splice(index, 1);
//   }

//   return newArr;
// }

export const chooseRandom = (array, numItems) => {
  if (array.length <= 1) {
    return array
  }
  if (numItems > array.length || numItems === undefined) {
    numItems = Math.floor(Math.random() * (array.length + 1))
  }
  return [...array].sort(() => 0.5 - Math.random()).slice(0, numItems)
}

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  // TODO implement createPrompt

  let newArr = [];

  for (let i = 0; i < numQuestions; i++) {

    const questions = { // Questions are repeated numQuestion number of times
      type: 'input',
      name: `question-${i + 1}`,
      message: `Enter question ${i + 1}`
    };
    newArr.push(questions);
    for (let j = 0; j < numChoices; j++) {
      const choices = {
        type: 'input',
        name: `question-${i + 1}-choice-${j + 1}`,
        message: `Enter answer choice ${j + 1} for question ${i + 1}`
      }
      newArr.push(choices);
    }

  }
  return newArr;
}


export const createQuestions = (obj = {}) => {
  let newArr = [];
  let props = Object.entries(obj).map((entry) => {
    return {
      name: entry[0],
      message: entry[1]
    }
  })
  let choices = props.filter((prop) => prop.name.includes("choice"));
  let questions = props.filter((prop) => !prop.name.includes("choice"));

  for (let i = 0; i < questions.length; i++) {
    const choicesByQuestion = choices.filter((choice) => choice.name.includes(questions[i].name));
    const messagesByChoice = choicesByQuestion.map((choice) => choice.message);
    const answer = { // Repeated for the total number of questions
      type: 'list',
      name: `${questions[i].name}`,
      message: `${questions[i].message}`,
      choices: messagesByChoice
    }
    newArr.push(answer)
  }

  return newArr;
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
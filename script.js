let cards = [
    {
        question: "Was ist der Zweck von HTML?",
        answer_1: "A) Zur Gestaltung des Layouts einer Website",
        answer_2: "B) Zur Definition des Aussehens und der Formatierung von Webseiten",
        answer_3: "C) Zur Programmierung der Logik einer Webseite",
        answer_4: "D) Zur Strukturierung von Inhalten auf einer Webseite",
        right_answer: 4,
        questionCount: "1",
    },
    {
        question: "Welche der folgenden Aussagen über CSS ist richtig?",
        answer_1: "A) CSS steht für Computer Style Sheets",
        answer_2: "B) CSS wird verwendet, um interaktive Funktionen auf einer Website zu erstellen",
        answer_3: "C) CSS wird verwendet, um das Aussehen und das Layout einer Website zu gestalten",
        answer_4: "D) CSS wird nur für die Programmierung von Backend-Logik verwendet",
        right_answer: 3,
        questionCount: "2",
    },
    {
        question: "Welches der folgenden HTML-Tags wird verwendet, um eine Liste mit nummerierten Punkten zu erstellen?",
        answer_1: "A) ul",
        answer_2: "B) li",
        answer_3: "C) ol",
        answer_4: "D) dl",
        right_answer: 3,
        questionCount: "3",
    },
    {
        question: "Welches der folgenden ist kein gültiges HTML-Tag?",
        answer_1: "A) section",
        answer_2: "B) div",
        answer_3: "C) header",
        answer_4: "D) mainContent",
        right_answer: 4,
        questionCount: "4",
    },
    {
        question: "Welche der folgenden Aussagen über JavaScript ist wahr?",
        answer_1: "A) JavaScript wird ausschließlich auf Servern ausgeführt",
        answer_2: "B) JavaScript wird verwendet, um das Aussehen einer Webseite zu gestalten",
        answer_3: "C) JavaScript ist eine serverseitige Programmiersprache",
        answer_4: "D) JavaScript wird verwendet, um Interaktivität auf Webseiten hinzuzufügen",
        right_answer: 4,
        questionCount: "5",
    }
];


let i = 0;


function init() {
    let question = document.getElementById('question');
    let option_1 = document.getElementById('option_1');
    let option_2 = document.getElementById('option_2');
    let option_3 = document.getElementById('option_3');
    let option_4 = document.getElementById('option_4');
    let currentQuestionCount = document.getElementById('currentQuestionCount');
    let maxQuestionCount = document.getElementById('maxQuestionCount');
    let card = cards[i];

    question.innerHTML = `${card['question']}`;
    option_1.innerHTML = `${card['answer_1']}`;
    option_2.innerHTML = `${card['answer_2']}`;
    option_3.innerHTML = `${card['answer_3']}`;
    option_4.innerHTML = `${card['answer_4']}`;
    currentQuestionCount.innerHTML = `${card['questionCount']}`;
    maxQuestionCount.innerHTML = `${cards.length}`;

    if ( currentQuestionCount.innerHTML === `${cards.length}`) {
    renderFinishButton();
    }
}


function nextQuestion() {
    i++;
    init();
    document.getElementById(`option_1`).parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById(`option_2`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById(`option_3`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById(`option_4`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById("nextButton").disabled = true;
}


function renderFinishButton() {
    let buttonContainer = document.getElementById('buttonContainer');

    buttonContainer.innerHTML = /*html*/`
    <button id="nextButton" onclick="finish()" type="button" class="btn btn-primary" disabled>Abschliessen</button>
    `;
}


function finish() {
    alert('Du hast das Quiz abgeschlossen.');
}


function answer(selection) {   

    if (selection === cards[i]['right_answer']) {
        console.log('right');
        document.getElementById(`option_${selection}`).parentNode.classList.add('bg-success');
    } else {
        console.log('wrong');
        document.getElementById(`option_${selection}`).parentNode.classList.add('bg-danger');
        document.getElementById(`option_${cards[i]['right_answer']}`).parentNode.classList.add('bg-success');
    }

    document.getElementById("nextButton").disabled = false;
}
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


let rightAnswerCount = 0;
let i = 0;


load();


let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');


function save() {
    let iAsText = JSON.stringify(i);
    let rightAnswerCountAsText = JSON.stringify(rightAnswerCount);

    localStorage.setItem('index', iAsText);
    localStorage.setItem('Right Answer Count', rightAnswerCountAsText);
}


function load(){
    let iAsText = localStorage.getItem('index');
    let rightAnswerCountAsText = localStorage.getItem('Right Answer Count');

    if(iAsText || rightAnswerCountAsText){
    i = JSON.parse(iAsText);
    rightAnswerCount = JSON.parse(rightAnswerCountAsText);
    }
}


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

    progress();
}


function progress() {
    let percent = i / cards.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('progressBar').innerHTML = `${percent}%`;
}


function nextQuestion() {
    i++;
    init();
    document.getElementById(`option_1`).parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById(`option_2`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById(`option_3`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById(`option_4`).parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById("nextButton").disabled = true;
    save();
}


function renderFinishButton() {
    let buttonContainer = document.getElementById('buttonContainer');

    buttonContainer.innerHTML = /*html*/`
        <div id="buttonContainer">
            <button id="nextButton" onclick="finish()" type="button" class="btn btn-primary" disabled>Abschliessen</button>
        </div>    
    `;
}


function finish() {
    i++;
    document.getElementById('img').src = /*html*/`img/children-success.jpg`
    document.getElementById('cardBody').innerHTML = /*html*/`
        <h5>Quiz beendet!</h5>
        <p class="card-text">Du hast das Quiz abgeschlossen! Herzlichen Glueckwunsch!</p>
        <p>Du hast von ${cards.length} Fragen <b>${rightAnswerCount} richtig</b> beantwortet.</p>
        <button onclick="resetGame()" type="button" class="btn btn-primary">Erneut spielen</button>
        `;
    document.getElementById('buttonContainer').style.display = 'none';
    document.getElementById('questionCounterContainer').style.display = 'none';
    progress();
    save();
}


function resetGame() {
    i = 0;
    rightAnswerCount = 0;
    save();
    document.getElementById('quizScreen').innerHTML = /*html*/`
    <div id="quizCard" class="card width-30-rem">

        <img id="img" src="img/doors.jpg" class="card-img-top" alt="doors">

        <div id="cardBody" class="card-body padding-16-16-8-16">
            <h5 id="question" class="card-title">Frage</h5>

            <div onclick="answer(1)" class="card quiz-answer-card mb-2">
                <div id="option_1" class="card-body">
                Antwort
                </div>
            </div>

            <div onclick="answer(2)" class="card quiz-answer-card mb-2">
                <div id="option_2" class="card-body">
                Antwort
                </div>
            </div>

            <div type="button" onclick="answer(3)" class="card quiz-answer-card mb-2">
                <div id="option_3" class="card-body">
                Antwort
                </div>
            </div>

            <div type="button" onclick="answer(4)" class="card quiz-answer-card mb-2">
                <div id="option_4" class="card-body">
                Antwort
                </div>
            </div>
        </div>

        <div class="footer" id="footer">
            <div class="countAndButton">
                <span id="questionCounterContainer" class="questionCounterContainer">
                <b id="currentQuestionCount">1</b> von <b id="maxQuestionCount">5</b>
                </span>

                <div id="buttonContainer">
                <button id="nextButton" onclick="nextQuestion()" type="button" class="btn btn-primary" disabled>Naechste Frage</button>
                </div>
            </div>

            <div class="progress">
                <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        </div>
    </div>
    `;
    init();
}


function answer(selection) {   
    
    if (answeredRight(selection)) {
        success(selection);
    } else {
        fail(selection);
    }
    document.getElementById("nextButton").disabled = false;
    save();
}


function answeredRight(selection) {
    return selection === cards[i]['right_answer'];
}


function success(selection) {
    document.getElementById(`option_${selection}`).parentNode.classList.add('bg-success');
    AUDIO_SUCCESS.play();
    rightAnswerCount++;
}


function fail(selection) {
    document.getElementById(`option_${selection}`).parentNode.classList.add('bg-danger');
    document.getElementById(`option_${cards[i]['right_answer']}`).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}
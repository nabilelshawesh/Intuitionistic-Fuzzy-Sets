class TestManager {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = new Array(54).fill(null);
        this.initializeElements();
        this.bindEvents();
        this.loadSavedProgress();
        this.showCurrentQuestion();
    }

    initializeElements() {
        this.questionContainer = document.getElementById('question-container');
        this.prevButton = document.getElementById('prev-btn');
        this.nextButton = document.getElementById('next-btn');
        this.terminateButton = document.getElementById('terminate-btn');
        this.saveButton = document.getElementById('save-btn');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.questionTemplate = document.getElementById('question-template');
        this.modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.confirmActionBtn = document.getElementById('confirmAction');
    }

    bindEvents() {
        this.prevButton.addEventListener('click', () => this.showPreviousQuestion());
        this.nextButton.addEventListener('click', () => this.showNextQuestion());
        this.terminateButton.addEventListener('click', () => this.confirmTerminate());
        this.saveButton.addEventListener('click', () => this.confirmSave());
    }

    loadSavedProgress() {
        const savedData = localStorage.getItem('testProgress');
        if (savedData) {
            const progress = JSON.parse(savedData);
            this.currentQuestionIndex = progress.currentQuestionIndex || 0;
            this.answers = progress.answers || new Array(54).fill(null);
        }
    }

    saveProgress() {
        const progressData = {
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('testProgress', JSON.stringify(progressData));
    }

    showCurrentQuestion() {
        this.questionContainer.innerHTML = '';

        const questionElement = this.questionTemplate.content.cloneNode(true);
        
        questionElement.querySelector('.question-text').textContent = 
            `${this.currentQuestionIndex + 1}. ${questions[this.currentQuestionIndex]}`;

        const radioInputs = questionElement.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.name = `question${this.currentQuestionIndex}`;
            input.checked = this.answers[this.currentQuestionIndex] === parseInt(input.value);
        });

        questionElement.querySelectorAll('.form-check').forEach(check => {
            check.addEventListener('click', (e) => {
                const radio = check.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    this.answers[this.currentQuestionIndex] = parseInt(radio.value);
                    this.updateNavigation();
                }
            });
        });

        this.questionContainer.appendChild(questionElement);
        this.updateNavigation();
    }

    updateNavigation() {
        const progress = ((this.currentQuestionIndex + 1) / questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;

        this.prevButton.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === questions.length - 1) {
            this.nextButton.textContent = 'Complete';
            this.nextButton.classList.remove('btn-primary');
            this.nextButton.classList.add('btn-success');
        } else {
            this.nextButton.textContent = 'Next';
            this.nextButton.classList.remove('btn-success');
            this.nextButton.classList.add('btn-primary');
        }

        this.nextButton.disabled = this.answers[this.currentQuestionIndex] === null;
    }

    showPreviousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showCurrentQuestion();
        }
    }

    showNextQuestion() {
        if (this.currentQuestionIndex < questions.length - 1) {
            this.currentQuestionIndex++;
            this.showCurrentQuestion();
        } else if (this.answers[this.currentQuestionIndex] !== null) {
            this.submitTest();
        }
    }

    confirmTerminate() {
        this.modalTitle.textContent = 'Terminate Test';
        this.modalBody.textContent = 'Are you sure you want to terminate the test? All answers will be lost.';
        this.confirmActionBtn.textContent = 'Terminate';
        this.confirmActionBtn.className = 'btn btn-danger';
        
        this.confirmActionBtn.onclick = () => {
            this.terminateTest();
            this.modal.hide();
        };
        
        this.modal.show();
    }

    confirmSave() {
        this.modalTitle.textContent = 'Save Progress';
        this.modalBody.textContent = 'Do you want to save your progress and continue later?';
        this.confirmActionBtn.textContent = 'Save';
        this.confirmActionBtn.className = 'btn btn-warning';
        
        this.confirmActionBtn.onclick = () => {
            this.saveAndExit();
            this.modal.hide();
        };
        
        this.modal.show();
    }

    terminateTest() {
        localStorage.removeItem('testProgress');
        localStorage.removeItem('testAnswers');
        window.location.href = '../index.html';
    }

    saveAndExit() {
        this.saveProgress();
        window.location.href = '../index.html';
    }

    submitTest() {
        localStorage.setItem('testAnswers', JSON.stringify(this.answers));
        localStorage.removeItem('testProgress');
        window.location.href = 'results.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TestManager();
});

const questions = [
    "I would not mind routine unchallenging work if the pay and pension prospects were good.",
    "I like to test boundaries and get into areas where few have worked before.",
    "I tend not to like to stand out or be unconventional.",
    "Capable people who fail to become successful have not usually taken chances when they have occurred.",
    "I rarely day dream.",
    "I find it difficult to switch off from work completely.",
    "You are either naturally good at something or you are not, effort makes no difference.",
    "Sometimes people find my ideas unusual.",
    "I would rather buy a lottery ticket than enter a competition.",
    "I like challenges that stretch my abilities and get bored with things I can do quite easily.",
    "I would prefer to have a moderate income in a secure job rather than a high income in a job that depended on my performance.",
    "At work, I often take over projects and steer them my way without worrying about what other people think.",
    "Many of the bad times that people experience are due to bad luck.",
    "Sometimes I think about information almost obsessively until I come up with new ideas and solutions.",
    "If I am having problems with a task I leave it, forget it and move on to something else.",
    "When I make plans I nearly always achieve them.",
    "I do not like unexpected changes to my weekly routines.",
    "If I wanted to achieve something and the chances of success were 50/50 I would take the risk.",
    "I think more of the present and past than of the future.",
    "If I had a good idea for making some money, I would be willing to invest my time and borrow money to enable me to do it.",
    "I like a lot of guidance to be really clear about what to do in work.",
    "People generally get what they deserve.",
    "I am wary of new ideas, gadgets and technologies.",
    "It is more important to do a job well than to try to please people.",
    "I try to accept that things happen to me in life for a reason.",
    "Other people think that I'm always making changes and trying out new ideas.",
    "If there is a chance of failure I would rather not do it.",
    "I get annoyed if people are not on time for meetings.",
    "Before I make a decision I like to have all the facts no matter how long it takes.",
    "I rarely need or want any assistance and like to put my own stamp on work that I do.",
    "You are not likely to be successful unless you are in the right place at the right time.",
    "I prefer to be quite good at several things rather than very good at one thing.",
    "I would rather work with a person I liked who was not good at the job, rather than work with someone I did not like even if they were good at the job.",
    "Being successful is a result of working hard, luck has little to do with it.",
    "I prefer doing things in the usual way rather than trying out new methods.",
    "Before making an important decision I prefer to weigh up the pro's and con's fairly quickly rather than spending a long time thinking about it.",
    "I would rather work on a task as part of a team rather than take responsibility for it myself.",
    "I would rather take an opportunity that might lead to even better things than have an experience that I am sure to enjoy.",
    "I usually do what is expected of me and follow instructions carefully.",
    "For me, getting what I want is a just reward for my efforts.",
    "I like to have my life organised so that it runs smoothly and to plan.",
    "When I am faced with a challenge I think more about the results of succeeding than the effects of failing.",
    "I believe that destiny determines what happens to me in life.",
    "I like to spend time with people who have different ways of thinking.",
    "I find it difficult to ask for favours from other people.",
    "I get up early, stay late or skip meals if I have a deadline for some work that needs to be done.",
    "What we are used to is usually better than what is unfamiliar.",
    "I get annoyed if superiors or colleagues take credit for my work.",
    "People's failures are rarely the result of their poor judgement.",
    "Sometimes I have so many ideas that I feel pressurised.",
    "I find it easy to relax on holiday and forget about work.",
    "I get what I want from life because I work hard to make it happen.",
    "It is harder for me to adapt to change than keep to a routine.",
    "I like to start interesting projects even if there is no guaranteed payback for the money or time I have to put in."
];
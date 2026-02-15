const questionCategories = {
    achievement: [4, 7, 13, 22, 25, 31, 34, 40, 43, 52],
    autonomy: [3, 12, 24, 30, 33, 37, 39, 44, 45, 48],
    creativity: [2, 8, 14, 23, 26, 32, 35, 44, 47, 50],
    risk: [9, 11, 18, 20, 27, 29, 36, 38, 42, 54],
    control: [1, 6, 15, 16, 17, 21, 28, 41, 51, 53]
};

class ResultsManager {
    constructor() {
        this.answers = JSON.parse(localStorage.getItem('testAnswers'));
        if (!this.answers) {
            window.location.href = '../index.html';
            return;
        }
        this.calculateScores();
        this.displayResults();
    }

    calculateScores() {
        this.scores = {
            achievement: this.calculateCategoryScore('achievement'),
            autonomy: this.calculateCategoryScore('autonomy'),
            creativity: this.calculateCategoryScore('creativity'),
            risk: this.calculateCategoryScore('risk'),
            control: this.calculateCategoryScore('control')
        };

        this.totalScore = Object.values(this.scores).reduce((a, b) => a + b, 0);
    }

    calculateCategoryScore(category) {
        return questionCategories[category].reduce((total, questionIndex) => {
            return total + (this.answers[questionIndex - 1] || 0);
        }, 0);
    }

    displayResults() {
        document.getElementById('total-score').textContent = this.totalScore;
        document.querySelector('.overall-progress .progress-bar').style.width = 
            `${(this.totalScore / 270) * 100}%`;

        this.updateCategoryScore('achievement', 'success');
        this.updateCategoryScore('autonomy', 'info');
        this.updateCategoryScore('creativity', 'warning');
        this.updateCategoryScore('risk', 'danger');
        this.updateCategoryScore('control', 'primary');
    }

    updateCategoryScore(category, colorClass) {
        const score = this.scores[category];
        document.getElementById(`${category}-score`).textContent = score;
        document.getElementById(`${category}-progress`).style.width = 
            `${(score / 50) * 100}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResultsManager();
});
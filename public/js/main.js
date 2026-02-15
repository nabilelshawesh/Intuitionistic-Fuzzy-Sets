document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startTest');
    
    checkSavedProgress();
    
    startButton.addEventListener('click', () => {
        window.location.href = 'pages/test.html';
    });
    
    function checkSavedProgress() {
        const savedProgress = localStorage.getItem('testProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            showContinueModal(progress);
        }
    }
    
    function showContinueModal(progress) {
        const modalHtml = `
            <div class="modal fade" id="continueModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Saved Progress</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Saved progress from previous session found.</p>
                            <p><strong>Question:</strong> ${progress.currentQuestionIndex + 1}/54</p>
                            <p><strong>Date:</strong> ${new Date(progress.timestamp).toLocaleString('en-US')}</p>
                            <p>Do you want to continue where you left off or start over?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onclick="startFresh()">New Test</button>
                            <button type="button" class="btn btn-primary" onclick="continueTest()">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('continueModal'));
        modal.show();
        
        window.startFresh = () => {
            localStorage.removeItem('testProgress');
            modal.hide();
            document.getElementById('continueModal').remove();
        };
        
        window.continueTest = () => {
            modal.hide();
            window.location.href = 'pages/test.html';
        };
    }
});
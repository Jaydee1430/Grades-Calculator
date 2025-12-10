// Global variables
let subjects = [];

// Navigation function
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// GWA Calculator Functions
function addSubject() {
    const name = document.getElementById('subjectName').value.trim();
    const units = parseFloat(document.getElementById('units').value);
    const grade = parseFloat(document.getElementById('grade').value);

    if (!name || !units || !grade) {
        alert('Please fill in all fields');
        return;
    }

    if (grade < 1 || grade > 5) {
        alert('Grade must be between 1.0 and 5.0');
        return;
    }

    subjects.push({ name, units, grade });
    updateSubjectsList();
    clearInputs();
}

function updateSubjectsList() {
    const list = document.getElementById('subjectsList');
    list.innerHTML = subjects.map((subject, index) => `
        <div class="subject-item">
            <div class="subject-info">
                <div class="subject-name">${subject.name}</div>
                <div class="subject-details">Units: ${subject.units} | Grade: ${subject.grade}</div>
            </div>
            <button class="remove-btn" onclick="removeSubject(${index})">Remove</button>
        </div>
    `).join('');
}

function removeSubject(index) {
    subjects.splice(index, 1);
    updateSubjectsList();
    if (subjects.length === 0) {
        document.getElementById('gwaResult').classList.remove('show');
    }
}

function clearInputs() {
    document.getElementById('subjectName').value = '';
    document.getElementById('units').value = '';
    document.getElementById('grade').value = '';
}

function calculateGWA() {
    if (subjects.length === 0) {
        alert('Please add at least one subject');
        return;
    }

    let totalWeightedGrades = 0;
    let totalUnits = 0;

    subjects.forEach(subject => {
        totalWeightedGrades += subject.grade * subject.units;
        totalUnits += subject.units;
    });

    const gwa = totalWeightedGrades / totalUnits;
    document.getElementById('gwaValue').textContent = gwa.toFixed(2);
    document.getElementById('gwaResult').classList.add('show');
}

function clearGWA() {
    subjects = [];
    updateSubjectsList();
    clearInputs();
    document.getElementById('gwaResult').classList.remove('show');
}

// Cumulative GWA Calculator Functions
function calculateCumulative() {
    const prev = parseFloat(document.getElementById('prevGWA').value);
    const current = parseFloat(document.getElementById('currentGWA').value);

    if (!prev || !current) {
        alert('Please fill in both GWA fields');
        return;
    }

    if (prev < 1 || prev > 5 || current < 1 || current > 5) {
        alert('GWA values must be between 1.0 and 5.0');
        return;
    }

    const cumulative = (prev + current) / 2;
    document.getElementById('cumulativeValue').textContent = cumulative.toFixed(2);
    document.getElementById('cumulativeResult').classList.add('show');
}

function clearCumulative() {
    document.getElementById('prevGWA').value = '';
    document.getElementById('currentGWA').value = '';
    document.getElementById('cumulativeResult').classList.remove('show');
}

// Subject Grades Calculator Functions
function calculateFinalGrade() {
    const prelims = parseFloat(document.getElementById('prelims').value);
    const midterm = parseFloat(document.getElementById('midterm').value);
    const prefinals = parseFloat(document.getElementById('prefinals').value);
    const finals = parseFloat(document.getElementById('finals').value);

    if (!prelims && prelims !== 0 || !midterm && midterm !== 0 || 
        !prefinals && prefinals !== 0 || !finals && finals !== 0) {
        alert('Please fill in all grade fields');
        return;
    }

    if (prelims < 0 || prelims > 100 || midterm < 0 || midterm > 100 ||
        prefinals < 0 || prefinals > 100 || finals < 0 || finals > 100) {
        alert('All grades must be between 0 and 100');
        return;
    }

    const finalGrade = ((prelims *.20) + (midterm * .20) + (prefinals * .20) + (finals * .40));
    let equivalent = 0;
    if (finalGrade < 59.50 ){
        equivalent = 5.00
    }
    else if(finalGrade < 65 ){
        equivalent = 3.00
    }
    else if(finalGrade < 70.50 ){
        equivalent = 2.75
    }
    else if(finalGrade < 76 ){
        equivalent = 2.50
    }
    else if(finalGrade < 81.50 ){
        equivalent = 2.25
    }
    else if(finalGrade < 86.50 ){
        equivalent = 2.00
    }
    else if(finalGrade < 91.50 ){
        equivalent = 1.75
    }
    else if(finalGrade < 94.50 ){
        equivalent = 1.50
    }
    else if(finalGrade < 97.50 ){
        equivalent = 1.25
    }
    else if(finalGrade <= 100 ){
        equivalent = 1.00
    }
    document.getElementById('finalGradeValue').textContent = finalGrade.toFixed(2) + "/" + equivalent.toFixed(2);
    document.getElementById('subjectResult').classList.add('show');
}

function clearSubject() {
    document.getElementById('prelims').value = '';
    document.getElementById('midterm').value = '';
    document.getElementById('prefinals').value = '';
    document.getElementById('finals').value = '';
    document.getElementById('subjectResult').classList.remove('show');
}

// Add event listeners for Enter key
document.addEventListener('DOMContentLoaded', function() {
    // GWA Calculator - Add subject on Enter
    const gwaInputs = ['subjectName', 'units', 'grade'];
    gwaInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addSubject();
                }
            });
        }
    });

    // Cumulative GWA - Calculate on Enter
    const cumulativeInputs = ['prevGWA', 'currentGWA'];
    cumulativeInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateCumulative();
                }
            });
        }
    });

    // Subject Grades - Calculate on Enter
    const subjectInputs = ['prelims', 'midterm', 'prefinals', 'finals'];
    subjectInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateFinalGrade();
                }
            });
        }
    });
});
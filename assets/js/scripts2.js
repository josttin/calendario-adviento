// Variables globales
let selectedCells = [];
let foundWords = [];

// Validación del quiz
function validateQuiz() {
  const q1 = document.getElementById('q1').value.toLowerCase().trim();
  const q2 = document.getElementById('q2').value.toLowerCase().trim();
  const q3 = document.getElementById('q3').value.toLowerCase().trim();
  const q4 = document.getElementById('q4').value.toLowerCase().trim();
  const q5 = document.getElementById('q5').value.toLowerCase().trim();

  const correctAnswers = {
    q1: ['patacones', 'patacon'],
    q2: ['mi cabello', 'cabello', 'pelo', 'mi pelo'],
    q3: ['one piece y kenichi', 'kenichi y one piece'],
    q4: ['luffy', 'luffy y kenichi', 'kenichi y luffy', 'kenichi'],
    q5: ['shi', 'ño, puto']
  };

  const isQ1Correct = correctAnswers.q1.some(answer => answer === q1);
  const isQ2Correct = correctAnswers.q2.some(answer => answer === q2);
  const isQ3Correct = correctAnswers.q3.some(answer => answer === q3);
  const isQ4Correct = correctAnswers.q4.some(answer => answer === q4);
  const isQ5Correct = correctAnswers.q5.some(answer => answer === q5);

  console.log({ q1, isQ1Correct, q2, isQ2Correct, q3, isQ3Correct, q4, isQ4Correct, q5, isQ5Correct });

  if (isQ1Correct && isQ2Correct && isQ3Correct && isQ4Correct && isQ5Correct) {
    alert('¡Respuestas correctas! ahora viene otro reto, noviecitasao.');
    document.getElementById('word-search-section').style.display = 'block';
    document.getElementById('quiz-form').style.display = 'none';
    generateWordSearch(['beshitos']);
  } else {
    alert('Algunas respuestas son incorrectas. Intenta nuevamente.');
  }
}

  // Generar sopa de letras
  function generateWordSearch(words) {
    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  
    // Colocar palabras en la sopa
    words.forEach(word => {
      let placed = false;
      while (!placed) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
  
        if (direction === 'horizontal' && col + word.length <= gridSize) {
          for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
          placed = true;
        } else if (direction === 'vertical' && row + word.length <= gridSize) {
          for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
          placed = true;
        }
      }
    });
  
    // Rellenar espacios vacíos con letras aleatorias
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }
  
    // Renderizar la sopa de letras
    const wordSearchDiv = document.getElementById('word-search');
    wordSearchDiv.innerHTML = '';
    grid.forEach(row => {
      row.forEach(letter => {
        const cell = document.createElement('div');
        cell.textContent = letter;
        wordSearchDiv.appendChild(cell);
      });
    });
  }
  
// Generar sopa de letras
function generateWordSearch(words) {
    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  
    // Colocar palabras en la sopa
    words.forEach(word => {
      let placed = false;
      while (!placed) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
  
        if (direction === 'horizontal' && col + word.length <= gridSize) {
          for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
          placed = true;
        } else if (direction === 'vertical' && row + word.length <= gridSize) {
          for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
          placed = true;
        }
      }
    });
  
    // Rellenar espacios vacíos con letras aleatorias
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }
  
    // Renderizar la sopa de letras
    const wordSearchDiv = document.getElementById('word-search');
    wordSearchDiv.innerHTML = '';
    grid.forEach((row, rowIndex) => {
      row.forEach((letter, colIndex) => {
        const cell = document.createElement('div');
        cell.textContent = letter;
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        wordSearchDiv.appendChild(cell);
      });
    });
  
    wordSearchDiv.dataset.words = JSON.stringify(words);
  }
  
  // Manejar clics en las celdas
  function handleCellClick(event) {
    const cell = event.target;
    cell.classList.toggle('selected');
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
  
    // Agregar o eliminar la celda de la lista seleccionada
    const cellIndex = selectedCells.findIndex(c => c.row === row && c.col === col);
    if (cellIndex === -1) {
      selectedCells.push({ row, col, letter: cell.textContent });
    } else {
      selectedCells.splice(cellIndex, 1);
    }
  
    // Validar si se forma una palabra
    validateSelectedWord();
  }
  
  // Validar palabra seleccionada
  function validateSelectedWord() {
    const wordSearchDiv = document.getElementById('word-search');
    const words = JSON.parse(wordSearchDiv.dataset.words);
    const selectedWord = selectedCells.map(c => c.letter).join('').toLowerCase();
  
    if (words.includes(selectedWord)) {
      alert(`¡te ganaste 5: ${selectedWord.toUpperCase()}!`);
      foundWords.push(selectedWord);
  
      // Marcar como encontrada
      selectedCells.forEach(cell => {
        const cellDiv = document.querySelector(`[data-row='${cell.row}'][data-col='${cell.col}']`);
        cellDiv.classList.add('correct');
        cellDiv.classList.remove('selected');
      });
  
      // Limpiar selección
      selectedCells = [];
  
      // Verificar si todas las palabras han sido encontradas
    if (foundWords.length === words.length) {
        showConclusion();
      }
    }
  }
  
  // Mostrar la sección de conclusión
  function showConclusion() {
    setTimeout(() => {
      alert('¡Felicidades! Has completado la sopa de letras.');
      const conclusionSection = document.getElementById('conclusion-section');
      conclusionSection.style.display = 'block';
    }, 500);
  }

    // Eventos
    document.getElementById('quiz-form').addEventListener('submit', function (event) {
        event.preventDefault();
        validateQuiz();
      });
      
// Función para cargar notas desde localStorage
function loadNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
  
    const notes = JSON.parse(localStorage.getItem('nursingNotes')) || [];
  
    notes.forEach((note, index) => {
      const noteCard = document.createElement('div');
      noteCard.classList.add('note-card');
  
      noteCard.innerHTML = `
        <h3>${note.patientName} (ID: ${note.patientId})</h3>
        <p><strong>Fecha:</strong> ${note.date}</p>
        <p>${note.notes}</p>
        <button class="delete-note" data-index="${index}">Eliminar</button>
      `;
  
      notesContainer.appendChild(noteCard);
    });
  
    // Asignar eventos a los botones de eliminar
    document.querySelectorAll('.delete-note').forEach(button => {
      button.addEventListener('click', deleteNote);
    });
  }
  
  // Función para guardar una nueva nota
  document.getElementById('save-button').addEventListener('click', () => {
    const patientId = document.getElementById('patient-id').value;
    const patientName = document.getElementById('patient-name').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;
  
    if (patientId && patientName && date && notes) {
      const newNote = { patientId, patientName, date, notes };
  
      const existingNotes = JSON.parse(localStorage.getItem('nursingNotes')) || [];
      existingNotes.push(newNote);
  
      localStorage.setItem('nursingNotes', JSON.stringify(existingNotes));
      alert('Nota guardada correctamente.');
  
      // Limpiar campos y recargar las notas
      document.getElementById('patient-form').reset();
      document.getElementById('notes').value = '';
      loadNotes();
    } else {
      alert('Por favor complete todos los campos.');
    }
  });
  
  // Función para eliminar una nota
  function deleteNote(event) {
    const index = event.target.getAttribute('data-index');
    const notes = JSON.parse(localStorage.getItem('nursingNotes')) || [];
  
    notes.splice(index, 1);
    localStorage.setItem('nursingNotes', JSON.stringify(notes));
  
    loadNotes();
  }
  
  // Cargar notas al inicio
  loadNotes();
  
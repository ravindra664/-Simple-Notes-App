const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Function to save notes to localStorage
const saveNote = () => {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

// Function to add a note
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tool">
      <i class="save fas fa-save"></i>
      <i class="trash fas fa-trash" style="color:red"></i>
    </div>
    <textarea>${text}</textarea>
  `;

  // Delete note
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNote(); // Save after deletion
  });

  // Save note when save button is clicked
  note.querySelector(".save").addEventListener("click", function () {
    saveNote();
  });

  // Auto-save when focus is lost from textarea
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNote();
  });

  main.appendChild(note);
  saveNote();
};

// Event listener to add a new note
addBtn.addEventListener("click", function () {
  addNote();
});

// Load notes from localStorage when the page loads
(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes")) || [];

  if (lsNotes.length === 0) {
    addNote();
  } else {
    lsNotes.forEach((noteText) => {
      addNote(noteText);
    });
  }
})();

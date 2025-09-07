import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App.css";

function App() {
  const [notesList, setNotesList] = useState([
    {
      noteText: "I am the first note!",
      id: crypto.randomUUID(),
      date: dayjs().format("DD/MM/YYYY"),
    },
    {
      noteText: "I am the second note!",
      id: crypto.randomUUID(),
      date: dayjs().format("DD/MM/YYYY"),
    },
    {
      noteText: "I am the third note!",
      id: crypto.randomUUID(),
      date: dayjs().format("DD/MM/YYYY"),
    },
  ]);

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotesList(JSON.parse(savedNotes));
    }
  }, []); //dependency array is empty so it will be rendered once

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  }, [notesList]);

  function fetchInput(event) {
    setInputText(event.target.value);
  }

  function addNewNote() {
    if (inputText === "") {
      alert("Whoops, Empty note can't be added!");
    } else {
      const newNote = {
        noteText: inputText,
        id: crypto.randomUUID(),
        date: dayjs().format("DD/MM/YYYY"),
      };
      setNotesList([...notesList, newNote]);
      setInputText("");
    }
  }

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function editNote(id, noteText) {
    setEditingId(id);
    setEditingText(noteText);
  }

  function saveNote(id) {
    setNotesList(
      notesList.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            noteText: editingText,
          };
        }
        return note;
      })
    );
    setEditingId(null);
    setEditingText("");
  }

  function displayNotes() {
    return notesList.map((note) => (
      <div key={note.id}>
        {note.id === editingId ? (
          <>
            <textarea
              value={editingText}
              onChange={(event) => setEditingText(event.target.value)}
            />
            <button className="save-btn" onClick={() => saveNote(note.id)}>
              Save
            </button>
          </>
        ) : (
          <span>{note.noteText}</span>
        )}

        <p>{note.date}</p>

        <button
          className="delete-btn"
          onClick={() => {
            deleteNote(note.id);
          }}
        >
          Delete
        </button>

        <button
          className="edit-btn"
          onClick={() => editNote(note.id, note.noteText)}
        >
          Edit
        </button>
      </div>
    ));
  }

  function deleteNote(id) {
    setNotesList(
      notesList.filter((note) => {
        return note.id != id;
      })
    );
  }

  return (
    <>
      <div className="notes-container">{displayNotes()}</div>
      <div>
        <textarea
          onChange={fetchInput}
          name="notes"
          id="notes"
          value={inputText}
        ></textarea>
        <button className="add-btn" onClick={addNewNote}>
          Add
        </button>
      </div>
    </>
  );
}

export default App;

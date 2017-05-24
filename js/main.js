(function() {
  const API_URL = "https://vanilla-js-notes.herokuapp.com/notes"
  let req = new XMLHttpRequest()
  req.open("GET", API_URL)
  req.send(null)
  req.responseType = "json"

  req.onreadystatechange = () => {
    let DONE = 4
    let OK = 200
    if (req.readyState === DONE) {
      if (req.status === OK)
        appendNotes(req.response)
    } else {
      console.log(`Error: ${req.status}`)
    }
  }

  function appendNotes(notes) {
    notes.forEach((note) => {
      // Create elments and append content
      let anchor = document.getElementById("notes-display")
      let noteContainer = document.createElement("div")
      let noteTitle = document.createElement("h3")
      let noteCategories = document.createElement("h4")
      let noteDescriptionContainer = document.createElement("div")
      let noteDescriptionContent = document.createElement("p")

      noteContainer.classList.add("note-container")

      anchor.appendChild(noteContainer)
      noteContainer.appendChild(noteTitle).innerHTML = note.title
      noteContainer.appendChild(noteCategories).innerHTML = note.categories
      noteContainer.appendChild(noteDescriptionContainer)
      noteDescriptionContainer.appendChild(noteDescriptionContent).innerHTML = note.description
    })
  }
})()

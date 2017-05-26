(() => {

  let notes = {
    init() {
      this.ajaxLoading()
      this.loadNotes()
    },
    ajaxLoading() {
      let anchor = document.getElementById("notes-display")
      let loading = document.createElement("p")
      loading.id = "loading"
      anchor.appendChild(loading).innerHTML = "Loading..."
    },
    loadNotes() {
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
            this.appendNotes(req.response)
        } else {
          console.log(`Error: ${req.status}`)
        }
      }
    },
    appendNotes(notes) {
      this.removeLoading()
      notes.forEach((note) => {
        // Create elments and append content
        let anchor = document.getElementById("notes-display")
        let noteContainer = document.createElement("div")
        noteContainer.classList.add("note-container")
        anchor.appendChild(noteContainer)
        noteContainer.innerHTML = `
          <h3>${note.title}</h3>
          <h4>${note.categories}</h4>
          <i class="fa fa-pencil" id="edit-note"></i>
          <i class="fa fa-trash" id="delete-note"></i>
          <div>
            <p>${note.description}</p>
          </div>`
      })
    },
    removeLoading() {
      let loading = document.getElementById("loading")
      loading.remove()
    }
  }

  notes.init()
})()

(() => {

  let notes = {
    API_URL: "https://vanilla-js-notes.herokuapp.com/notes",
    init() {
      this.ajaxLoading()
      this.loadNotes()
        .then(this.appendNotes.bind(this))
        .then(this.bindEvents.bind(this))
    },
    ajaxLoading() {
      let anchor = document.getElementById("notes-display")
      let loading = document.createElement("p")
      loading.id = "loading"
      anchor.appendChild(loading).innerHTML = "Loading..."
    },
    loadNotes() {
      return fetch(this.API_URL).then(data => {
        return data.json()
      }).catch(err => {
        console.log(err)
      })
    },
    appendNotes(notes) {
      return new Promise((resolve, reject) => {
        notes.forEach((note) => {
          // Create elments and append content
          let anchor = document.getElementById("notes-display")
          let noteContainer = document.createElement("div")
          noteContainer.classList.add("note-container")
          noteContainer.id = note.id
          anchor.appendChild(noteContainer)
          noteContainer.innerHTML = `
            <h3>${note.title}</h3>
            <h4>${note.categories}</h4>
            <i class="fa fa-pencil edit-note"></i>
            <i class="fa fa-trash delete-note"></i>
            <div>
              <p>${note.description}</p>
            </div>`
        })
        resolve()
        this.removeLoading()
      })
    },
    bindEvents() {
      this.editNoteHandlers()
      this.deleteNoteHandlers()
    },
    removeLoading() {
      let loading = document.getElementById("loading")
      loading.remove()
    },
    editNoteHandlers() {
      const editNL = document.getElementsByClassName("edit-note")
      const editTargetList = [...editNL]
      const notes = document.getElementsByClassName("note-container")
      const notesList = [...notes]
      console.log(editTargetList[0])
      editTargetList.forEach((element, index) => {
        let noteId = (notesList[index].id)
        element.onclick = () => {
          this.editNote(noteId)
        }
      })
    },
    deleteNoteHandlers() {
      const deleteNL = document.getElementsByClassName("delete-note")
      const deleteTargetList = [...deleteNL]
      const notes = document.getElementsByClassName("note-container")
      const notesList = [...notes]
      console.log(deleteTargetList[0])
      deleteTargetList.forEach((element, index) => {
        let noteId = (notesList[index].id)
        element.onclick = () => {
          this.deleteNote(noteId)
        }
      })
    },
    editNote(id) {
      sessionStorage.setItem("key", id)
      window.location.href = "edit.html"
    },
    deleteNote(id) {
      return fetch(`${this.API_URL}/${id}`, {
        method: "DELETE"
      }).then(() => {
        let deletedNote = document.getElementById(id)
        deletedNote.remove()
      })
    }
  }

  notes.init()
})()

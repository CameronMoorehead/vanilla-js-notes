(() => {
  let editNote = {
    noteId: sessionStorage.getItem("key"),
    API_URL: `https://vanilla-js-notes.herokuapp.com/notes`,
    init() {
      // this.setContent()
      // this.bindEvents()
      this.getNote()
        .then(this.setContent.bind(this))
      this.bindEvents()
    },
    getNote() {
      return fetch(`${this.API_URL}/${this.noteId}`).then(noteData => {
        return noteData.json()
      }).catch(err => {
        console.log(err)
      })
    },
    setTitle(noteData) {
      let noteTitle = document.getElementsByClassName("notes-title")[0]
      noteTitle.value = noteData.title
    },
    setCategories(noteData) {
      let noteCategories = document.getElementsByClassName("notes-categories")[0]
      noteCategories.value = noteData.categories
    },
    setDescription(noteData) {
      let noteDescription = document.getElementsByClassName("notes-description")[0]
      noteDescription.value = noteData.description
    },
    setContent(noteData) {
      console.log(noteData)
      this.setTitle(noteData)
      this.setCategories(noteData)
      this.setDescription(noteData)
    },
    bindEvents() {
      let save = document.getElementById("saveHandler")
      save.onclick = () => {
        this.saveChanges()
      }
    },
    saveChanges() {
      return fetch(`${this.API_URL}/${this.noteId}`, {
        method: "PUT",
        body: JSON.stringify({
          id: this.noteId,
          title: document.getElementsByClassName("notes-title")[0].value,
          categories: document.getElementsByClassName("notes-categories")[0].value,
          description: document.getElementsByClassName("notes-description")[0].value
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        // return to homepage after edit
        window.location.href = "/"
      })
    }
  }

  editNote.init()

})()

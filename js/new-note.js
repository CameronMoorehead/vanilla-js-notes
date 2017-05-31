(() => {
  let createNote = {
    API_URL: `https://vanilla-js-notes.herokuapp.com/notes`,
    init() {
      this.bindEvents()
    },
    bindEvents() {
      let publish = document.getElementById("publishHandler")
      publish.onclick = () => {
        this.publishNote()
      }
    },
    publishNote() {
      return fetch(`${this.API_URL}`, {
        method: "POST",
        body: JSON.stringify({
          title: document.getElementsByClassName("notes-title")[0].value,
          categories: document.getElementsByClassName("notes-categories")[0].value,
          description: document.getElementsByClassName("notes-description")[0].value
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        setTimeout(() => {
          window.location.href = "/"
        }, 5000)
      })
    }
  }

  createNote.init()

})()

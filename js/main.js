(() => {

  let notes = {
    init() {
      // this.ajaxLoading()
      // this.loadNotes()
      this.appendNotes2()
      // this.appendNotes2()
    },
    ajaxLoading() {
      let anchor = document.getElementById("notes-display")
      let loading = document.createElement("p")
      loading.id = "loading"
      anchor.appendChild(loading).innerHTML = "Loading..."
    },
    API_URL: "https://vanilla-js-notes.herokuapp.com/notes",
    loadNotes2() {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", this.API_URL)
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(Error(xhr.statusText))
          }
        }
        xhr.onerror = () => {
          reject(Error("Network Error"))
        }
        xhr.send()
      })
    },
    appendNotes2() {
      this.loadNotes2(this.API_URL).then((response) => {
        console.log('success!', response)
      }, (error) => {
        console.error('fail', error)
      }).then((response) => {
        console.log(response)
      })
    },
    // loadNotes() {
    //   const API_URL = "https://vanilla-js-notes.herokuapp.com/notes"
    //   let req = new XMLHttpRequest()
    //   req.open("GET", API_URL)
    //   req.send(null)
    //   req.responseType = "json"
    //   req.onreadystatechange = () => {
    //     let DONE = 4
    //     let OK = 200
    //     if (req.readyState === DONE) {
    //       if (req.status === OK)
    //         this.appendNotes(req.response)
    //     } else {
    //       console.log(`Error: ${req.status}`)
    //     }
    //   }
    // },
    // appendNotes(notes) {
    //   this.removeLoading()
    //   notes.forEach((note) => {
    //     // Create elments and append content
    //     let anchor = document.getElementById("notes-display")
    //     let noteContainer = document.createElement("div")
    //     noteContainer.classList.add("note-container")
    //     anchor.appendChild(noteContainer)
    //     noteContainer.setAttribute("dataId", note.id)
    //     noteContainer.innerHTML = `
    //       <h3>${note.title}</h3>
    //       <h4>${note.categories}</h4>
    //       <i class="fa fa-pencil edit-note"></i>
    //       <i class="fa fa-trash delete-note"></i>
    //       <div>
    //         <p>${note.description}</p>
    //       </div>`
    //   })
    //   this.editNote()
    // },
    removeLoading() {
      let loading = document.getElementById("loading")
      loading.remove()
    },
    editNote() {
      const editTarget = document.getElementsByClassName("edit-note")
      console.log(editTarget[0])
      // const editId = editTarget.dataset.dataId
      // window.location.href = `edit.html?${}`
    },
    deleteNote() {
    }
  }

  notes.init()
})()

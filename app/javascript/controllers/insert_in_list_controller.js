import { Controller } from "stimulus"

export default class extends Controller {
 static targets = [ "form", "items" ]
 static values = {position: String}

  connect() {
    // console.log('Hello from stimulus')
    // console.log('controller', this.element)
    // console.log('my form', this.formTarget)
    // console.log('list of reviews', this.itemsTarget)

  }
  send(event) {
    event.preventDefault()
    // console.log('my Event')
    // console.log(event)
    fetch(this.formTarget.action, {
      method: "POST",
      headers: {"Accept": "application/json"},
      body: new FormData (this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {


      if (data.inserted_item) {
        this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
      }
      this.formTarget.outerHTML = data.form
    })
  }


}

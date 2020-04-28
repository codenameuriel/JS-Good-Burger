document.addEventListener("DOMContentLoaded", () => {
  
  renderBurger()

  document.addEventListener('click', event => {
    if (event.target.className === 'button') {
      let li = document.createElement('li')
      let parentDiv = event.target.parentNode
      let h3 = parentDiv.children[0]
  
      li.innerText = h3.innerText
      burgerOrderUl.append(li)
    }
  })

  form.addEventListener('submit', event => {
    event.preventDefault()
    
    postBurger()
  })
})

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function postBurger() {
  const inputName = document.querySelector('#burger-name').value
  const inputDescription = document.querySelector('#burger-description').value
  const inputImageURL = document.querySelector('#burger-image').value

  const burger = {
    name: inputName,
    description: inputDescription,
    image: inputImageURL 
  }

  fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(burger)
  })
  .then(resp => resp.json())
  .then(renderBurger)
}


const endpoint = 'http://localhost:3000/burgers';

const burgerMenuDiv = document.querySelector('#burger-menu');

const burgerOrderUl = document.querySelector('#order-list');

const form = document.querySelector('#custom-burger');


function renderBurger() {
  fetch(endpoint)
  .then(function(resp) {
    return resp.json()
  })
  .then(createBurgerHTML)
}

function createBurgerHTML(arr) {
  arr.forEach(burger => {
    let div = document.createElement('div')
    div.className = 'burger'

    let h3 = document.createElement('h3')
    h3.className = 'burger_title'
    h3.innerText = burger.name

    let img = document.createElement('img')
    img.src = burger.image

    let p = document.createElement('p')
    p.className = 'burger_description'
    p.innerText = burger.description

    let button = document.createElement('button')
    button.className = 'button'
    button.innerText = 'Add to Order'
    button.dataset.id = burger.id

    div.append(h3, img, p, button)
    burgerMenuDiv.append(div)
  })
}


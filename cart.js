const cart = []

const addItem = document.getElementById('addItem')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const listItem = document.getElementById('items')
const divTotal = document.getElementById('total')

document.querySelector('body').onclick = (e) => {
console.log('---------------------------------')
console.log(e.target)
}

addItem.onsubmit = function(e) {
e.preventDefault()
const name = inputName.value
const price = inputPrice.value

addToCart(name, price)
showCart()
}

listItem.onclick = function(e) {
console.log(e.target)
if (e.target && e.target.classList.contains('remove')) {
    console.log(e.target.dataset.name)
    removeFromCart(e.target.dataset.name)
}
}

listItem.onchange = function(e) {
if (e.target && e.target.classList.contains('update')) {
    const quantity = parseInt(e.target.value)
    const name = e.target.dataset.name
    updateCart(name, quantity)

}
}

function addToCart(name, price) {
for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
    cart[i].quantity += 1
    showCart()
    return true
    }
}
cart.push({ name, price, quantity: 1})
showCart()
}

function removeFromCart(name, quantity = 0) {
console.log(name, quantity)
for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
    if (quantity) {
        let newquantity = cart[i].quantity - quantity
        if (newquantity > 0) {
        cart[i].quantity = newquantity
        } else {
        cart.splice(i, 1)
        }
    } else {
        cart.splice(i, 1)
    }
          }
        }

        showCart()
      }

      function showCart() {
        let str = ''
        for (let i = 0; i < cart.length; i += 1) {
          str += `<li>
            <span>
              ${cart[i].name} ${cart[i].price} each
              x ${cart[i].quantity} = ${(cart[i].quantity * cart[i].price).toFixed(2)}
            </span>
            <span>
              <button class="remove" data-name="${cart[i].name}">remove</button>
            </span>
          </li>`
        }
        listItem.innerHTML = str
        divTotal.innerHTML = getTotal()
      }

      function getTotal() {
        let total = 0
        for (let i = 0; i < cart.length; i += 1) {
          total += cart[i].price * cart[i].quantity
        }
        return total.toFixed(2)
      }

      function updateCart(name, quantity) {
        for (let i = 0; i < cart.length; i += 1) {
          if (cart[i].name === name) {
            cart[i].quantity = quantity
            showCart()
            return true
          }
        }
        return false
      }

      showCart()

      getTotal()

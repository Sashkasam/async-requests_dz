const xhr = new XMLHttpRequest()
const loader = document.querySelector('.loader')
const items = document.getElementById('items')
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses')
xhr.onload = function () {
    if(xhr.status !== 200) {
        alert(`Ошибка ${xhr.status}`)

    }else {
        const data = JSON.parse(xhr.responseText)
        const currencies = data['response']['Valute']
        for (const currency in currencies ) {
            const currencyElement = currencies[currency]
            const currencyValue = currencyElement.Value
            const currencyCharCode = currencyElement.CharCode
            const newDiv = document.createElement('div')
            newDiv.className = 'item'
            items.appendChild(newDiv)
            newDiv.insertAdjacentHTML('beforeend', `<div class="item__code">${currencyCharCode}</div><div class="item__value">${currencyValue}</div><div class="item__currency">руб.</div>`)
        }
        loader.classList.remove('loader_active')
    }
}

xhr.send()

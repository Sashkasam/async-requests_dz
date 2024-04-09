const form = document.querySelector('form')
const progress = document.getElementById('progress')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const fileInput = document.getElementById('file')
    const file = fileInput.files[0]
    const xhr = new XMLHttpRequest()
    const formData = new FormData (form)


    xhr.open('POST', ' https://students.netoservices.ru/nestjs-backend/upload')
    xhr.upload.addEventListener('progress', e => {
        const progressLoad = e.lengthComputable ? (e.loaded / e.total)  : 0
        progress.value = progressLoad.toFixed(1)
    })
    xhr.send(formData)

})



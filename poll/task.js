const xhr = new XMLHttpRequest()
const pollTitle = document.getElementById('poll__title')
const pollAnswers = document.getElementById('poll__answers')

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll')
xhr.addEventListener('readystatechange', function () {
    if(xhr.readyState=== xhr.DONE) {
        const data = JSON.parse(xhr.responseText)
        pollTitle.textContent = data['data']['title']
        const answers = data['data']['answers']
        const pollAnswersId = data['id']
        for(const answer in answers) {
           const pollAnswer = answers[answer]
            const newButton = document.createElement('button')
            pollAnswers.appendChild(newButton)
            newButton.className = 'poll__answer'
            newButton.textContent = pollAnswer

            newButton.addEventListener('click', function (event) {
                const answersId = answers.indexOf(`${event.target.textContent}`)
                alert('Спасибо, ваш голос засчитан!')
                pollAnswers.remove()

                const  xhrPost = new  XMLHttpRequest()
                xhrPost.open('POST','https://students.netoservices.ru/nestjs-backend/poll')
                xhrPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded')
                xhrPost.addEventListener('readystatechange', function () {
                    if(xhrPost.readyState === xhrPost.DONE) {
                        const dataVoteValues = JSON.parse(xhrPost.responseText)
                        const voteValues = dataVoteValues['stat']
                        for (const voteValue in voteValues) {
                            const pollVote = voteValues[voteValue]
                            const newDiv = document.createElement('div')

                            pollTitle.after(newDiv)
                            newDiv.insertAdjacentHTML(`afterbegin`, `${pollVote.answer}: <b>${pollVote.votes}%</b>`)
                        }
                    }
                })
                xhrPost.send(`vote=${pollAnswersId}&answer=${answersId}`)
            })
        }
    }
})
xhr.send()


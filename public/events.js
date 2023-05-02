const form = document.getElementById('vote-form')

//같은 파일 다른 함수에서 쓰일 사용자 가져오기 함수

async function getSubject() {
    try {
        const targetDiv = document.querySelector('#target');
        targetDiv.innerHTML = '';
        const subjects = await axios.get('/subject')

        subjects.data.map((subject) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <input type="radio" id=${subject.name} name="vote" value=${subject.name}>
            <label for=${subject.name}>${subject.name} have ${subject.voteNum} vote</label>` 
            targetDiv.appendChild(div);
        })
    } catch(err) {
        console.error(err);
    }
}

// submit 이후 동작

form.addEventListener('submit',async (e) => {
    e.preventDefault()
    const vote = e.target.vote.value

    try {
        const logDiv = document.querySelector('.log');
        if (document.cookie.includes('haveVoted=true')) {
            logDiv.innerHTML = '<p>you have voted already!</p>';
            return ''
        }
        await axios.post('/voting', { vote }); 
        getSubject();
        logDiv.innerHTML = `<p>you vote to ${vote}</p>`;
    } catch(err) {
        console.error(err);
    }
})
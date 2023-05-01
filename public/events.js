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
        await axios.post('/voting', { vote }); 
        const note = document.createElement('div');
        note.innerHTML = `you vote to ${vote}`;
        getSubject();
        const logDiv = document.querySelector('.log');
        logDiv.innerHTML = '';
        logDiv.appendChild(note);
    } catch(err) {
        console.error(err);
    }
})
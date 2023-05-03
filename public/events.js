const form = document.getElementById('vote-form')

//같은 파일 다른 함수에서 쓰일 사용자 가져오기 함수

async function getSubject() {
    try {
        const targetDiv = document.querySelector('#target');
        targetDiv.innerHTML = '';
        const subjects = await axios.get('/subject')

        let sum = 0;
        for (arg of subjects.data) {
            sum+=arg.voteNum;
        }

        subjects.data.map((subject) => {

            const div = document.createElement('div');
            div.innerHTML = `
            <input type="radio" id=${subject.name} name="vote" value=${subject.name}>
            <label for=${subject.name}>
                <div class='upper'>
                    <div>${ subject.name } have ${ subject.voteNum } vote</div>
                    <div>${ (100 * subject.voteNum/sum).toPrecision(3) }%</div>
                </div>
                <div class="line">
                    <div class="green-bar" style="--percentage:${100 * subject.voteNum/sum}%"></div>
                </div>
            </label>` 
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
        if (vote === '') {
            logDiv.innerHTML = '<p>pls select value before submit!</p>';
            return ''
        }
        await axios.post('/voting', { vote }); 
        getSubject();
        logDiv.innerHTML = `<p>you vote to ${vote}</p>`;
    } catch(err) {
        console.error(err);
    }
})
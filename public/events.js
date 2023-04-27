const form = document.getElementById('vote-form')
form.addEventListener('submit',async (e) => {
    console.log(e.target)
    const data = e.target
    try {
        await axios.post('/voting',{vote: data});
        const note = document.createElement('div')
        form.appendChild(note);
    } catch(err) {
        console.error(err)
    }
})
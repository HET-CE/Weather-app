const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input')
const messages = document.querySelectorAll('p')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchElement.value;
    
    messages[0].innerHTML = 'Loading...'
    messages[1].innerHTML = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            messages[0].innerHTML = data.error;
            messages[1].innerHTML = ''
        }
        else{
            messages[0].innerHTML = data.location
            messages[1].innerHTML = data.weather
            // console.log(data.location)
            // console.log(data.weather)
        }
    })
})

})
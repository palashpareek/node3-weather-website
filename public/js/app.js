console.log('Client side js file is loaded')

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
       response.json().then((data) =>
       {
       	console.log(data)
       })
})*/

/*fetch('http://localhost:3000/weather/?address=jaipur').then((response) =>{
      response.json().then((data)=>{
      	if(data.error)
      	{
      		coneole.log(data.error)
      	}
      	else
      	{
      		 console.log(data.location)
         console.log(data.Weather_Report)
      	}
        
      })
})*/


 const Weatherform = document.querySelector('form')
 const search = document.querySelector('input')
 const messageOne = document.querySelector('#message-1')
 const messageTwo = document.querySelector('#message-2')

 Weatherform.addEventListener('submit', (e) =>{
      e.preventDefault()

      const location  = search.value

      messageOne.textContent = 'Loading...'
      messageTwo.textContent = ''  

      fetch('/weather/?address='+location).then((response) =>{
            response.json().then((data)=>{
                  if(data.error)
                  {
                        //console.log(data.error)
                        messageOne.textContent = data.error
                        messageTwo.textContent = ''
                  }
                  else
                  {
                        //console.log(data.location)
                        //console.log(data.Weather_Report)
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.Weather_Report
                  }
            })
      })

 })
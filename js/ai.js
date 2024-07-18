const loadData =async (show)=>{ 
    const res =await fetch(' https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const infos = data.data.tools
    
    
    displayData(infos, show);
}

const displayData = (infos, show) =>{
    
    const showMoreBtn = document.getElementById('see-more-btn')

    if(infos.length > 6 && !show){
        showMoreBtn.classList.remove('hidden')
    }
    else{
        showMoreBtn.classList.add('hidden')
    }

    if(!show){
        infos = infos.slice(0,6)
    }
    


    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.textContent = ''
    for(const info of infos){
        // console.log(info);
        const features = info.features;
        const [li1 = '', li2 = '', li3 = ''] = features;
            

        


    const cardDiv = document.createElement('div');
    
    // console.log(id);




    cardDiv.classList = `card bg-base-100  shadow-xl border-2`
    cardDiv.innerHTML = `
    <figure class="px-6 pt-6">
        <img src="${info.image}"
        alt="Photo"
        class="rounded-xl" />
        </figure>
        <div class="card-body ">
        <h2 class="text-2xl font-bold">Features</h2>

        <ol>
            <li>1. ${li1}</li>
            <li>2. ${li2}</li>
            <li>3. ${li3}</li>
        
        </ol>
       
        <h2 class = 'text-2xl font-bold'>${info.name}</h2>
        <div class='flex justify-between'>
        <p><i class="fa-regular fa-calendar-days"></i> ${info.published_in}</p>
        <button onclick="showDetails('${info.id}')" class="btn bg-red-600 text-white px-5">Show Details</button>
        </div>
        </div>
    
    `
    cardsContainer.appendChild(cardDiv);

    }

}

const showDetails = async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const info = data.data;
    console.log(info);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.classList = `flex flex-col lg:flex-row lg:justify-between gap-4 p-2 lg:p-5`;

   
    const features = info.features;
    
    const prices = info?.pricing;
  

    // if(prices ===  null){
    //     const costContainer = document.getElementById('cost-container');
    //     costContainer.textContent = 'No data found'
    // }
        const [basic = '' , pro = '', enterprise = ''] = prices;
  


    // if(integrations ===  null){
    //     const msg = 'not found'
    //     return msg
    // }
    // if(prices ===  null){
    //     const msg = 'not found'
    //     return msg
    // }
   
    // console.log(prices);
    

    const integrations =  info.integrations
    const [i1 = '', i2 ='', i3 = ''] = integrations



    detailsContainer.innerHTML = `
    <!-- first part -->
      <div class="border-2 border-red-300 rounded-2xl bg-red-50 p-4  space-y-10 w-full lg:w-1/2">
        <div>
          <h2 class="text-3xl font-bold">${info.description}</h2>
        </div>

        <!-- cost container -->
        <div id='cost-container' class="flex flex-col lg:flex-row gap-4 text-center ">
          <!-- cost1 -->
          <div class="bg-white px-5 py-12 rounded-2xl ">
            <h3 class="text-lg font-bold text-green-700">${basic.price ? basic.price : 'Not available'}
              ${basic?.plan || 'Not available'}</h3>
          </div>
          <!-- cost2 -->
          <div class="bg-white px-5 py-12 rounded-2xl  ">
            <h3 class="text-lg font-bold text-orange-500">${pro.price ? pro.price : 'Not available'}
              ${pro.plan ? pro.plan :'Not available'}</h3>
          </div>
          <!-- cost3 -->
          <div class="bg-white p-5 rounded-2xl ">
            <h3 class="text-lg font-bold text-red-600">${enterprise?.price || 'Not available'}
              ${enterprise?.plan || 'Not available'}</h3>
          </div>
          
        </div>

        <div class="flex flex-col lg:flex-row justify-between ">
          <!-- features -->
          <div>
            <h2 class="text-3xl font-bold">Features</h2>
            <ul>
              <li>${features['1']?.feature_name}</li>
              <li>${features['2']?.feature_name}</li>
              <li>${features['3']?.feature_name}</li>
              
            </ul>


          </div>

          <!-- Integrations  -->
          <div>
            <h2 class="text-3xl font-bold">Integrations</h2>
            <ul>
              <li>${i1}</li>
              <li>${i2}</li>
              <li>${i3}</li>
            </ul>
          </div>
        </div>
      </div>


      <!-- last part -->
      <!-- card -->
      <div class="card bg-base-100 shadow-xl border-2 p-4 w-full lg:w-1/2">
        <figure>
          <div class="absolute right-8 top-8">
            <p class="bg-red-600 text-white px-4 py-1 max-w-36 font-medium rounded-lg ">94% accuracy</p>
          </div>

          <img class = 'h-full'
            src="https://www.datanami.com/wp-content/uploads/2023/01/chat_gpt_shutterstock_Ebru-Omer.jpg"
            alt="Shoes" />
        </figure>
        <div class="card-body text-center">
          <h2 class="card-title">${info.input_output_examples[0].input}</h2>
          <p>${info.input_output_examples[0].output}</p>
          
        </div>
      </div>
    
    
    
    
    `







    // show modal
    show_details_modal.showModal();
}


const handleSeeMore = async () =>{
    handleSortByDate(true)

}

const handleSortByDate = (show) =>{
    loadData(show);
}




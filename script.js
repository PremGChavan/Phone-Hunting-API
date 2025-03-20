let searchText='13';

function searchHandler(isShowAll){
    loading(true);
    const searchField=document.getElementById("searchField");
    searchText=searchField.value;
    loadPhone(searchText,isShowAll);
    
}
const loading= (isLoading)=>
{
    
    const loading= document.getElementById("loading");
    if(isLoading)
    {
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }

}
// Load Phones
const loadPhone= async(searchText,isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
    
}
loadPhone(searchText);

// Display Phones
const displayPhones = (phones,isShowAll)=>{
    //console.log(phones);
    const phoneContainer= document.getElementById("phone-container");
    phoneContainer.textContent='';
    
    const showAll= document.getElementById("showALLBtn");
    if(phones.length>12 && !isShowAll)
    {
        showAll.classList.remove('hidden');
        
        
    }
    else
    {
        showAll.classList.add('hidden');
    }
    //display first 10
    if(!isShowAll)
    {
        phones=phones.slice(0,12);
    }
    
    phones.forEach((phone, index) => {
        // Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-red-50 shadow-xl p-5`;
        phoneCard.id = `phone-card-${phone.slug}`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="phone" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center ">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions">
                    <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

// show All Button
function showBtn () {searchHandler(true);}

// Show Details
const showDetailsHandler = async (id) => {
    // Load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

    const selectedCard = document.getElementById(`phone-card-${id}`);
    if (selectedCard) {
        selectedCard.classList.add("bg-gray-200"); // Add background to clicked card
    }
}

const showPhoneDetails=(details)=>{
    my_modal.showModal();
    const modelName= document.getElementById('detailsPhoneName');
    const brandName= document.getElementById('detailsBrand');
    const detailsSpec= document.getElementById('detailsSpec');
    const releaseDate= document.getElementById('releaseDate');
    const imageDiv= document.getElementById('imgContainer');

    imageDiv.innerHTML=`<img src="${details.image}" alt="">`;
    modelName.innerText=details.name;
    brandName.innerText=`Brand: ${details.brand}`;
    const features=details.mainFeatures;
    //console.log(features.storage);
    console.log(details.image);
    let string="";
    for (const key in features) {
        string=string+`${key}: ${features[key]} \n`;    
    }
    detailsSpec.innerText=string;
    releaseDate.innerText=`${details.releaseDate}`;   
}

function closeModal(event) {
    const modal = document.getElementById("my_modal");
    const modalBox = modal.querySelector(".modal-box");
  
    // If event exists and the click is outside the modal box, close the modal
    if (!event || !modalBox.contains(event.target)) {
      modal.close();
    }
  }
  
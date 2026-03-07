let allCard =[];
let openCard =[];
let closedCard =[];
const allBtn = document.getElementById('all-filter-btn');
const openBtn = document.getElementById('open-filter-btn');
const closedBtn = document.getElementById('closed-filter-btn');
const issues = document.getElementById("issues");
const spinner = document.getElementById("spinner");

const showSpinner = () => {
    spinner.classList.remove("hidden");
}
const hideSpinner = () => {
    spinner.classList.add("hidden");
}

const toggleStyle =(id) => {
    showSpinner();
    allBtn.classList.remove("bg-[#4A00FF]" ,"text-white");
    openBtn.classList.remove("bg-[#4A00FF]" ,"text-white");
    closedBtn.classList.remove("bg-[#4A00FF]" ,"text-white");

    allBtn.classList.add("bg-white", "text-[#64748B]","border","border-[#E4E4E7]");
    openBtn.classList.add("bg-white", "text-[#64748B]");
    closedBtn.classList.add("bg-white", "text-[#64748B]");

    const selected = document.getElementById(id);
       selected.classList.remove("bg-white", "text-[#64748B]");
    selected.classList.add("bg-[#4A00FF]" ,"text-white");
if(id == 'all-filter-btn'){
    issues.innerText = allCard.length;
 displayCard(allCard);
}

else if(id == 'closed-filter-btn'){
    const closedCards = allCard.filter(card => card.status === "closed");
    issues.innerText = closedCard.length;
    displayCard(closedCards);
}
 else if(id == 'open-filter-btn') {
    const openCards = allCard.filter(card => card.status === "open");
    issues.innerText = openCard.length;
    displayCard(openCards);
}
hideSpinner();
}

const loadCard = () => {
    showSpinner();
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        allCard = data.data;
        console.log(data.data);
 openCard = allCard.filter(card => card.status === "open");
    closedCard = allCard.filter(card => card.status === "closed");
        displayCard(data.data);
    });
  hideSpinner();
}

const displayCard = (cards) => {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    for (let card of cards) {
        let borderColor = "border-t-green-500";
        let statusImg = "./assets/Open-Status.png";
        let badgeColor = "bg-gray-200 text-gray-500";

        if (card.priority === "high") {
            badgeColor = "bg-red-200 text-red-600";
        }
        else if(card.priority === "medium"){
            badgeColor = "bg-yellow-200 text-yellow-600";
        }

        if (card.status === "closed") {
            borderColor = "border-t-purple-500";
            statusImg = "./assets/Closed- Status .png";
        }


let labelsHTML = "";
for (let label of card.labels) {

    labelsHTML += `
    <span class="bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A] text-[12px] px-2 py-1 rounded-full">
        ${label}
    </span>
    `;
}
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
<div onclick="openModal(${card.id})" class="p-4 border border-gray-200 border-t-4 ${borderColor} rounded-lg">

<div class="flex justify-between">
    <div><img src="${statusImg}"></div>

    <div class="py-1 px-4 rounded-full text-[14px] ${badgeColor}">
        ${card.priority}
    </div>
</div>

<h4 class="text-[14px] font-semibold my-3">${card.title}</h4>

<p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>
<div class="flex gap-2 my-3">
    ${labelsHTML}
</div>
<hr class="text-[#E4E4E7]">

<p class="text-[12px] text-[#64748B] mt-4">#${card.id} by ${card.author}</p>
<p class="text-[12px] text-[#64748B]">${card.updatedAt}</p>

</div>
`;

        cardContainer.appendChild(cardDiv);
    }
}
loadCard();

function openModal(id){

    const card = allCard.find(c => c.id === id);

    document.getElementById("modal-title").innerText = card.title;
    document.getElementById("modal-description").innerText = card.description;
    document.getElementById("modal-author").innerText = card.author;
    document.getElementById("modal-update").innerText = card.updatedAt;
    document.getElementById("modal-assignee").innerText = card.author;

    const statusBadge = document.getElementById("modal-status");

    if(card.status === "open"){
        statusBadge.innerText = "Opened";
        statusBadge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600";
    } else {
        statusBadge.innerText = "Closed";
        statusBadge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-600";
    }

    const priorityBadge = document.getElementById("modal-priority");
priorityBadge.innerText = card.priority;
    if(card.priority === "high"){
        priorityBadge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-600";
    }
    else if(card.priority === "medium"){
        priorityBadge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-600";
    }
    else{
        priorityBadge.className = "px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600";
    }

    const labelContainer = document.getElementById("modal-labels");
    labelContainer.innerHTML = "";

    for(let label of card.labels){
        labelContainer.innerHTML += `
        <span class="bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A] text-xs px-2 py-1 rounded-full">
            ${label}
        </span>
        `;
    }

    document.getElementById("modal").showModal();
}
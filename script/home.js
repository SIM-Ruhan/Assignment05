let allCard =[];
const allBtn = document.getElementById('all-filter-btn');
const openBtn = document.getElementById('open-filter-btn');
const closedBtn = document.getElementById('closed-filter-btn');

const toggleStyle =(id) => {
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
 displayCard(allCard);
}

else if(id == 'closed-filter-btn'){
    const closedCards = allCard.filter(card => card.status === "closed");
    displayCard(closedCards);
}
 else if(id == 'open-filter-btn') {
    const openCards = allCard.filter(card => card.status === "open");
    displayCard(openCards);
}
}





const loadCard = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        allCard = data.data;
        displayCard(data.data);
    });
  
}

const displayCard = (cards) => {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    for (let card of cards) {

        let borderColor = "border-t-green-500";
        let badgeColor = "bg-red-200 text-red-500";
        let statusImg = "./assets/Open-Status.png";

        if (card.priority === "medium") {
            badgeColor = "bg-yellow-200 text-yellow-600";
        }

        else if (card.priority === "low") {
            borderColor = "border-t-purple-500";
            badgeColor = "bg-gray-200 text-gray-500";
            statusImg = "./assets/Closed- Status .png";
        }

        const cardDiv = document.createElement("div");

        cardDiv.innerHTML = `
<div class="p-4 border border-gray-200 border-t-4 ${borderColor} rounded-lg">

<div class="flex justify-between">
    <div><img src="${statusImg}"></div>

    <div class="py-1 px-4 rounded-full text-[14px] ${badgeColor}">
        ${card.priority}
    </div>
</div>

<h4 class="text-[14px] font-semibold my-3">${card.title}</h4>

<p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>

<hr class="text-[#E4E4E7]">

<p class="text-[12px] text-[#64748B] mt-4">#${card.id} by ${card.author}</p>
<p class="text-[12px] text-[#64748B]">${card.date}</p>

</div>
`;

        cardContainer.appendChild(cardDiv);
    }
}
loadCard();


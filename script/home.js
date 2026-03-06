const allBtn = document.getElementById('all-filter-btn');
const openBtn = document.getElementById('open-filter-btn');
const closedBtn = document.getElementById('closed-filter-btn');

const toggleStyle =(id) => {
    allBtn.classList.remove("bg-[#4A00FF]" ,"text-white");
    openBtn.classList.remove("bg-[#4A00FF]" ,"text-white");
    closedBtn.classList.remove("bg-[#4A00FF]" ,"text-white");

    allBtn.classList.add("bg-white", "text-[#64748B]");
    openBtn.classList.add("bg-white", "text-[#64748B]");
    closedBtn.classList.add("bg-white", "text-[#64748B]");

    const selected = document.getElementById(id);
       selected.classList.remove("bg-white", "text-[#64748B]");
    selected.classList.add("bg-[#4A00FF]" ,"text-white");

}

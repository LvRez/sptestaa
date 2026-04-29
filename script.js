// --- CONFIGURATION & LINKS ---
async function loadLinks() {
    try {
        const response = await fetch('links.json');
        const data = await response.json();
        const container = document.getElementById('categories');

        data.forEach(section => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'flex flex-col';
            
            let linksHTML = `
                <h2 class="text-[10px] uppercase tracking-[0.3em] text-[#565f89] font-bold mb-6 flex items-center">
                    <span class="w-4 h-[1px] bg-[#565f89] mr-3"></span>
                    ${section.category}
                </h2>
                <div class="space-y-2">
            `;

            section.links.forEach(link => {
                const iconSrc = link.icon ? link.icon : `https://www.google.com/s2/favicons?sz=128&domain=${new URL(link.url).hostname}`;
                linksHTML += `
                    <a href="${link.url}" class="link-card glass flex items-center p-3 rounded-xl group">
                        <img src="${iconSrc}" class="w-4 h-4 mr-4 opacity-60 group-hover:opacity-100 transition-all" alt="">
                        <span class="text-xs font-medium tracking-wide text-[#a9b1d6] group-hover:text-white transition-colors">${link.name}</span>
                    </a>
                `;
            });

            linksHTML += `</div>`;
            categoryDiv.innerHTML = linksHTML;
            container.appendChild(categoryDiv);
        });
    } catch (e) { console.error("Check links.json format", e); }
}

// --- CLOCK & DATE ---
function updateClock() {
    const now = new Date();
    // 12-Hour Format
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', minute: '2-digit', hour12: true 
});
    
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric' 
    });
}

// --- CALENDAR ---
function renderCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const today = now.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('month-name').textContent = monthNames[month];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = ''; // Clear

    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    dayLabels.forEach(day => {
        const el = document.createElement('div');
        el.className = 'font-bold text-[#3d4455]';
        el.textContent = day;
        grid.appendChild(el);
    });

    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        if (day === today) dayEl.className = 'today';
        grid.appendChild(dayEl);
    }
}

// --- SEARCH ENGINE SWITCHER ---
document.getElementById('engine-select').addEventListener('change', (e) => {
    document.getElementById('search-form').action = e.target.value;
});

// Init
loadLinks();
renderCalendar();
setInterval(updateClock, 1000);
updateClock();

// --- QUOTE SYSTEM ---
const quotes = [
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quote-text').textContent = `"${quote.text}"`;
    document.getElementById('quote-author').textContent = `— ${quote.author}`;
}

// Initialize quote on page load
showRandomQuote();

// Force focus on search input
document.getElementById('search-input').focus();

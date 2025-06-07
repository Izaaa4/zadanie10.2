import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button" class="bg-blue-500 px-4" ></button>
    </div>
  </div>
  
`
setupCounter(document.querySelector('#counter'))

const SUPABASE_URL = "https://ghdlclqresgocswlhtwc.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGxjbHFyZXNnb2Nzd2xodHdjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM0NzM3NywiZXhwIjoyMDYzOTIzMzc3fQ.nnAlH2g4ojhqN9uYyostGAdEjWmW89upQJUWpFS27yI";

async function fetchArticles(orderBy = "created_at", orderDirection = "asc") {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*&&order=${orderBy}.${orderDirection}`, {
        headers: {
            "apiKey": API_KEY,
            "Authorization": `Bearer ${API_KEY}`
        }
    });
    const articles = await response.json();
    renderArticles(articles);
}

function renderArticles(articles) {
    const list = document.getElementById("articles-list");
    list.innerHTML = "";
    articles.forEach(article => {
        const formattedDate = formatDate(article.created_at);
        list.innerHTML += `<div>
            <h2>${article.title}</h2>
            <h3>${article.subtitle}</h3>
            <p><strong>Autor:</strong> ${article.author}</p>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p>${article.content}</p>
        </div>`;
    });
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("pl-PL", { day: '2-digit', month: '2-digit', year: 'numeric' });
}

document.getElementById("sort-select").addEventListener("change", function() {
    const [orderBy, orderDirection] = this.value.split(".");
    fetchArticles(orderBy, orderDirection);
});

document.getElementById("article-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const newArticle = {
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        author: formData.get("author"),
        content: formData.get("content"),
        created_at: formData.get("created_at") || new Date().toISOString()
    };

    await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
        method: "POST",
        headers: {
            "apikey": API_KEY,
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArticle)
    });

    fetchArticles();
});

// Pobierz artykuły przy pierwszym uruchomieniu
fetchArticles();

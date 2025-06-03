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


async function fetchArticles() {
    const response = await fetch('https://ghdlclqresgocswlhtwc.supabase.co/rest/v1/articles', {
        headers: {
            'apiKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGxjbHFyZXNnb2Nzd2xodHdjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM0NzM3NywiZXhwIjoyMDYzOTIzMzc3fQ.nnAlH2g4ojhqN9uYyostGAdEjWmW89upQJUWpFS27yI'
        }
    });
    const articles = await response.json();
    console.log(articles); // Sprawdź, co dokładnie zwraca Supabase

    if (!Array.isArray(articles)) {
        console.error('Dane nie są tablicą!', articles);
        return;
    }

    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <h3>${article.subtitle}</h3>
            <p><strong>Autor:</strong> ${article.author}</p>
            <p><strong>Data:</strong> ${new Date(article.created_at).toLocaleDateString()}</p>
            <p>${article.content}</p>
            <hr>
        `;
        container.appendChild(articleElement);
    });
}
fetchArticles();



document.getElementById('articleForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;


    try {
        await NewArticle(title, subtitle, author, content);
        alert('Article created successfully!');
        document.getElementById('articleForm').reset();
    } catch (error) {
        console.error('Error creating article:', error);
        alert('Failed to create article. Please try again.');
    }
}); 





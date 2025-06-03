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
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGxjbHFyZXNnb2Nzd2xodHdjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM0NzM3NywiZXhwIjoyMDYzOTIzMzc3fQ.nnAlH2g4ojhqN9uYyostGAdEjWmW89upQJUWpFS27yI'
        }
    });
    const data = await response.json();
    console.log(data);
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





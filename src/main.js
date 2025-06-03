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

async function addArticle(event) {
    event.preventDefault();
    const articleData = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value
    };
    
    const response = await fetch('https://ghdlclqresgocswlhtwc.supabase.co/rest/v1/articles', {
        method: 'POST',
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGxjbHFyZXNnb2Nzd2xodHdjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM0NzM3NywiZXhwIjoyMDYzOTIzMzc3fQ.nnAlH2g4ojhqN9uYyostGAdEjWmW89upQJUWpFS27yI',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
    });
    
    const result = await response.json();
    console.log(result);
}
document.getElementById('articleForm').addEventListener('submit', addArticle);


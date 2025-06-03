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





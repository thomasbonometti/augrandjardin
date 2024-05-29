document.addEventListener('DOMContentLoaded', function () {
  fetch('https://thomasbonometti.github.io/augrandjardin/products.json') // Remplacez par le chemin correct vers votre fichier JSON sur GitHub Pages
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('products-container');
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productImage = document.createElement('img');
        productImage.src = product['IMG']; // Assurez-vous que le champ image est correctement nommé
        productCard.appendChild(productImage);

        const productName = document.createElement('h2');
        productName.textContent = product['Nom du produit'];
        productCard.appendChild(productName);

        const productDescription = document.createElement('p');
        productDescription.textContent = product['Etiquette'];
        productCard.appendChild(productDescription);

        container.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error fetching the JSON:', error));
});

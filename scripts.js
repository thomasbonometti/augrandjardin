document.addEventListener('DOMContentLoaded', function () {
  fetch('https://drive.google.com/uc?id=1QNpwJqwv2-bqZB_8sT116_azUvAMvOhm&export=download')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('products-container');
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productImage = document.createElement('img');
        productImage.src = product['Image'];
        productCard.appendChild(productImage);

        const productName = document.createElement('h2');
        productName.textContent = product['Nom du produit'];
        productCard.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = `Prix : ${product['Prix']}`;
        productCard.appendChild(productPrice);

        const productDescription = document.createElement('p');
        productDescription.textContent = product['Description'];
        productCard.appendChild(productDescription);

        container.appendChild(productCard);
      });
    });
});

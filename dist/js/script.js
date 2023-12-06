
class BookList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
    this.render();
    this.initAction();
  }


  render() {
    const list = document.querySelector('.books-list');
    const template = document.querySelector('#template-book').innerHTML;
    let html = '';
    for (const book of dataSource.books) {
      const bookHTML = template
        .replaceAll('{{ name }}', book.name)
        .replace('{{ price }}', book.price)
        .replace('{{ id }}', book.id)
        .replace('{{ image }}', book.image)
        .replace('{{ rating }}', book.rating)
        .replace('{{ ratingBgc }}', this.determineRatingBgc(book.rating))
        .replace('{{ ratingWidth }}', book.rating * 10);
      html = html + bookHTML;
    }
    // console.log(html);
    list.innerHTML = html;
  }

  initAction() {
    const thisBookList = this;
    const list = document.querySelector('.books-list');
    const form = document.querySelector('.filters');
    form.addEventListener('click', function (event) {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        // Jeśli tak, pokaż wartość (value) checkboxa w konsoli
        const checkboxValue = event.target.value;
        console.log('Kliknięto na checkboxa z wartością:', checkboxValue);
        if (thisBookList.filters.includes(checkboxValue)) {
          const index = thisBookList.filters.indexOf(checkboxValue);
          thisBookList.filters.splice(index, 1);
        } else {
          thisBookList.filters.push(checkboxValue);
        }
        thisBookList.filterBooks();
      }
    });
    list.addEventListener('dblclick', function (event) {
      event.preventDefault();
      console.log(event.target.offsetParent);
      const element = event.target.offsetParent;
      if (element.classList.contains('book__image')) {
        const id = element.dataset.id;
        if (thisBookList.favoriteBooks.includes(id)) {
          element.classList.remove('favorite');
          thisBookList.favoriteBooks = thisBookList.favoriteBooks.filter((bookId) => bookId != id);
        } else {
          element.classList.add('favorite');
          thisBookList.favoriteBooks.push(id);
        }
      }
    });
  }


  filterBooks() {
    for (let book of dataSource.books) {
      let show = true;
      if (this.filters.length) {
        for (let filter of this.filters) {
          if (!book.details[filter]) {
            show = false;
            break;
          }
        }
      }
      const bookElem = document.querySelector('[data-id="' + book.id + '"]');
      if (show) {
        bookElem.classList.remove('hidden');
      } else {
        bookElem.classList.add('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6)
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

    if (rating > 6 && rating <= 8)
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

    if (rating > 8 && rating <= 9)
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

    if (rating > 9)
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

  }

}
//const form = document.querySelector('.filters');
new BookList();

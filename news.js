const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>showCatagories(data.data))
}

const showCatagories = data => {
    // console.log(data)
    // capture categories container to append all the category links
    const categoriesContainer = document.getElementById('catagories-container');
    data.news_category?.forEach(singleCategory=>{
        categoriesContainer.innerHTML += `<a class="nav-link" href="#" 
        onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory?.category_name}')">${singleCategory?.category_name}</a>`
    })
}

const fetchCategoryNews = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>showAllNews(data.data, category_name))
}

const showAllNews = (data, category_name) => {
    console.log(data, category_name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news')
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        newsContainer.innerHTML += 
        `<div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${singleNews.title}</h5>
              <p class="card-text">${singleNews.details.slice(0,200)}...</p>
              <div class="card-footer border-0 bg-body m d-flex  justify-content-between">
              <div class="d-flex gap-2">
                <div>
                    <img src="${singleNews.author.img}" class="img-fluid rounded-circle" alt="" height="40" width="40"/>
                </div>
                <div>
                    <p class="m-0 p=0">${singleNews.author.name}</p>
                    <p class="m-0 p=0">${singleNews.author.published_date}</p>
                </div>
              </div>
              <div class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-eye"></i>
                    <p class="m-0 p=0">${singleNews.total_view}</p>
              </div>
              <div>
              <i class="fa-solid fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              </div>
              <div>
              <i class="fa-solid fa-arrow-right"></i>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    })
}
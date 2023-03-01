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
}
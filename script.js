const APIKey = "276b6fd809db4b6c80d79b8d299af11e";
const blogContainer = document.querySelector("#blog-container");
const searchFeild = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

// Fetch news
async function fetchRandomNews(){

    try{

        const APIURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${APIKey}`;
        let response = await fetch(APIURL);
        let data = await response.json();
        console.log(data);
        return data.articles;
       

    }catch(err)

    {
        console.error(`someting wrong has happened:${err}`);
        return [];
    }



}

// Fetch news by query
async function fetchNewsQuery(query)
{
    try{

        const APIURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${APIKey}`;
        let response = await fetch(APIURL);
        let data = await response.json();
        
        return data.articles;
       

    }catch(err)

    {
        console.error(`someting wrong has happened when fetching search data:${err}`);
        return [];
    }


}

// Click on search button 
searchButton.addEventListener("click",async ()=>{

    let query = searchFeild.value.trim();
    console.log(query);
    if(query != ""){

        try{

            let articles = await fetchNewsQuery(query); 
            console.log(articles);
            displayBlogs(articles);

        }
        catch(err){

            console.log(`Error fetching search:${err}`);

        }

    }


});


// Binding data to template
function displayBlogs(articals){

   
    blogContainer.innerHTML = "";

    

    
    
    
    articals.forEach( artical => {
        let blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        let image = document.createElement("img");
        image.src = artical.urlToImage;
        image.alt = artical.title;
        let title = document.createElement("h2");
        
        let truncateTitle = artical.title.length > 30 ? artical.title.slice(0,30)+"...."  : artical.title;
        title.textContent = truncateTitle;
        let description = document.createElement("p");
        if(artical.description === null)
        {artical.description="Hello";}
        let truncatedDes = artical.description.length > 120 ? artical.description.slice(0,120)+"..." : artical.description;
        description.textContent = artical.description;

        blogCard.appendChild(image);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(artical.url,"_blank");

        });

        blogContainer.appendChild(blogCard);

    });



}


// Auto invoke function 

(async ()=>{

    try{

        let listArticals = await fetchRandomNews();
        
        displayBlogs(listArticals);

    }
    catch(err){

        console.error(`someting wrong has happened:${err}`);

    }
})();





var links=$(".nav-link");
var term;
var news;
var category='general';
var country='Us';

getNews();


// start Navbar menue 
$(links).click(function(){
    category= $(this).html();
    getNews();
})
// End Navbar menue 


function getNews()
{
        var request;

        if(window.XMLHttpRequest)
        {
            request=new XMLHttpRequest();
        }
        else{
            request= new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url=`https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=d34d49ce3a794aca80d1ae821239b0eb`;
        request.open("GET",url);
        request.onreadystatechange = function()
        {
            if(request.status == 200 && request.readyState == 4)
            {
                news=JSON.parse(request.response);
                news=news.articles;
                displayNews();

                //read More
                $(".button").click(function(){
                       $(this).siblings($(".header"),$(".text")).toggleClass("editHeight");
                });
                    
                    
            }
        }
        request.send();
}


function displayNews()
{
    let temp=``;
    for(let i=0;i<news.length;i++)
    {
        if(news[i].source.name!='Aljazeera.net'&& news[i].source.name!='Shorouknews.com'&& 
        news[i].source.name!='Alarabiya.net'&& news[i].source.name!='Al Jazeera English'
        && news[i].source.name!='Oann.com')
        {
            temp +=`<div class="col-md-3 mb-2">
                            <div class="new">
                                <img src=`+news[i].urlToImage+`>
                                    <span>`+news[i].source.name+`</span>
                                    <h4 class="header editHeight">`+news[i].title+`</h4>
                                    <p class ="text text-muted editHeight">`+news[i].description+`</p>
                                    <button class="button btn-info">Read More</button>
                            </div>
                    </div>`               
        }
    }
    $(".news #newsRow").html(temp);

}


// Start submit search
$("#myBtn").click(function () { 
    term = $("#searchInp").val();
    globalSearch();
});
// End submit search


// Start Choose Country
$("#countryOptions ul li").click(function()
{
    if($(this).html()=="United States")
    {
        country="Us"
        getNews();
    }
    else if($(this).html()=="Germany")
    {
        country="de";
        getNews();
    }
    else
    {
        country=$(this).html().substr(0,2);
        getNews();
    }
})

let boxWidth= $("#countryOptions").outerWidth();

$("#options i").click(function()
{
    if($("#options").css("left")=='0px')
        {
            $("#options").animate({left:`-${boxWidth}`},700)
        }
    else{
         $("#options").animate({left:`0px`},700)
    }
   
})

//End Choose Country


//start Global Search
function globalSearch()
{
    var request;

    if(window.XMLHttpRequest)
    {
        request=new XMLHttpRequest();
    }
    else{
        request= new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url=`https://newsapi.org/v2/everything?q=`+term+`&from=2019-09-08&sortBy=publishedAt&apiKey=36a39b9f650a45ff98da020117684bab`;
    request.open("GET",url);
    request.onreadystatechange = function()
    {
        if(request.status == 200 && request.readyState == 4)
        {
            news=JSON.parse(request.response);
            news=news.articles;
            displayNews();

            //read More
            $(".button").click(function(){
                   $(this).siblings($(".header"),$(".text")).toggleClass("editHeight");
            });     
        }
    }
    request.send();
}
//End Global Search










const imgSizes = {
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"]
};

const app = {
    active: "home",
    page: [],
    url: "",
    API_KEY: "cdcd019cddc314b00c037a97ca80b1b6",
    apiURL: "https://api.themoviedb.org/3/search/person?",
    imgURL: "https://image.tmdb.org/t/p",
    castURL: "https://api.themoviedb.org/3/",
    page:[],
    baseURL: null,
    actorData: null,
    moviesData: null,
    movieData: null,
    castData: null,
    searchType: null,
    serachActorNum: null,
    clickActorArray: null,
    clickMovieArray: null,
    clickMovieID: null,
    Moviemedia: null,
    castURL2: null,
    // castFormal: app.castURL + app.media +"/"+ app.clickMovieID +"/credits?api_key="+ app.API_KEY+"&language=en-US",
    init: () => {
        app.pages = document.querySelectorAll(".page");
        app.addListeners();
        //get the base url to use in the app
        app.baseURL = location.href.split("#")[0];  
        // let hash = location.hash;
        //check for current url hash

        //no url so use our default
        history.replaceState({}, app.active, `${app.baseURL}#${app.active}`);
        app.transPage(app.active);
        
        //handle the back button
        window.addEventListener("popstate", app.poppy);
        //use it will stay in the page and back to last order
    },
    addListeners: function(){
        document.getElementById("search").addEventListener("click", app.toGoActors);
        document.getElementById("home").addEventListener("keypress", app.pressEnter);
        let fab = document.querySelectorAll(".fab");
        for(let i=0;i<fab.length;i++){
            fab[i].addEventListener("click", app.toGoHome);
        }
    },
    toGoHome: ev => {
        let actors = document.getElementById('actorsCards');
        actors.remove();
        ev.preventDefault();
        ev.stopPropagation();
        let link = ev.target;
        let target = link.getAttribute("data-href");
        //update URL
        history.pushState({}, target, `${app.baseURL}#${target}`);
        //change the display of the "page"
        app.transPage(target);
        
    },
    toGoMovies: () =>{
        app.getMoviesPage;
        app.nav;
        
    },
    toGoActors: (ev) =>{
        ev.preventDefault();
        ev.stopPropagation();
        let link = ev.target;
        let target = link.getAttribute("data-href");
        if (target == null) {
            target = 'actors';
        }
        //update URL
        history.pushState({}, target, `${app.baseURL}#${target}`);
        //change the display of the "page"
        app.transPage(target);
        app.getActorData()
        .then(() => {
            app.getActorsPage(app.actorData);
            });
        },
    nav: ev => {
        ev.preventDefault();
        ev.stopPropagation();
        let link = ev.target;
        let target = link.getAttribute("data-href");
        //update URL
        history.pushState({}, target, `${app.baseURL}#${target}`);
        //change the display of the "page"
        app.transPage(target);

        
        //use switch case with target for page specific things
        //IT DOESN'T WORK WHEN TYPE SPACE***
        // if(location.hash == '#home'){
        //     app.getActorData;
        //     app. getActorsPage;

        // }
    },
    transPage: target => {
        document.querySelector(".active").classList.remove("active");
        document.querySelector(`#${target}`).classList.add("active");
    },
    pressEnter: (en) =>{
            if (en.key === 'Enter') {
                en.target.attributes['data-href'] = 'actors'
                app.toGoActors(en);
            }
        },
    poppy: ev => {
        //get the id
        let target = location.hash.replace("#", "");
        app.transPage(target);
    },
    getMoviesData:() => {
        
    },
    getActorData: () => {
        app.searchType = document.getElementById('input').value;
        app.url = app.apiURL + 'api_key=' + app.API_KEY + '&language=en-US&query=' + app.searchType + '&page=1&include_adult=true`';
        return fetch(app.url)
        .then(response => response.json())
        .then(data => { 
            app.actorData = data; //save the data in a global location inside APP
        })
        .catch(app.badThings);
    },
    badThings: (err)=>{
        alert(err.message);
    },
    getActorsPage: data => {
        let actors = document.getElementById('actorsNum');
        app.serachActorNum = data.results.length;
        let p = document.createElement('p');
        if(data.total_results >= 10000){
            p.textContent = "*"+app.searchType+ "*" + " has " + ' ' + data.total_results + "+ results. ";
            actors.appendChild(p);
        }else{
            p.textContent = "*"+app.searchType+ "*" + " has " + ' ' + data.total_results + "  results. " ;
            actors.appendChild(p);
        }
        let div = document.createElement('div');
        let actorsList = document.getElementById('actorsList');
        //create a Div in 'actorsList' called '.actorsCard'
        div.setAttribute('id', 'actorsCards');     
        actorsList.appendChild(div); 
        for(let i =0;i < data.results.length;i++){

            
            let actorsCards = document.getElementById("actorsCards");
            let div4 = document.createElement('div');
            //create a Div in 'actorsList' called '.actorsCard'
            div4.setAttribute('class', 'Card');     
            actorsCards.appendChild(div4); 
            //create a Div is called '.actorsPortrait' in 'actorsCard' 
            let div2 = document.createElement('div');
            let actorsCard = document.querySelectorAll('.Card')[i];
            div2.setAttribute('class','actorsPortrait');
            actorsCard.appendChild(div2);       
            //add img tag in '.actorsPotrait' div
            let actorsPortrait = document.querySelectorAll('.actorsPortrait')[i];
            let img = document.createElement('img');
            img.src = app.imgURL + '/' + imgSizes.profile_sizes[2] + data.results[i].profile_path; 
            img.alt = "Actors Portrait";
            actorsPortrait.appendChild(img);
            let div3 = document.createElement('div');
            let actorsCard2 = document.querySelectorAll('.Card')[i];
            div3.setAttribute('class','actorsInfo');
            actorsCard2 .appendChild(div3);  
            //add actor infomation in 'actorsInfo'
            let actorsInfo = document.querySelectorAll('.actorsInfo')[i];
            let h3 = document.createElement('h3');
            h3.textContent = data.results[i].name; 
            h3.setAttribute('data-href', 'movies'); 
            h3.setAttribute('class', `No. ${+ i}`); 
            h3.setAttribute('id', "nameButton"); 
            actorsInfo.appendChild(h3);
            document.querySelectorAll("h3")[i].addEventListener("click", (ev)=>{
                app.clickActorArray = app.actorData.results[i];
                document.getElementById('actorName').textContent = app.clickActorArray.name;
                app.nav(ev);
                app.getMoviesPage(ev);
            });

            
            let actorsInfo4 = document.querySelectorAll('.actorsInfo')[i];
            let p3 = document.createElement('p');
            p3.textContent = "id:  " + data.results[i].id;
            actorsInfo4.appendChild(p3);
            
            let actorsInfo2 = document.querySelectorAll('.actorsInfo')[i];
            let p = document.createElement('p');
            p.textContent = "position:  " + data.results[i].known_for_department;
            actorsInfo2.appendChild(p);
            
            let actorsInfo3 = document.querySelectorAll('.actorsInfo')[i];
            let p2 = document.createElement('p');
            p2.textContent = "popularity:  " + data.results[i].popularity;
            actorsInfo3.appendChild(p2);
        }   
    },
    getMoviesPage: data => {
        // clickActorArray
        let moviesList = document.getElementById("moviesList");
        let div = document.createElement('div');
        //create a Div in 'actorsList' called '.actorsCard'
        div.setAttribute('id', 'divForDelete'); 
        
        moviesList.appendChild(div); 
        for(let i =0;i < app.clickActorArray.known_for.length;i++){
            if(app.clickActorArray.known_for[i].media_type == "movie"){
                let divForDelete = document.getElementById("divForDelete");
                let div5 = document.createElement('div');
                div5.setAttribute('class', 'moviesCard');     
                divForDelete.appendChild(div5);
    
                let moviesCard = document.querySelectorAll('.moviesCard')[i];
                let img2 = document.createElement('img');
                img2.src = app.imgURL + '/' + imgSizes.poster_sizes[2] + app.clickActorArray.known_for[i].poster_path; 
                img2.alt = "Movies Poster";
                moviesCard.appendChild(img2);
                
                let div6 = document.createElement('div');
                div6.setAttribute('class', 'moviesInfo'); 
                moviesCard.appendChild(div6);
    
                let moviesInfo = document.querySelectorAll(".moviesInfo")[i];
                let h1 = document.createElement('h1');
                h1.setAttribute('data-href', 'movie');
                h1.textContent = app.clickActorArray.known_for[i].original_title;
                moviesInfo.appendChild(h1);
                
                let p3 = document.createElement('p');            
                p3.textContent = "TYPE: " + app.clickActorArray.known_for[i].media_type;
                moviesInfo.appendChild(p3);
                let p2 = document.createElement('p');
                p2.textContent = "RELEASE DATE: " + app.clickActorArray.known_for[i].release_date;
                moviesInfo.appendChild(p2);
                let p4 = document.createElement('p');
                p4.textContent = "VOTE AVERAGE: " + app.clickActorArray.known_for[i].vote_average;
                moviesInfo.appendChild(p4);

                document.querySelectorAll("h1")[i].addEventListener("click", (ev)=>{
                    app.clickMovieArray = app.clickActorArray.known_for[i];
                    document.getElementById('movieName').textContent = app.clickActorArray.known_for[i].original_title;
                    app.nav(ev);
                    app.clickMovieID = app.clickActorArray.known_for[i].id;
                    app.Moviemedia = app.clickActorArray.known_for[i].media_type;
                    app.getCastData().then(() => {
                        app.getMoviePage(ev);
                    });
                });
            } else {
                let divForDelete = document.getElementById("divForDelete");
                let div7 = document.createElement('div');
                div7.setAttribute('class', 'moviesCard');     
                divForDelete.appendChild(div7);
    
                let moviesCard = document.querySelectorAll('.moviesCard')[i];
                let img2 = document.createElement('img');
                img2.src = app.imgURL + '/' + imgSizes.poster_sizes[2] + app.clickActorArray.known_for[i].poster_path; 
                img2.alt = "Movies Poster";
                moviesCard.appendChild(img2);
                
                let div6 = document.createElement('div');
                div6.setAttribute('class', 'moviesInfo');    
                moviesCard.appendChild(div6);
    
                let moviesInfo = document.querySelectorAll(".moviesInfo")[i];
                let h1 = document.createElement('h1');
                h1.setAttribute('data-href', 'movie');
                h1.textContent = app.clickActorArray.known_for[i].original_name;
                moviesInfo.appendChild(h1);
                
                let p3 = document.createElement('p');            
                p3.textContent = "TYPE " +app.clickActorArray.known_for[i].media_type;
                moviesInfo.appendChild(p3);
                let p2 = document.createElement('p');
                p2.textContent = "FIRST DATE: " + app.clickActorArray.known_for[i].first_air_date;
                moviesInfo.appendChild(p2);
                let p4 = document.createElement('p');
                p4.textContent = "VOTE AVERAGE: "+app.clickActorArray.known_for[i].vote_average;
                moviesInfo.appendChild(p4);

                document.querySelectorAll("h1")[i].addEventListener("click", (ev)=>{
                    app.clickMovieArray = app.clickActorArray.known_for[i];
                    document.getElementById('movieName').textContent = app.clickActorArray.known_for[i].original_name;
                    app.nav(ev);
                    app.clickMovieID = app.clickActorArray.known_for[i].id;
                    app.Moviemedia = app.clickActorArray.known_for[i].media_type;
                    app.getCastData(ev)
                        .then((ev) => { 
                            app.showCast(ev); 
                            app.getMoviePage(ev);
                        });
                });
            }
        }
    },
    getMoviePage: (ev) => {
        let moviepage = document.getElementById("moviepage");
        let div9 = document.createElement('div');
        div9.setAttribute('id', 'divForDelete2'); 
        moviepage.appendChild(div9);

        let divForDelete2 = document.getElementById("divForDelete2");
        
        let img3 = document.createElement('img');
        img3.src = app.imgURL + '/' + imgSizes.poster_sizes[4] + app.clickMovieArray.poster_path; 
        img3.alt = "Movie Poster";
        img3.setAttribute('class', 'posterSize'); 
        divForDelete2.appendChild(img3);

        let div10 = document.createElement('div');  
        div10.setAttribute('class', 'detials'); 
        divForDelete2.appendChild(div10);

        let detials = document.querySelector(".detials");

        if(app.clickMovieArray.media_type == "movie"){
            let p3 = document.createElement('p');            
            p3.textContent = "TYPE: " + app.clickMovieArray.media_type;
            detials.appendChild(p3);
            let p2 = document.createElement('p');
            p2.textContent = "RELESE DATE: " + app.clickMovieArray.release_date;
            detials.appendChild(p2);
            let p4 = document.createElement('p');
            p4.textContent = "VOTE AVERAGE: " + app.clickMovieArray.vote_average;
            detials.appendChild(p4);
            let p5 = document.createElement('p');
            p5.textContent = "OVERVIEW: "+app.clickMovieArray.overview;
            detials.appendChild(p5);
        }else{
            let p3 = document.createElement('p');            
            p3.textContent = "TYPE: " + app.clickMovieArray.media_type;
            detials.appendChild(p3);
            let p2 = document.createElement('p');
            p2.textContent = "FIRST DATE: " + app.clickMovieArray.first_air_date;
            detials.appendChild(p2);
            let p4 = document.createElement('p');
            p4.textContent = "VOTE AVERAGE: "+app.clickMovieArray.vote_average;
            detials.appendChild(p4);
            let p5 = document.createElement('p');
            p5.textContent = "OVERVIEW: "+app.clickMovieArray.overview;
            detials.appendChild(p5);
        }

        
        for(i=0;i<app.castData.cast.length;i++){
            let div11 = document.createElement('div');
            div11.setAttribute('class', "castCard");
            detials.appendChild(div11);
            let castCard = document.querySelectorAll(".castCard")[i];
            let img4 = document.createElement("img");
            img4.src = app.imgURL + '/' + imgSizes.profile_sizes[2] + app.castData.cast[i].profile_path; 
            img4.alt = "Cast Portrait";
            castCard.appendChild(img4);
            let p2 = document.createElement('p');
            p2.textContent = "CHARACTER: " + app.castData.cast[i].character;
            castCard.appendChild(p2);
            let p4 = document.createElement('p');
            p4.textContent = "NAME: " + app.castData.cast[i].name;
            castCard.appendChild(p4);
        }
    },
    showCast: () => {
        let div11 = document.createElement('div');
        div11.setAttribute('class', "castCard");

        let detials2 = document.querySelector(".detials2");
        detials2.appendChild(div11);
        
        let castCard = document.querySelector(".castCard");
        console.log(app.castData);
        for(i=0;i<app.castData.cast.length;i++){
            let img4 = document.createElement("img");
            img4.src = app.imgURL + '/' + imgSizes.profile_sizes[2] + spp.castData[i].profile_path; 
            img.alt = "Cast Portrait";
            castCard.appendChild(img4); 

            let div12 = document.createElement('div');
            div12.getAttribute("div","castInfo");
            castCard.appendChild(div12);
            let cs = document.querySelectorAll(".castInfo")[i];
            
            let p2 = document.createElement('p');
            cs.textContent = "CHARACTER: " + spp.castData[i].character;
            castCard.appendChild(p2);
            let p4 = document.createElement('p');
            cs.textContent = "NAME: " + spp.castData[i].name;
            castCard.appendChild(p4);
        }
    },
    getCastData (){
        app.castURL2 = app.castURL + app.Moviemedia + "/" + app.clickMovieID + "/credits?api_key=" + app.API_KEY + "&language=en-US";
        return fetch(app.castURL2)
        .then(response => response.json())
        .then(data => { 
            app.castData = data; //save the data in a global location inside APP
        })
        .catch(app.badThings);
    }
}
document.addEventListener("DOMContentLoaded", app.init);
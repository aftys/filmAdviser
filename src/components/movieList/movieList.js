import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Cards from "../card/card"
import SearchBar from "../searchbar/SearchBar"
import BasicSelect from "../DropDownList/DropDownList"

const MovieList = () => {

    const API_KEY = 'api_key=56b8bcaf3aa4034a20d84c1034f95076';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const searchURL = BASE_URL + '/search/movie?' + API_KEY;

    const form = document.getElementById('form');




    // function getMovies(url) {
    //     lastUrl = url;
    //       fetch(url).then(res => res.json()).then(data => {
    //           console.log(data.results)
    //           setMovieList(data.results);

    //       })

    //   }

    const [movieList, setMovieList] = useState([])
    const [search, setSearch] = useState("")

    const { type } = useParams()

    useEffect(() => {
        getData(null)
    }, [])

    useEffect(() => {
        getData(null)
    }, [type])


    const getData = (URL) => {
        URL ? (
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    setMovieList(data.results)

                    console.log('haaahya data', data.results)
                }
                )



        ) : (
            fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                .then(res => res.json())
                .then(data => setMovieList(data.results))
        )
    }


    const genres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]

    const years = [
        {
            "id": 2000,
            "name": "2000"
        },
        {
            "id": 2001,
            "name": "2001"
        },
        {
            "id": 2002,
            "name": "2002"
        },
        {
            "id": 2003,
            "name": "2003"
        },
        {
            "id": 2004,
            "name": "2004"
        },
        {
            "id": 2005,
            "name": "2005"
        },
        {
            "id": 2006,
            "name": "2006"
        },
        {
            "id": 2007,
            "name": "2007"
        },
        {
            "id": 2008,
            "name": "2008"
        },
        {
            "id": 2009,
            "name": "2009"
        },
        {
            "id": 2010,
            "name": "2010"
        },
        {
            "id": 2011,
            "name": "2011"
        },
        {
            "id": 2012,
            "name": "2012"
        },
        {
            "id": 2013,
            "name": "2013"
        },
        {
            "id": 2014,
            "name": "2014"
        },
        {
            "id": 2015,
            "name": "2015"
        },
        {
            "id": 2016,
            "name": "2016"
        },
        {
            "id": 2017,
            "name": "2017"
        },
        {
            "id": 2018,
            "name": "2018"
        },
        {
            "id": 2019,
            "name": "2019"
        },
        {
            "id": 2020,
            "name": "2020"
        },
        {
            "id": 2021,
            "name": "2021"
        },
        {
            "id": 2022,
            "name": "2022"
        },
        {
            "id": 2023,
            "name": "2023"
        }
    ];

    const languages = [
        {
            "id": "en",
            "name": "English"
        }, {
            "id": "fr",
            "name": "French"
        }, {
            "id": "de",
            "name": "German"
        }, {
            "id": "it",
            "name": "Italian"
        }, {
            "id": "es",
            "name": "Spanish"
        }
    ]
    const adults = [
        {
            "id": "true",
            "name": "yes"
        }, {
            "id": "false",
            "name": "no"
        }]

    const [genre, setGenre] = useState(0);
    const [year, setYear] = useState(2000)
    const [language, setLanguage] = useState("en")
    const [adult, setAdult] = useState("true")

    async function filterFunc() {
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=56b8bcaf3aa4034a20d84c1034f95076&with_genres=" + genre + "&primary_release_year=" + year + "&with_original_language=" + language + "&include_adult=" + adult);
        const data = await response.json();
        setMovieList(data.results);
        console.log("waaaaa movie", movieList);
    }
    
    function HandleSub(e) {
        e.preventDefault();

        const searchTerm = search;
        // selectedGenre=[];
        // setGenre();
        if (searchTerm) {
            getData(searchURL + '&query=' + searchTerm)
        } else {
            getData(API_URL);
        }

    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            {/* <form  id="form" onSubmit={HandleSub}> */}
            {/* <input type="text" placeholder="Search" id="search" class="search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/> */}
            {/* <input type="submit">hdhdhd</input> */}
            <div className="container_filter">
                <form id="filter">
                    <BasicSelect setFilter={setGenre} arrayFilters={genres} name={"genre"} />
                    <BasicSelect setFilter={setAdult} arrayFilters={adults} name={"adult"} />
                    <BasicSelect setFilter={setYear} arrayFilters={years} name={"annee"} />
                    <BasicSelect setFilter={setLanguage} arrayFilters={languages} name={"langue"} />
                    <Button onClick={filterFunc} variant="contained">filter</Button>
                </form>

                <SearchBar HandleSub={HandleSub} setMovieName={setSearch} />
            </div>

            {/* </form> */}
            <div className="list__cards">
                {
                    movieList ?
                        movieList.map(movie => (
                            <Cards movie={movie} />
                        ))
                        : <div>   no movies to show just wait         </div>






                }
            </div>
        </div>
    )
}

export default MovieList
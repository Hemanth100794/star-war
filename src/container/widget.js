import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Movies from '../components/movies'
import Characters from '../components/persona'

const Widget = props => {
    const [characterApiData, setCharacterApiData] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [selecList, setSelecList] = useState('');
    const [films, setFilms] = useState([]);
    const [lastFilm, setLastFilm] = useState({});
    const [dataloaded, setDataloaded] = useState(false);
    
    const handleCharacterChange = (event) => {
        if (event.target.value) {
            loadMovieData(event.target.value)
            setSelecList(event.target.value)
        }
        else {
            setSelecList('')
            setFilms([])
            setLastFilm({})
        }
    }

    const loadMovieData = async (characterId) => {
        const characterData = characterApiData.find(t => t.id === parseInt(characterId));
        if (CharacterData && characterData.films) {
            setDataloaded(false);
            const axiosCall = [];
            const filmApiData = [];
            for (let i = 0; i < characterData.films.length; i++) {
                axiosCall.push(axios.get(characterData.films[i]));
            }
            await axios.all(axiosCall)
                .then(axios.spread((...responses) => {
                    responses.forEach(film => {
                        filmApiData.push({ 'date': film.data.release_date, 'title': film.data.title })
                    })
                    if (filmApiData) {
                        setFilms(filmApiData)

                        setDataloaded(true);
                        filmApiData.sort(sortByDate);
                        setLastFilm(filmApiData[0])
                    }
                }))
                .catch(error => {
                    console.log(error);
                })
        }

    }
    
    const sortByDate = (a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    useEffect(() => {
        loadCharacterData()
    }, [])

    const loadCharacterData = async () => {
        await axios.get('https://swapi.dev/api/people')
            .then(respnose => {
                const charactersData = respnose.data.results;
                let index = 1;
                const characterNameList = []
                const characterList = []
                charactersData.forEach(character => {
                    characterNameList.push({ 'value': index, 'display': character.name })
                    characterList.push({ 'id': index, 'name': character.name, 'films': character.films })
                    index++;
                });
                setCharacters([{ 'value': '', 'display': 'Select From List' }].concat(characterNameList))
                setCharacterApiData(characterList)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (<div>
                <main role="main" className="row">
                    <div className="background">
                        <h3>StarWars!</h3>
                        <hr/>
                        <Characters changeHandler={handleCharacterChange} characters={characters} />
                        {selecList ? <Movies films={films} lastFilm={lastFilm} dataloaded={dataloaded} /> : null}
                    </div>
                </main>
            </div>)
}
export default Widget
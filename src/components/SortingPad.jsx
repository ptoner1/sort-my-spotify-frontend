import { StyledSortingPad } from "../styles"
import { useEffect, useState } from 'react';
import SortedTracksPopup from "./SortedTracksPopup";

const SortingPad = ({ user_id, tracks, setLoading }) => {

    const [danceability1, setDanceability1] = useState(0);
    const [danceability2, setDanceability2] = useState(100);
    const [energy1, setEnergy1] = useState(0);
    const [energy2, setEnergy2] = useState(100);
    const [tempo1, setTempo1] = useState(0);
    const [tempo2, setTempo2] = useState(250);
    const [positivity1, setPositivity1] = useState(0);
    const [positivity2, setPositivity2] = useState(100);
    const [speechiness1, setSpeechiness1] = useState(0);
    const [speechiness2, setSpeechiness2] = useState(100);
    const [popularity1, setPopularity1] = useState(0);
    const [popularity2, setPopularity2] = useState(100);
    const [explicitOk, setExplicitOk] = useState(true);
    const [sortedTracks, setSortedTracks] = useState([]);

    const [displayPopup, setDisplayPopup] = useState(false);



    // Timeout allows the animation to render before state change
    useEffect(() => {
        setTimeout(sortPlaylist, 200)
    }, [explicitOk])


    // For Reset Button
    function reset() {
        setDanceability1(0);
        setDanceability2(100);
        setEnergy1(0);
        setEnergy2(100);
        setPositivity1(0);
        setPositivity2(100);
        setSpeechiness1(0);
        setSpeechiness2(100);
        setPopularity1(0);
        setPopularity2(100);
        setTempo1(0);
        setTempo2(250);
        setExplicitOk(true);
        setSortedTracks([])
    }



    function sortPlaylist() {
        const tracksCopy = Array.from(tracks);

        // sort each attribute's state into an array where index 0 has a lower
        // value than index 1.  if the numbers equal each other, include all.
        function sortAttribute(a, b) {
            if (a < b) return [a, b]
            if (a > b) return [b, a]
            return [0, 100]
        }
        const sortedDanceability = sortAttribute(parseInt(danceability1), parseInt(danceability2));
        const sortedEnergy = sortAttribute(parseInt(energy1), parseInt(energy2));
        const sortedPositivity = sortAttribute(parseInt(positivity1), parseInt(positivity2));
        const sortedSpeechiness = sortAttribute(parseInt(speechiness1), parseInt(speechiness2));
        const sortedPopularity = sortAttribute(parseInt(popularity1), parseInt(popularity2));
        const sortedTempo = sortAttribute(parseInt(tempo1), parseInt(tempo2));


        let sortedTracks = tracksCopy.filter(t => sortedDanceability[0] <= parseInt(t.danceability * 100) &&
            sortedDanceability[1] >= parseInt(t.danceability * 100) &&
            sortedEnergy[0] <= parseInt(t.energy * 100) &&
            sortedEnergy[1] >= parseInt(t.energy * 100) &&
            sortedPositivity[0] <= parseInt(t.valence * 100) &&
            sortedPositivity[1] >= parseInt(t.valence * 100) &&
            sortedSpeechiness[0] <= parseInt(t.speechiness * 100) &&
            sortedSpeechiness[1] >= parseInt(t.speechiness * 100) &&
            sortedPopularity[0] <= parseInt(t.popularity) &&
            sortedPopularity[1] >= parseInt(t.popularity) &&
            sortedTempo[0] <= parseInt(t.tempo) &&
            sortedTempo[1] >= parseInt(t.tempo)
        )
        if (explicitOk) {
            setSortedTracks(sortedTracks)
        } else {
            const noExplicitTracks = sortedTracks.filter(t => t.explicit === false);
            setSortedTracks(noExplicitTracks)
        }
    }





    // Generate track colors for one input range
    function genTrackBackground(a, b) {
        if (a - b < 0) return {
            background: `linear-gradient(to right, var(--grey-medium) ${a}% , var(--green) ${a}% , var(--green) ${b}%, var(--grey-medium) ${b}%)`
        }
        if (a - b > 0) return {
            background: `linear-gradient(to right, var(--grey-medium) ${b}% , var(--green) ${b}% , var(--green) ${a}%, var(--grey-medium) ${a}%)`
        }
    }


    // Render one full attribute/input-range display
    const genRangeDisplay = (title, a, b, setA, setB, max) => {

        // Display input value as a separate element directly above input
        function genSliderValue(state) {
            return {
                position: 'absolute',
                left: `${state}%`,
                translate: `calc(0% - ${state}%) -100%`,
                cursor: 'default'
            }
        }

        // if sortedTracks.length goes over 150, the UI draggability gets glitchy so
        // we reset sortedTracks to zero to make rendering zippy & responsive.
        function onInputChangeA(e) {
            setA(e.target.value);
            if (sortedTracks.length && sortedTracks.length < 150) return sortPlaylist();
            return setSortedTracks([]);
        }
        function onInputChangeB(e) {
            setB(e.target.value);
            if (sortedTracks.length && sortedTracks.length < 150) return sortPlaylist();
            return setSortedTracks([]);
        }

        // Because Tempo has a max of 250, we need to adjust for it's styling
        const styleFactor = max ? max / 100 : 1;

        return (
            <div className='attribute__container'>
                <div className='attribute__title'>{title}</div>
                <div className="range__container">
                    <div style={genSliderValue(a / styleFactor)}>{a}</div>
                    <div style={genSliderValue(b / styleFactor)}>{b}</div>
                    <div className="slider-track" style={genTrackBackground(a / styleFactor, b / styleFactor)}></div>
                    <input
                        type="range"
                        min="0"
                        max={max || "100"}
                        value={a}
                        onChange={onInputChangeA}
                        onMouseUp={sortPlaylist}
                        onTouchEnd={sortPlaylist}
                    />
                    <input
                        type="range"
                        min="0"
                        max={max || "100"}
                        value={b}
                        onChange={onInputChangeB}
                        onMouseUp={sortPlaylist}
                        onTouchEnd={sortPlaylist}
                    />
                </div>
            </div>
        )
    }




    function showPopup() {
        document.body.style.overflow = "hidden"
        const backgroundContainers = document.getElementsByClassName('blurOnPopup');
        Array.from(backgroundContainers).forEach(e => e.style.filter = "blur(10px)");
        setDisplayPopup(true)
    }




    return (
        <StyledSortingPad>
            <main className="blurOnPopup">
                <h3>Filter your "liked songs" and save the results as a new playlist!</h3>

                <div className="wrapper">

                    {genRangeDisplay('Tempo', tempo1, tempo2, setTempo1, setTempo2, 250)}
                    {genRangeDisplay('Danceability', danceability1, danceability2, setDanceability1, setDanceability2)}
                    {genRangeDisplay('Energy', energy1, energy2, setEnergy1, setEnergy2)}
                    {genRangeDisplay('Positivity', positivity1, positivity2, setPositivity1, setPositivity2)}
                    {genRangeDisplay('Speechiness', speechiness1, speechiness2, setSpeechiness1, setSpeechiness2)}
                    {genRangeDisplay('Popularity', popularity1, popularity2, setPopularity1, setPopularity2)}

                    <div className='attribute__container'>
                        <div className='attribute__title'>Include explicit content?</div>
                        <div className="switch">
                            <input type="radio" className="switch-input" name="ya" id="ya" checked={explicitOk === true} onChange={() => setExplicitOk(true)} />
                            <label htmlFor="ya" className="switch-label switch-label-off">Ya</label>
                            <input type="radio" className="switch-input" name="na" id="na" checked={explicitOk === false} onChange={() => setExplicitOk(false)} />
                            <label htmlFor="na" className="switch-label switch-label-on">Na</label>
                            <span className="switch-selection"></span>
                        </div>
                    </div>

                    <div className="filter__buttons">
                        <button className="button__reset" onClick={reset}>Reset</button>
                        <button className="button__sort" onClick={showPopup}>View {sortedTracks.length ? sortedTracks.length : ''} Results</button>
                    </div>

                </div>
            </main>


            {displayPopup ?
                <SortedTracksPopup
                    setDisplayPopup={setDisplayPopup}
                    sortedTracks={sortedTracks}
                    setSortedTracks={setSortedTracks}
                    user_id={user_id}
                    setLoading={setLoading}
                /> : ''}

        </StyledSortingPad>
    )

}

export default SortingPad
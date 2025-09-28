import { useEffect, useState } from 'react';
import { StyledTrackList } from '../styles';
import { formatDateAdded, formatPercentage } from '../utils';


// const TrackList = ({ tracks, setSortingStrategy, sortingStrategy, flippedSortingStrategy, setFlippedSortingStrategy, className }) => {
const TrackList = ({ tracks, setTracks, className }) => {

    const [sortingStrategy, setSortingStrategy] = useState('addedAt');
    const [flippedSortingStrategy, setFlippedSortingStrategy] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    // TrackList function used to sort all tracks by provided attribute aka sortingStrategy state
    function compare(a, b) {
        if (a[sortingStrategy] > b[sortingStrategy]) return -1;
        if (b[sortingStrategy] > a[sortingStrategy]) return 1;
        return 0;
    }

    useEffect(() => {
        let array = Array.from(tracks);
        if (!flippedSortingStrategy) array.sort(compare);
        if (flippedSortingStrategy) array.reverse();
        setTracks(array)
    }, [sortingStrategy, flippedSortingStrategy])


    function sort(attribute) {
        // If clicking on the same sorting strategy attribute twice in a row, flip the results.
        if (sortingStrategy === attribute) setFlippedSortingStrategy(!flippedSortingStrategy);

        // If changing the sorting strategy attribute, organize items from high to low.
        if (sortingStrategy !== attribute) setFlippedSortingStrategy(false);

        return setSortingStrategy(attribute)
    }

    function selectTrack(i) {
        if (selectedTrack === i) return setSelectedTrack(null);
        setSelectedTrack(i)
    }

    return (
        <>
            {tracks && tracks.length ? (
                <StyledTrackList className={className}>

                    <div className='track__list__sort'>
                        <label htmlFor='audio-features'>Sort Songs by:</label>
                        <select
                            onInput={(e) => sort(e.target.value)}
                            name="audio-features"
                            id="audio-features"
                        >
                            <option value={sortingStrategy}>
                                Flip {sortingStrategy === 'addedAt' ? 'Date Added' : sortingStrategy}
                            </option>
                            <option value="addedAt" selected>Date Added</option>
                            <option value="danceability">Danceability</option>
                            <option value="energy">Energy</option>
                            <option value="tempo">Tempo</option>
                            <option value="valence">Positivity</option>
                            <option value="speechiness">Speechiness</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>

                    <header className='track__item track__header'>
                        <h4 className='track__header__item'>#</h4>
                        <h4 className='track__header__item'>TITLE</h4>
                        <h4 onClick={() => sort('addedAt')} className='track__header__item track__item__added__date'>DATE ADDED</h4>
                        <h4 onClick={() => sort('danceability')} className='track__header__item'>DANCEABILITY</h4>
                        <h4 onClick={() => sort('energy')} className='track__header__item'>ENERGY</h4>
                        <h4 onClick={() => sort('tempo')} className='track__header__item'>TEMPO</h4>
                        <h4 onClick={() => sort('valence')} className='track__header__item track__item__valence'>POSITIVITY</h4>
                        <h4 onClick={() => sort('speechiness')} className='track__header__item track__item__speechiness'>SPEECHINESS</h4>
                        <h4 onClick={() => sort('popularity')} className='track__header__item track__item__popularity'>POPULARITY</h4>
                        <h4 onClick={() => sort('explicit')} className='track__header__item track__item__explicit'>EXPLICIT</h4>
                    </header>

                    {tracks.map((track, i) => {
                        return (
                            <li className={selectedTrack === i ? "track__item track__item__selected" : "track__item"} key={i} onClick={() => selectTrack(i)}>
                                <div className="track__item__num">{i + 1}</div>
                                <div className="track__item__title-group">
                                    {track.album.images.length && track.album.images[2] && (
                                        <div className="track__item__img">
                                            <img src={track.album.images[2].url} alt={track.name} />
                                        </div>
                                    )}
                                    <div className="track__item__name-artist">
                                        <div className="track__item__name overflow-ellipsis">
                                            {track.name}
                                        </div>
                                        <div className="track__item__artist overflow-ellipsis">
                                            {track.artists.map((artist, i) => (
                                                <span key={i}>
                                                    {artist.name}{i !== track.artists.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <menu className='track__item__menu' onClick={() => selectTrack(i)}><div /></menu>
                                <div className='track__item__num track__item__added__date'>{formatDateAdded(track.addedAt)}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute` : 'track__item__num'} attr="danceability">{formatPercentage(track.danceability)}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute` : 'track__item__num'} attr="energy">{formatPercentage(track.energy)}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute` : 'track__item__num'} attr="tempo">{parseInt(track.tempo)}<sub>bpm</sub></div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute track__item__valence` : 'track__item__num track__item__valence'} attr="positivity">{formatPercentage(track.valence)}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute track__item__speechiness` : 'track__item__num track__item__speechiness'} attr="speechiness">{formatPercentage(track.speechiness)}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute track__item__popularity` : 'track__item__num track__item__popularity'} attr="popularity">{track.popularity}</div>
                                <div className={selectedTrack === i ? `track__item__num__show-attribute track__item__explicit` : 'track__item__num track__item__explicit'} attr="explicit?">{track.explicit ? 'Explicit' : '-'}</div>
                            </li>
                        )
                    })}
                </StyledTrackList>
            ) : (
                <p className="empty-notice">No tracks available</p>
            )}
        </>
    )
};

export default TrackList;
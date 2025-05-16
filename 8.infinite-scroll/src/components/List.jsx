import { useEffect, useRef, useState } from "react";
import spinner from "../assets/spinner.svg";
import usePhotos from "../hooks/usePhotos";

export default function List () {

    const [query, setQuery] = useState("random");
    const [pageNumber, setPageNumber] = useState(1);
    const lastPicRef = useRef();
    const searchRef = useRef();

    const photosApiDatas = usePhotos(query, pageNumber);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchRef.current.value !== query) {
            setQuery(searchRef.current.value);
            setPageNumber(1);
        }
    }

    useEffect(() => {
        if (lastPicRef.current) {
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && photosApiDatas.maxPages !== pageNumber) {
                    setPageNumber(pageNumber => pageNumber + 1);
                    lastPicRef.current = null;
                    obs.disconnect();
                }
            });
            obs.observe(lastPicRef.current);
        }
    }, [photosApiDatas]);

    return (
        <>
            <h1 className="text-4xl">Unsplash Clone</h1>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="search" className="block mb-4">Look for images...</label>
                <input type="text" id="search" placeholder="look for something..." className="block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-gray-500 rounded border border-slate-400" ref={ searchRef } />
            </form>

            { photosApiDatas.error.state && <p>{ photosApiDatas.error.msg }</p> }

            { !photosApiDatas.error.state && photosApiDatas.photos.length === 0 && !photosApiDatas.loading && <p>No image available for this query</p> }

            <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center"> 
                { !photosApiDatas.loading && photosApiDatas.photos.length !== 0 && photosApiDatas.photos.map((photo, index) => {
                    if (photosApiDatas.photos.length === index + 1) {
                        return (
                            <li key={ index } ref={ lastPicRef } >
                                <img className="w-full h-full object-cover" src={ photo.urls.regular } alt={ photo.alt_description } />
                            </li>
                        )
                    } else {
                        return (
                            <li key={ index }>
                                <img className="w-full h-full object-cover" src={ photo.urls.regular } alt={ photo.alt_description } />
                            </li>
                        )
                    }
                }) }
            </ul>

            { (photosApiDatas.loading && !photosApiDatas.error.state) && <img src={ spinner } className="block mx-auto" /> }

            { photosApiDatas.maxPages === pageNumber && <p className="mt-10">No more images to show for that query</p>}
        </>
    )
}
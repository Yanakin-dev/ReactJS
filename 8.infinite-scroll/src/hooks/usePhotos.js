import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function usePhotos(querySearch, pageIndex) {

    const [error, setError] = useState({
        msg: "",
        state: false
    });
    const [photos, setPhotos] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (photos.length !== 0 && maxPages !== 0) {
            setPhotos([]);
            setMaxPages(0);
        }
    }, [querySearch]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.unsplash.com/search/photos?pahe=${pageIndex}&per_page=30&query=${querySearch}&client_id=eyWwB39omO1sRS1E_7xBFAWzwBqlqpt54RJCy7LKQBY`)
        .then(response => {
            if (!response.ok) throw new Error(`${response.status} error, something went wrong`);
            return response.json()
        })
        .then(datas => {
            setPhotos(state => [...state, ...datas.results]);
            setMaxPages(datas.total_pages);
            setLoading(false);
        })
        .catch(error => {
            setError({
                msg: error.message,
                state: true
            });
            setLoading(false);
        })
    }, [querySearch, pageIndex]);


    return { error, photos, maxPages, loading };

}
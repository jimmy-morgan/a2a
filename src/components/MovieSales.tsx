import React, {useState, useEffect} from 'react';
import Api from '../api';

export interface MovieReponse {
    uuid: string;
    name: string;
    description: string;
}

export interface TheaterReponse {
    uuid: string;
    name: string;
    address: string;
}

export interface MovieSalesResponse {
    uuid: string;
    sale_date: string;
    price: string;
    movie: MovieReponse;
    theater: TheaterReponse;
}

const MovieSales: React.FC = () => {
    const [movieSales, setMovieSales] = useState<MovieSalesResponse[]>([]);
    const [saleDate, setSaleDate] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        Api.get("movie-sale?filters[sale_date]=" + saleDate + "&with[]=movie&with[]=theater&orderby=price&sortby=desc&per_page=1")
            .then(response => {
                if (response.message.code !== 100 && response.message.code !== 400) {
                    setError(response.message.messages.join("<br />"));
                }
                setMovieSales(response.data?.results);
            })
            .catch(error => {
                console.error('Error fetching movie sales:', error);
                setError('Failed to fetch movie sales');
            });
    };

    useEffect(() => {

    }, []);

    return (
        <div className="container mt-5">
            <h1>Movie with Highest Sales</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="form-label">Date:</label>
                    <div className="col">
                        <input type="date"
                               className="form-control"
                               value={saleDate}
                               onChange={(e) => setSaleDate(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            <ul className="list-group">
                {movieSales ? (movieSales.map(movieSale => (
                        <li key={movieSale.uuid} className="list-group-item">
                            <h2>Movie: {movieSale.movie.name}</h2>
                            <p><small>{movieSale.movie.description}</small></p>
                            <p>Date: {movieSale.sale_date}<br/>
                                Sales: ${movieSale.price}</p>
                            <p><b>Theater:</b><br/>
                                {movieSale.theater.name}<br/>
                                {movieSale.theater.address}</p>
                        </li>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </ul>
        </div>
    );
};

export default MovieSales;

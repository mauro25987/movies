import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Modal } from "./Modal";
import ReactStars from "react-rating-stars-component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export function Hackflix() {
   const apiUrl = import.meta.env.VITE_API_URL;
   const apiKey = import.meta.env.VITE_API_KEY;
   const [movies, setMovies] = useState([]);
   const [rating, setRating] = useState(0);
   const [showModal, setShowModal] = useState(false);
   const [selMovie, setSelMovie] = useState(null);

   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasNextPage, setHasNextPage] = useState(false);
   const [error, setError] = useState(null);

   const fetchMovies = async () => {
      setLoading(true);
      try {
         const res = await axios.get(
            `${apiUrl}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            {
               headers: {
                  Authorization: `Bearer ${apiKey}`,
                  accept: "application/json",
               },
            }
         );
         if (res.data.results.length === 0) {
            setHasNextPage(false);
         } else {
            setMovies(
               [...movies, ...res.data.results].filter(
                  (e) => e.vote_average >= rating * 2 - 2
               )
            );
            setPage(page + 1);
            setHasNextPage(true);
         }
      } catch (error) {
         console.log("Error recibido en la solicitud:", error);
         setError(error);
      } finally {
         setLoading(false);
      }
   };

   const [sentryRef] = useInfiniteScroll({
      loading,
      hasNextPage,
      onLoadMore: fetchMovies,
      disabled: !!error,
      rootMargin: "0px 0px 400px 0px",
   });

   useEffect(() => {
      fetchMovies();
   }, [rating]);

   // modal, transition scale

   const ratingChanged = (newRating) => {
      setRating(newRating);
   };

   const handleModal = (movie) => {
      setSelMovie(movie);
      showModal ? setShowModal(false) : setShowModal(true);
   };

   return (
      <Container className="bg-secondary-subtle">
         <h1>Hackflix</h1>
         <hr />
         <Row>
            <Col className="d-flex justify-content-center">
               <span className="my-auto fw-bold">Filtrar por rating</span>
               <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
               />
               <span className="my-auto fw-bold"> & mas</span>
            </Col>
         </Row>
         <Row>
            {console.log(movies.length)}
            {movies.length === 0 ? (
               <Col className="d-flex justify-content-center">
                  <span className="my-auto h3 mt-4">
                     Lo sentimos, no se encontraron películas con el rating
                     solicitado
                  </span>
               </Col>
            ) : (
               movies.map((movie, index) => (
                  <Col className="col-3" key={index}>
                     <Image
                        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                        alt={movie.title}
                        rounded
                        fluid
                        className="mt-3"
                        onClick={() => handleModal(movie)}
                     />
                  </Col>
               ))
            )}
            <Col className="d-flex justify-content-center">
               {loading || hasNextPage ? (
                  <span ref={sentryRef}>Loading.....</span>
               ) : (
                  <span className="my-auto h3 mt-4">
                     Lo sentimos, no se encontraron películas con el scroll
                  </span>
               )}
            </Col>
            {showModal && (
               <Modal
                  movie={selMovie}
                  show={showModal}
                  handleModal={handleModal}
               />
            )}
         </Row>
      </Container>
   );
}

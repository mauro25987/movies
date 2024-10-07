import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Modal } from "./Modal";
import ReactStars from "react-rating-stars-component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export function Hackflix({ token }) {
   const [movies, setMovies] = useState([]);
   const [rating, setRating] = useState(0);
   const [showModal, setShowModal] = useState(false);
   const [selMovie, setSelMovie] = useState(null);
   const [page, setPage] = useState(1);

   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  accept: "application/json",
               },
            }
         )
         .then((response) => {
            setMovies(
               response.data.results.filter(
                  (e) => e.vote_average >= rating * 2 - 2
               )
            );
         })
         .catch((err) => {
            console.log("Error recibido en la solicitud:", err);
         });
   }, [rating]);

   // modal, transition scale
   const ratingChanged = (newRating) => {
      setRating(newRating);
   };

   const handleModal = (movie) => {
      setSelMovie(movie);
      showModal ? setShowModal(false) : setShowModal(true);
   };

   const handlePage = (page) => setPage(page + 1);

   return (
      <Container className="bg-secondary-subtle">
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
               movies.map((movie) => (
                  <Col className="col-3" key={movie.id}>
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

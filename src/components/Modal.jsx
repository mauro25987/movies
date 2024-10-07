import { Modal as BModal, Button } from "react-bootstrap";

export function Modal({
   movie: {
      title,
      release_date,
      overview = "No hay resumen",
      vote_average,
      ...movie
   },
   show,
   handleModal,
}) {
   return (
      <BModal show={show} onHide={() => handleModal(movie)}>
         <BModal.Header closeButton onClick={() => handleModal(movie)}>
            <BModal.Title>{title}</BModal.Title>
         </BModal.Header>
         <BModal.Body>
            <p>
               <span className="fw-bold">Fecha Publicacion:</span>{" "}
               {release_date}
            </p>
            <p>
               <span className="fw-bold">Rating:</span> {vote_average}
            </p>
            <p>
               <span className="fw-bold">Resumen:</span> {overview}
            </p>
         </BModal.Body>
         <BModal.Footer>
            <Button variant="danger" onClick={() => handleModal(movie)}>
               Cerrar
            </Button>
         </BModal.Footer>
      </BModal>
   );
}

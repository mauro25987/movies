import { Hackflix } from "./components/Hackflix";

function App() {
   const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWI3ZWVhZjAzYjI4ZmExZTU2ZTFkNjRlOTI3ZmI4OCIsIm5iZiI6MTcyODAzMTcyNy41OTAzNTgsInN1YiI6IjY2ZmZhOWE0YjE0NjI4MmY3Yjg1MDhlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-EENi0cugkJwoMIwQqrlnvf6HL48Xq9hs7cm1i0JCxY";
   return <Hackflix token={token} />;
}

export default App;

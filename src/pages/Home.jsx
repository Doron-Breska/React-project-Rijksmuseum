import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import CardsModal from "../components/CardsModal";
import PaginationCom from "../components/PaginationCom";

function Home() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectArtist, setSelectArtist] = useState("");
  const [artistsSet, setArtistsSet] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // console.log("test env file",process.env.REACT_APP_API_KEY);
  useEffect(() => {
    setLoading(true);
    const fetchPaintings = async () => {
      try {
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.REACT_APP_API_KEY}&toppieces=True&ps=30&imgonly=true&involvedMaker=${selectArtist}&p=${page}`
        );
        const result = await response.json();
        setPaintings(result.artObjects);
        setTotalPages(result.count / 30);
        if (artistsSet.size === 0) {
          const newArtistsSet = new Set();
          for (let paint of result.artObjects) {
            newArtistsSet.add(paint.principalOrFirstMaker);
          }
          setArtistsSet(newArtistsSet);
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaintings();
  }, [selectArtist, page]);
  console.log("the results of the fetch", paintings);

  function handleSelect(value) {
    setSelectArtist(value.replace(" ", "+"));
    console.log("test of handleSelect updated value", value.replace(" ", "+"));
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <>
      {loading && <h1 className="text-center m-1">LOADING...</h1>}
      <Filters onSelect={handleSelect} arrayArtists={Array.from(artistsSet)} />
      <div className="paintings-container">
        <CardsModal paintings={paintings} />
      </div>
      <PaginationCom
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default Home;

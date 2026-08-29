import React, { use } from "react";
import Row from "./Row";
import { useState, useEffect } from "react";
import axios from "axios";
import { requests } from "../api/tmdb";
function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [animation, setAnimation] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.originals);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.trending);
      setTrending(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.action);
      setAction(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.comedy);
      setComedy(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.horror);
      setHorror(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.romance);
      setRomance(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.documentaries);
      setDocumentaries(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.animation);
      setAnimation(request.data.results);
      return request;
    }
    fetchData();
  }, []);


  return (
    <>
      <Row title="Trending Now" movies={trending} />
      <Row title="Action Movies" movies={action} />
      <Row title="Comedy Movies" movies={comedy} />
      <Row title="Horror Movies" movies={horror} />
      <Row title="Romance Movies" movies={romance} />
      <Row title="Documentaries" movies={documentaries} />
      <Row title="Animation" movies={animation} />

    </>
  );
}

export default MovieCard;

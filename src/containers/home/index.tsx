import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Utils from '../../utils/helpers';
import { ITvShowsList } from '../../interfaces/home';
import SearchBoxes from '../../components/SearchBoxes';
import { getTvShows } from './services';

type IColumns = {
  dataField: string; 
  text: string;
  sort?: boolean; 
  formatter?: any;
}

function Home() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [enableAge, setEnableAge] = useState<boolean>(false);
  const [columns, setColumns] = useState<Array<IColumns>>([]);
  const [tvshowsList, setTvshowsList] = useState<Array<ITvShowsList>>([]);
  
  useEffect(() => {
    setColumns([
      {
        dataField: "title",
        text: "Name",
        sort: true
      },
      {
        dataField: "imdb",
        text: "IMDb",
        sort: true
      },
      {
        dataField: "age",
        text: "Age",
        sort: true,
        formatter: detailFormatterAge
      },
      {
        dataField: "sources",
        text: "Sources",
        formatter: detailFormatter
      }
    ]);
    fetchData();
  }, []);

  useEffect(() => {
    if (!title || title.length > 2) fetchData();
  }, [title]);

  useEffect(() => {
    if (age === '') fetchData();
    if (age && (age === "7" || age.length === 2)) fetchData();
  }, [age]);

  const fetchData = async () => {
    const params = Utils.serialize({
      title,
      age
    })
    
    const response = await getTvShows(params);
    if (response.status) {
      setTvshowsList(response.data);
    }

    setEnableAge(false);
    if (!isReady) setIsReady(true);
  }

  const detailFormatter = (cell: any, row: ITvShowsList) => {
    return (
      <div>
        {row.sources.map(item => {
          return(
            <p style={{ fontSize: 14 }}>{item}</p>
          )
        })}
      </div>
    );
  };

  const detailFormatterAge = (cell: any, row: ITvShowsList) => {
    return (
      <div>
        <p style={{ fontSize: 14 }}>{row.age}+</p>
      </div>
    );
  };

  if (!isReady) {
    return ( 
      <Spinner animation="border" role="status" className="spinner-load">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (!tvshowsList.length) {
    return ( 
      <Container className="spinner-load">
        <SearchBoxes 
          title={title}
          age={age}
          setTitle={setTitle}
          setAge={setAge}
          enableAge={enableAge}
          setEnableAge={setEnableAge}
        />
        <br />
        <span>No tv shows data</span>
      </Container>
    )
  }

  return (
    <Container>
      <SearchBoxes 
        title={title}
        age={age}
        setTitle={setTitle}
        setAge={setAge}
        enableAge={enableAge}
        setEnableAge={setEnableAge}
      />
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={tvshowsList}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}
      />
    </Container>
  );
}

export default Home;

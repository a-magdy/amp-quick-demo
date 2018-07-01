import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard
} from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="bands"
        type="_doc"
        url="https://amp.a-magdy.me"
        // url="http://localhost:9200"
      >
        <div className="navbar">
          <div className="logo">
            The Booksearch App
          </div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={[ "artists", "keywords", "titles"]}
            queryFormat="and"
            placeholder="Search for a titles and artists or keywords"
            innerClass={{
              "input": "searchbox",
              "list": "suggestionlist"
            }}
            autosuggest={false}
            iconPosition="left"
            filterLabel="search"
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            {/* <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating_rounded"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" },
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            /> */}
            <RangeSlider
              componentId="publishFilter"
              dataField="publishedYear"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: 1945,
                end: 2018
              }}
              rangeLabels={{
                start: "1945",
                end: "2018"
              }}
              interval={1}
            />
            <MultiList
              componentId="locationFilter"
              dataField="location.raw"
              title="Locations"
              size={1000}
              showCheckbox={false}
              className="authors"
              innerClass={{
                "list": "author-list"
              }}
              placeholder="Filter by location name"
              filterLabel="Locations"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="titles"
              react={{
                "and": ["mainSearch", "ratingsFilter", "publishFilter", "locationFilter"]
              }}
              pagination={false}
              size={20}
              // sortOptions={[
              //   { dataField: "average_rating", sortBy: "desc", label: "Ratings (High to low)" },
              //   { dataField: "original_title.raw", sortBy: "asc", label: "Title A->Z"},
              //   { dataField: "original_title.raw", sortBy: "desc", label: "Title Z->A"}
              // ]}
              onData={(res)=>(
                {
                  "image": "https://source.unsplash.com/random",
                  "title": res.titles || " ",
                  "description":  /*res.average_rating + " ★ " +*/
                  "<span style='float:right;margin-right:5px;'>Pub: " + res.publishedYear+ "</span><br/><br/><div class='result-author' title='" + res.artists + "'>by " + res.artists + "</div>",
                  "url": "https://google.com/search?q=" + res.titles
                }
              )}
              className="result-data"
              innerClass={{
                "image": "result-image",
                "resultStats": "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;

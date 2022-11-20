import logo from './logo.svg';
import './styles.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [sentimentNum, setSentimentNum] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function changeBkgd(senti, sentiNum) {
    if (senti === 'positive') {
      if (sentiNum > 0.5) {
        document.body.style.backgroundImage = 'linear-gradient(lightyellow, pink)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
      }
      else {
        document.body.style.backgroundImage = 'linear-gradient(lightpink, lightyellow)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
      }
    }
    else if (senti === 'negative') {
      if (sentiNum < -0.1) {
        document.body.style.backgroundImage = 'linear-gradient(lightblue, black)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
        }
      else {
        document.body.style.backgroundImage = 'linear-gradient(lightblue, red)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
      }
    }
    else if (senti === 'neutral') {
      if (sentiNum > 0.5) {
        document.body.style.backgroundImage = 'linear-gradient(lightyellow, lightblue)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
        }
      else {
        document.body.style.backgroundImage = 'linear-gradient(lightpink, lightblue)';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100%";
        document.body.style.backgroundAttachment = "fixed";
      }
    }
  }

  function fetchData() {
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": 'application/json',
        "x-rapidapi-host": 'text-analysis12.p.rapidapi.com',
        "x-rapidapi-key": '8f4e375563msh5c60050e98cd9f1p141616jsnfaff9494c534'
      },
      data: {
        language: "english",
        text: text,
      },
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        setSentiment(response.data.sentiment);
        setSentimentNum(response.data.aggregate_sentiment.compound);
        setIsLoading(false);
        changeBkgd(response.data.sentiment, response.data.aggregate_sentiment.compound);
        console.log(response.data.sentiment);
    }).catch(function (error) {console.error(error);});
  }


  function fetchData2() {
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/ner/api/v1.1",
      headers: {
        "content-type": 'application/json',
        "x-rapidapi-host": 'text-analysis12.p.rapidapi.com',
        "x-rapidapi-key": '8460aca266msh0149339604e5e57p11a91cjsndc5b4f832d7a'
      },
      data: {
        language: 'english',
        text: text,
      },
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        setTitle(response.data.ner[0].entity);
        setIsLoading(false);
    }).catch(function (error) {console.error(error);});
  }

  function fetchBoth() {
    Promise.all([fetchData(), fetchData2()])
  }


  return (
    <div>
      <h1>Musically</h1>
      <h2>Sounds that are arranged in a way that is pleasant or exciting to listen to.
      People sing music or play it on instruments</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setText("");
          fetchBoth();
        }}
        action=""
      >
      <textarea
          rows = "5"
          cols = "30"
          onChange={(event) => setText(event.target.value)}
          type="text"
          name="text"
          id="text"
          value={text}
          className="textarea"
          placeholder="Enter your lyrics here..."
        />

        <input className="btn" type="submit" value="Analyze" />
      </form>
      {isLoading ? (
        <div className="data">
          <p>Loading…</p>
        </div>
      ) : (
        <div className="data">
          <p>
            Sentiment: <span>{sentiment}</span>
            <br></br>
            SentimentNumber: <span>{sentimentNum}</span>
            <br></br>
            Title: <span>{title}</span>
          </p>
        </div>
      )}
    </div>
  );
}
export default App;

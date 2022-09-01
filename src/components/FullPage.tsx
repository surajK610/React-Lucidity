import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Emoji from "./Emoji";
import CelebrityComparison from "./CelebrityComparison";
import Response from "./Response";
import WordCloud from "./WordCloud";
import Statistics from "./Statistics";
import Personality from "./Personality";
import words from "./words";
import { TableOfContents } from "react-table-of-contents";
import { useNavigate } from "react-router-dom";
import './FullPage.css'

type FullPageProp = {
  user: User;
};

const sectionNames : string[] = ["statistics", "emojis", "responses", "celebrities", "words", "personality"];
const FullPage = ({ user }: FullPageProp) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user is null");
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="full-page-container">
        <ReactFullpage
          //fullpage options
          licenseKey={"YOUR_KEY_HERE"}
          scrollingSpeed={1000} /* Options here */
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div id="statistics" className="section">
                  <Statistics
                    averageTextLength={user.avgTextLength}
                    totalMessages={user.totalMessages}
                    convoInitFreq={user.convoInitFreq}
                    msgSentiment={user.msgSentiment.positive}
                  ></Statistics>
                </div>
                <div id="emojis"  className="section">
                  <Emoji
                    mostUsedEmojis={user.favEmojis}
                    users={user.emojisByContact}
                  ></Emoji>
                </div>
                <div id="responses" className="section">
                  <Response
                    avgResponseTime={user.avgResponseTime}
                    responseUsers={user.contactResTimes}
                  ></Response>
                </div>
                <div id="celebrities" className="section">
                  <CelebrityComparison
                    celebrities={user.celebMatches}
                  ></CelebrityComparison>
                </div>
                <div id="words" className="section">
                  <WordCloud words={user.wordFreqs}></WordCloud>
                </div>
                <div id="personality" className="section">
                  <Personality personality={user.personality}></Personality>
                </div>
              </ReactFullpage.Wrapper>
            
            );
          }}
        /> <div className="table-contents">
          {sectionNames.map(sectionName => 
            <a className="content-link" href={`#${sectionName}`}><div className="content-link-text">{sectionName}</div></a>
          )}

          </div>
          </div>
      )}
    </>
  );
};

export default FullPage;

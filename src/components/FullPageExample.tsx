import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Emoji from "./Emoji";
import CelebrityComparison from "./CelebrityComparison";
import Response from "./Response";
import WordCloud from "./WordCloud";
import Statistics from "./Statistics";
import Personality from "./Personality";
import Topics from "./Topics";
import words from "./words";
import { TableOfContents } from "react-table-of-contents";
import { useNavigate } from "react-router-dom";
import Emotions from "./Emotions";
import "./FullPage.css";
import axios from "axios";

axios.defaults.baseURL = 'https://lucidity-wrapped.herokuapp.com';

const userDataParts: string[] = [
  "messaging_profile",
  "emoji",
  "emotions",
  "response_time",
  "topics",
  "celeb_matches",
  "word_freqs",
  "personality",
];

const possibleSectionNames: string[] = [
  "intro",
  "statistics",
  "emojis",
  "emotions",
  "responses",
  "topics",
  "celebrities",
  "words",
  "personality",
];

const FullPageExample = () => {
  const navigate = useNavigate();

  const [sectionNames, setSectionNames] = useState<string[]>(possibleSectionNames);
  const [userExample, setUserExample] = useState<User | null>(null);

  console.log("GOT HERE")

  useEffect(() => {
    console.log("user is null");
    const fetchUser = async() => 
      await axios
        .post(
          "/example", 
          { userID: '631017bf3f01c43bccaadb3d' },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          const userEx: User = response.data as User;
          setUserExample(userEx);
          console.log(userEx);
        })
    if (userExample === null) {
      fetchUser().then(() => {
        console.log("NEW USER", userExample)
        const newSectionNames: string[] = [];

        userDataParts.forEach((dataPart, index) => {
          if ((userExample as unknown as User).dataList.includes(dataPart)) {
            newSectionNames.push(possibleSectionNames[index]);
          }
        });

        setSectionNames(newSectionNames);}
      )
    }
    
  
  }, [userExample]);

  return (
    <>
      {userExample && (
        <div className="full-page-container">
          <ReactFullpage
            //fullpage options
            licenseKey={"YOUR_KEY_HERE"}
            scrollingSpeed={1000} /* Options here */
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  {
                    <div id="intro" className="section">
                      <h1 className="login__title">
                    LUCIDITY
                    </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 className="login__subtitle">
                    The premier text message analysis platform. <span className="color--accent">Scroll down for an example analysis!</span>
                    <br />
                    <br />
                    Lucidity uses cutting-edge algorithms and models to help you better understand your texting behavior.{" "}
                    <br />
                    <br />
                    
                    To get started, log in and upload your Facebook Messenger data. Don't worry,
                    Lucdity never shares your data and will delete it once you view your results!
                    </h1>
                    
                    
                  </div>}

                  {userExample.dataList.includes("messaging_profile") ? (
                    <div id="statistics" className="section">
                      <Statistics
                        averageTextLength={userExample.avgTextLength}
                        totalMessages={userExample.totalMessages}
                        convoInitFreq={userExample.convoInitFreq}
                        msgSentiment={userExample.msgSentiment.positive}
                        headerMessage="Here is an Example Analysis!"
                      ></Statistics>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("emoji") ? (
                    <div id="emojis" className="section">
                      <Emoji
                        mostUsedEmojis={userExample.favEmojis}
                        users={userExample.emojisByContact}
                      ></Emoji>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("celeb_matches") ? (
                    <div id="celebrities" className="section">
                      <CelebrityComparison
                        celebrities={userExample.celebMatches}
                      ></CelebrityComparison>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("word_freqs") ? (
                    <div id="words" className="section">
                      <WordCloud words={userExample.wordFreqs}></WordCloud>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("topics") ? (
                    <div id="topics" className="section">
                      <Topics topicList={userExample.topics}></Topics>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("personality") ? (
                    <div id="personality" className="section">
                      <Personality personality={userExample.personality}></Personality>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("response_time") ? (
                    <div id="responses" className="section">
                      <Response
                        avgResponseTime={userExample.avgResponseTime}
                        responseUsers={userExample.contactResTimes}
                      ></Response>
                    </div>
                  ) : null}
                  {userExample.dataList.includes("emotions") ? (
                    <div id="emotions" className="section">
                      <Emotions emotionList={userExample.emotions}></Emotions>
                    </div>
                  ) : null}
                </ReactFullpage.Wrapper>
              );
            }}
          />{" "}
          <div className="table-contents">
            {sectionNames.map((sectionName) => (
              <a className="content-link" href={`#${sectionName}`}>
                <div className="content-link-text">{sectionName}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FullPageExample;

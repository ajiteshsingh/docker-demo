import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import VotingCard from "./components/VotingCard";
import teamsJson from "./lib/teams.json";
import "./assets/scss/styles.scss";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';

function App() {
  let [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(teamsJson);
  }, []);

  async function incrementVoteCount(teamId) {
    const team = teams.find((team) => team._id === teamId);
    team.votes += 1;

    // teams = teams.map((team) => {
    //   if (team._id === teamId) {
    //     team.votes += 1;
    //   }
    //   return team;
    // });

    const votes = await axios.post('http://localhost:8081/vote', {
      name: team._id
    });
    team.votes = votes;
    setTeams(teams);
  }

  return (
    <Container className="app">
      <Row>
        {teams.map((team) => {
          return (
            <Col md={4} key={team._id}>
              <VotingCard
                team={team}
                incrementVoteCount={(teamId) => incrementVoteCount(teamId)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default App;

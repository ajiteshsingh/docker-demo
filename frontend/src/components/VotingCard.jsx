import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function VotingCard(props) {
  let { team, incrementVoteCount } = props;
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    async function getVotes() {
      const teamVotes = await axios.get(
        `http://localhost:8081/vote?name=${team._id}`
      );
      setVotes(teamVotes.data);
    }

    getVotes();
  }, []);

  function incrementVote(id) {
    setVotes((prev) => (prev += 1));
    incrementVoteCount(id);
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`/assets/images/${team.logo}`} />
      <Card.Body>
        <Card.Title>{team.name}</Card.Title>
        <Button variant="success" onClick={() => incrementVote(team._id)}>
          Vote
        </Button>
      </Card.Body>
      <Card.Footer>Vote count: {votes}</Card.Footer>
    </Card>
  );
}
export default VotingCard;

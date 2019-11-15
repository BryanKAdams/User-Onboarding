import React from "react";



const PeopleCard = props => {
  return (
    <div className="people-list">
      {props.people.map(person => (
          console.log(person),
        <div className="people" key={person.id}>
          <h2>Name: {person.name}</h2>
          <p>Email: {person.email}</p>
          <p>Accepted Terms: {person.terms.toString().toUpperCase()}</p>
          <p> Unique Key {person.id}</p>
          <p>Joined Us On: {person.createdAt.substring(0, 10)} At: {person.createdAt.substring(11,13) - 7}{person.createdAt.substring(13,16)}</p>
        </div>
      ))}
    </div>
  );
};

export default PeopleCard;

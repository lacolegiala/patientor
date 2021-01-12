import React from 'react';
import { useParams } from 'react-router-dom';

const PatientFullInfo: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h2>Name</h2>
      <p>{id}</p>
      <p>ssn</p>
      <p>occupation</p>
    </div>
  );
};

export default PatientFullInfo;
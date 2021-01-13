import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientFullInfo: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    const fetchPatientData = async () => {
      try {
        const {data} = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchPatientData();
  });
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
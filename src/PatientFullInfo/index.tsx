import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientFullInfo: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const {data} = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
        dispatch({type: 'SET_INDIVIDUAL_PATIENT', payload: data});
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchPatientData();
  }, []);
  return (
    <div>
      {patient &&
        <div>
          <h2>{patient.name}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      }
    </div>
  );
};

export default PatientFullInfo;
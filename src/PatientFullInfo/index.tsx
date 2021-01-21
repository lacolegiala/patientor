import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Diagnosis, Entry, EntryFormValues, Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { setDiagnoses, setIndividualPatient, useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import EntryDetails from './Entry';
import AddEntryForm from '../AddPatientModal/AddEntryForm';

const PatientFullInfo: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(state.patientDetails[id]);


  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newEntryWithType = {
        ...values
      };
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntryWithType
      );
      // dispatch(addPatient(newEntry));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const [patient, diagnoses] = await Promise.all([
          axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          ),
          axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          )    
        ]);
        setPatient(patient.data);
        dispatch(setIndividualPatient(patient.data));
        dispatch(setDiagnoses(diagnoses.data));
      }
      catch (error) {
        console.log(error);
      }
    };
      if (state.patientDetails[id] === undefined) {
        fetchPatientData();
      }
  }, [dispatch, id, patient, state.patientDetails]);

  
  return (
    <div>
      {patient &&
        <div>
          <h2>{patient.name}</h2>
          <GenderIcon gender={patient.gender} />
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>entries</h3>
          {patient.entries.length > 0 ?
            <div>{patient.entries.map(entry =>
              <div key={entry.id}>
                <h3>{entry.date}</h3>
                <EntryDetails entry={entry} />
                <p>
                  {entry.description}
                </p>
                {entry.diagnosisCodes ? entry.diagnosisCodes.map(code =>
                  <li key={code}>{code} - {state.diagnoses[code]?.name}</li>
                ) : null}
                <div />
              </div>  
            )}</div>
          : <div>
            No entries
          </div>
          }
          <h2>Add a new entry</h2>
          <AddEntryForm onCancel={() => null} onSubmit={submitNewEntry} />
        </div>
      }
    </div>
  );
};

type GenderProps = {
  gender: Gender;
};

const GenderIcon: React.FC<GenderProps> = (props: GenderProps) => {
  if (props.gender === 'male') {
    return (
      <Icon name='mars' />
    );
  }
  else if (props.gender === 'female') {
    return (
      <Icon name='venus' />
    );
  }
  else {
    return (
      <Icon name='neuter' />
    );
  }
};

export default PatientFullInfo;
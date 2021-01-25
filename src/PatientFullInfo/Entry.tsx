import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return (
    <>
      <Icon name='hospital'/>
      <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
    </>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return (
    <>
      <Icon name='doctor' />
      {entry.sickLeave ? 
        <p>Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
        : <p>No sick leave</p>
      }
    </>
  );
};

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  return (
    <>
      <Icon name='heart' />
      <p>Rating: {entry.healthCheckRating}</p>
    </>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "Hospital":
      return (
        <HospitalEntryDetails entry={entry} />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails entry ={entry} />
      );
    case "HealthCheck":
      return (
        <HealthCheckEntryDetails entry={entry} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
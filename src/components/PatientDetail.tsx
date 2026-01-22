import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Patient, Address } from '../types/fhir';
import { PatientService } from '../services/fhirService';
import styles from './PatientDetail.module.css';

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  // Load one patient by id when route param changes.
  const fetchPatient = async (patientId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await PatientService.getPatientById(patientId);
      setPatient(data);
    } catch (err) {
      setError('Failed to load patient details.');
    } finally {
      setLoading(false);
    }
  };

  // Build a readable name from the first available HumanName.
  const getPatientName = (patient: Patient) => {
    if (!patient.name || patient.name.length === 0) return 'Unknown Name';
    const name = patient.name[0];
    const given = name.given ? name.given.join(' ') : '';
    const family = name.family || '';
    return `${given} ${family}`.trim();
  };

  // Join address parts while skipping missing fields.
  const formatAddress = (address: Address) => {
    const lines = address.line ? address.line.join(', ') : '';
    const parts = [
      lines,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  if (loading) return <div>Loading details...</div>;
  if (error) return <div role="alert" style={{ color: 'red' }}>{error}</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        ← Back to List
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.name}>{getPatientName(patient)}</h1>
          <p>ID: {patient.id}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Basic Info</div>
          <div className={styles.value}>
            <strong>Gender:</strong> {patient.gender || 'Unknown'}
          </div>
          <div className={styles.value}>
            <strong>Birth Date:</strong> {patient.birthDate || 'Unknown'}
          </div>
        </div>

        {patient.address && patient.address.length > 0 && (
          <div className={styles.section}>
             <div className={styles.sectionTitle}>Addresses</div>
             {patient.address.map((addr, index) => (
               <div key={index} className={styles.value} style={{marginBottom: '10px'}}>
                 {formatAddress(addr)} ({addr.use || 'Unspecified'})
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

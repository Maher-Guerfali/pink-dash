import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../types/fhir';
import { PatientService } from '../services/fhirService';
import styles from './PatientList.module.css';

type PatientListProps = {
  searchTerm: string;
  refreshKey: number;
};

export const PatientList: React.FC<PatientListProps> = ({ searchTerm, refreshKey }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [retrieveCount, setRetrieveCount] = useState<number>(50);
  const navigate = useNavigate();

  const pageSize = 10; // Fixed display per page

  useEffect(() => {
    fetchPatients();
  }, [refreshKey, retrieveCount]);

  useEffect(() => {
    filterPatients();
    setCurrentPage(1);
  }, [patients, searchTerm]);

  // Pull a fresh slice of patients whenever refresh key or retrieve count changes.
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PatientService.getPatients(retrieveCount);
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients. Please check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Simple client-side search across name, id, and gender.
  const filterPatients = () => {
    if (!searchTerm.trim()) {
      setFilteredPatients(patients);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = patients.filter(patient => {
      const name = getPatientName(patient).toLowerCase();
      const id = patient.id.toLowerCase();
      const gender = (patient.gender || '').toLowerCase();
      return name.includes(term) || id.includes(term) || gender.includes(term);
    });
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  // Safely build a display name from the first HumanName entry.
  const getPatientName = (patient: Patient) => {
    if (!patient.name || patient.name.length === 0) return 'Unknown Name';
    const name = patient.name[0];
    const given = name.given ? name.given.join(' ') : '';
    const family = name.family || '';
    return `${given} ${family}`.trim() || 'Unnamed';
  };

  // Pagination math (10 per page is fixed).
  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / pageSize) || 1);
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const displayedPatients = filteredPatients.slice(startIdx, startIdx + pageSize);

  if (loading) return <div className={styles.loading}>Loading patients...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Patient Directory</h2>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.controls}>
        <div className={styles.pageSizeWrapper}>
          <label htmlFor="retrieveCount">Retrieve: </label>
          <select
            id="retrieveCount"
            value={retrieveCount}
            onChange={(e) => {
              setRetrieveCount(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={styles.pageSizeSelect}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className={styles.patientCount}>
            {filteredPatients.length} patients | Showing 10 per page
          </span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>Username</div>
          <div>Retrieved</div>
          <div>Gender</div>
          <div>DOB</div>
          <div>ID</div>
        </div>

        {filteredPatients.length === 0 && !error && !loading ? (
          <div className={styles.empty}>No patients found.</div>
        ) : (
          <div className={styles.tableBody}>
            {displayedPatients.map((patient) => (
              <button
                key={patient.id}
                className={styles.row}
                onClick={() => navigate(`/patient/${patient.id}`)}
              >
                <div className={styles.nameCell}>{getPatientName(patient)}</div>
                <div className={styles.muted}>N/A</div>
                <div>
                  <span className={styles.badge}>{patient.gender || 'Unknown'}</span>
                </div>
                <div>{patient.birthDate || 'N/A'}</div>
                <div className={styles.muted}>{patient.id}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, safePage - 3), Math.max(0, safePage - 3) + 5)
          .map((page) => (
            <button
              key={page}
              className={page === safePage ? styles.pageBtnActive : styles.pageBtn}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

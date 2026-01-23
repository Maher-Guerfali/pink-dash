
import { describe, it, expect, vi } from 'vitest';
import type { Bundle, Patient } from '../types/fhir';

// 1. Create a "hoisted" mock function
// This allows us to access the mock inside the factory below
const mockGet = vi.hoisted(() => vi.fn());

// 2. Mock axios immediately with a factory
vi.mock('axios', () => {
  return {
    default: {
      // When axios.create() is called in the service, return an object with our .get mock
      create: vi.fn(() => ({
        get: mockGet,
      })),
    },
  };
});

// 3. Import the service (this runs AFTER the mock is set up)
import { PatientService } from './fhirService';

describe('PatientService', () => {
  it('getPatients should return a list of patients', async () => {
    // Test data: a fake patient
    const fakePatient: Patient = {
      resourceType: 'Patient',
      id: '123',
      name: [{ given: ['John'], family: 'Doe' }],
    };

    // Fake server response (Bundle)
    const fakeBundle: Bundle<Patient> = {
      resourceType: 'Bundle',
      type: 'searchset',
      entry: [{ resource: fakePatient }],
    };

    // 4. Tell the mock what to return
    mockGet.mockResolvedValue({ data: fakeBundle });

    // 5. Call the real function
    const result = await PatientService.getPatients(10);

    // 6. Check: Does it return the patient?
    expect(result).toEqual([fakePatient]);
  });
});

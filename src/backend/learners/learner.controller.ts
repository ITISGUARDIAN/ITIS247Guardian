// ITIS Production Learners Controller
import { Router, Request, Response } from 'express';

export const learnerRouter = Router();

// GET /api/v1/learners
learnerRouter.get('/', async (req: Request, res: Response) => {
  return res.json({
    status: 'SUCCESS',
    data: [
      {
        id: 'lrn-901',
        firstName: 'Sipho',
        lastName: 'Mokoena',
        nationalId: '1204155092083',
        grade: 'Grade 7',
        classSection: '7A',
        schoolName: 'Diepkloof Primary School',
        emisCode: 'EMIS-700142',
        wearableSerial: 'ITIS-WB-2026-9042',
        batteryPercent: 94,
        status: 'SAFE_IN_CLASS'
      },
      {
        id: 'lrn-902',
        firstName: 'Nomvula',
        lastName: 'Mokoena',
        nationalId: '1408225091084',
        grade: 'Grade 5',
        classSection: '5C',
        schoolName: 'Diepkloof Primary School',
        emisCode: 'EMIS-700142',
        wearableSerial: 'ITIS-WB-2026-9043',
        batteryPercent: 88,
        status: 'SAFE_IN_CLASS'
      }
    ]
  });
});

// GET /api/v1/learners/:id
learnerRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json({
    status: 'SUCCESS',
    learner: {
      id,
      firstName: 'Sipho',
      lastName: 'Mokoena',
      nationalId: '1204155092083',
      grade: 'Grade 7',
      classSection: '7A',
      schoolId: 'sch-700142',
      schoolName: 'Diepkloof Primary School',
      medicalNotes: 'Asthma inhaler required in bag',
      wearableId: 'wrb-9042',
      wearableSerial: 'ITIS-WB-2026-9042',
      lastGpsFix: { lat: -26.2483, lng: 27.9322, timestamp: new Date().toISOString() }
    }
  });
});

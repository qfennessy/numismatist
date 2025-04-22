import express, { Request, Response } from 'express';

const router = express.Router();

// GET collection value stats
router.get('/value', (_req: Request, res: Response) => {
  res.json({ totalValue: 0, byMetal: {} });
});

// GET collection composition stats
router.get('/composition', (_req: Request, res: Response) => {
  res.json({ totalCount: 0, breakdown: {} });
});

// GET acquisition timeline
router.get('/timeline', (_req: Request, res: Response) => {
  res.json([]);
});

export default router;

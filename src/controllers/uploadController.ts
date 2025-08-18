import { Request, Response } from 'express';
import { uploadService } from '../services/service';

export const uploadController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadService(req.file);
    res.json(result);

  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Upload failed' });
  }
};

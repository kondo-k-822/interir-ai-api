import { Router } from 'express';
import { imageMakeHandle } from '../controllers/controller';
import multer from 'multer';
import path from 'path';

// カスタムストレージ設定
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    // 元の拡張子を保持してファイル名を生成
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// ルーター設定
const router = Router();

// 1. ファイルアップロード
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // 拡張子を取得
  const ext = path.extname(req.file.originalname).toLowerCase();

  if (ext !== '.png') {
    const fs = require('fs');

    // 拡張子がPNGでなければ削除
    fs.unlink(req.file.path, (err: any) => {
      if (err) {
        console.error('Failed to delete invalid file:', err);
      }
      return res.status(400).json({ message: 'Only PNG files are allowed' });
    });
  } else {
    // PNGファイルの場合、そのままレスポンス
    res.json({ message: 'File uploaded', filename: req.file.filename });
  }
});

// 2. 画像処理
router.post('/imageMake', imageMakeHandle);

export default router;

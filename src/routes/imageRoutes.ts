import { Router } from 'express';
import { imageMakeHandle } from '../controllers/controller';
import { uploadController } from '../controllers/uploadController';
import { authController } from '../controllers/authController';
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
router.post('/upload', upload.single('file'), uploadController);

// 2. 画像処理
router.post('/imageMake', imageMakeHandle);

// ========== 認証系 ==========
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;

import { Request, Response } from 'express';
import { doBusinessLogic } from '../services/service';
import * as fs from 'fs'; 

export const imageMakeHandle = async (req: Request, res: Response) => {
  try {
    const result = await doBusinessLogic(req.body);
    if (result.imageFilePath && fs.existsSync(result.imageFilePath)) {
      // 画像ファイルが存在すればダウンロードさせる
      res.download(result.imageFilePath, 'gemini-native-image.png', (err) => {
        if (err) {
          // ダウンロードエラー時はJSONを返す
          res.status(500).json({ error: "画像のダウンロード中にエラーが発生しました。" });
        }
      });
    } else {
      // 画像がない場合はJSONレスポンス
      res.json({ result: result.text });
    }
  } catch (err) {
    res.status(500).json({
      error: "業務ロジックの実行中にエラーが発生しました。",
      message: err instanceof Error ? err.message : String(err)
    });
  }
};

import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

export async function doBusinessLogic(data: { imagePath: string }): Promise<{ text: string; imageFilePath?: string }> {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

  // 画像データを読み込む
  const base64Image = readImageData(data.imagePath);

  // .env から prompt を取得
  const prompt = getPromptFromEnv();

  // Gemini APIを呼び出す
  const response = await callGeminiAPI(ai, prompt, base64Image);

  // ディレクトリを作成
  const dirPath = path.join(__dirname, '..', '..', 'gemini-native-image');
  ensureDirectoryExists(dirPath);

  // レスポンスを処理
  const { resultText, imageFilePath } = processResponse(response, dirPath);

  return { text: resultText.trim(), imageFilePath };
}

// 画像データを読み込む関数
function readImageData(imagePath: string): string {
  const imageData = fs.readFileSync(imagePath);
  return imageData.toString("base64");
}

// Gemini API を呼び出す関数
async function callGeminiAPI(ai: GoogleGenAI, prompt: string, base64Image: string) {
  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  return await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
}

// .env から prompt を取得する関数
function getPromptFromEnv(): string {
  // 優先順位をつけて環境変数を取得
  const prompt =
    process.env.GEMINI_PROMPT ?? process.env.PROMPT_TEXT ?? process.env.PROMPT ?? "";
  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Geminiのプロンプトが環境変数に設定されていません。.env に GEMINI_PROMPT を設定してください。");
  }
  return prompt;
}

// ディレクトリを作成する関数
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// レスポンスを処理する関数
function processResponse(response: any, dirPath: string): { resultText: string; imageFilePath?: string } {
  let resultText = "";
  let imageFilePath: string | undefined;

  const candidates = response.candidates;
  if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
    for (const part of candidates[0].content.parts) {
      if (part.text) {
        resultText += part.text + "\n";
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        if (typeof imageData === "string") {
          const filePath = path.join(dirPath, "gemini-native-image.png");
          const buffer = Buffer.from(imageData, "base64");
          fs.writeFileSync(filePath, buffer);
          imageFilePath = filePath; // パスを保持
          resultText += "画像を gemini-native-image/gemini-native-image.png として保存しました。\n";
        } else {
          resultText += "画像データが取得できませんでした。\n";
        }
      }
    }
  } else {
    resultText = "AIからの有効なレスポンスがありませんでした。";
  }

  return { resultText, imageFilePath };
}

// ファイルアップロードサービス
export const uploadService = async (file: Express.Multer.File) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext !== '.png') {
    // PNG以外は削除
    await fs.promises.unlink(file.path);
    throw new Error('Only PNG files are allowed');
  }

  // 正常ならファイル情報を返す
  return {
    message: 'File uploaded',
    filename: file.filename,
  };
};

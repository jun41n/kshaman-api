import { Router, type IRouter } from "express";
import OpenAI from "openai";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const router: IRouter = Router();

const PROMPTS: Record<string, string> = {
  aging: "이 사람의 얼굴을 약 20~25년 후 모습으로 자연스럽게 노화시켜 주세요. 동일한 인물이지만 나이 든 버전으로, 주름·흰머리·피부 변화 등을 사실적으로 반영하되 아름답게 표현해 주세요. 배경과 조명은 원본과 동일하게 유지하세요.",
  baby: "이 사람의 얼굴 특징을 분석해서 이 사람을 닮은 귀여운 아기(0~1세) 얼굴을 생성해 주세요. 통통하고 귀여운 아기 얼굴로, 눈·코·입의 유전적 특징이 반영되어야 합니다. 배경은 밝고 따뜻한 톤으로 해주세요.",
  anime: "이 사람의 얼굴을 고품질 일본 애니메이션 스타일 캐릭터로 변환해 주세요. 원본 얼굴의 눈·코·입·표정 특징을 살려서 애니메이션 아트로 재탄생시켜 주세요. 선명하고 깔끔한 애니메이션 일러스트 스타일로, 밝고 생동감 있게 표현해 주세요.",
};

router.post("/generate-face-image", async (req, res): Promise<void> => {
  const { imageBase64, type } = req.body as { imageBase64?: string; type?: string };

  if (!imageBase64 || !type || !PROMPTS[type]) {
    res.status(400).json({ error: "imageBase64와 type(aging|baby|anime)이 필요합니다." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OpenAI API 키가 설정되지 않았습니다." });
    return;
  }

  const tmpFile = path.join(os.tmpdir(), `face-${Date.now()}.png`);

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(tmpFile, Buffer.from(base64Data, "base64"));

    const openai = new OpenAI({ apiKey });

    req.log?.info({ type }, "[이미지생성] gpt-image-1 편집 시작");

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: fs.createReadStream(tmpFile),
      prompt: PROMPTS[type],
      n: 1,
      size: "1024x1024",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) throw new Error("응답에 이미지 데이터가 없습니다.");

    const resultBase64 = `data:image/png;base64,${b64}`;

    req.log?.info({ type }, "[이미지생성] 완료");
    res.json({ imageBase64: resultBase64 });
  } catch (err) {
    req.log?.error({ err, type }, "[이미지생성] 오류");
    res.status(500).json({ error: "이미지 생성 중 오류가 발생했습니다." });
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

export default router;

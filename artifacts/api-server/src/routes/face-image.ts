import { Router, type IRouter } from "express";
import OpenAI, { toFile } from "openai";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const router: IRouter = Router();

const PROMPTS: Record<string, string> = {
  aging:
    "미래를 예측하는 이미지가 아니라 창작용 스타일 변환으로, 이 사람의 얼굴을 약 20~25년 나이 든 캐릭터처럼 표현해 주세요. 동일 인물의 창작 버전임이 느껴지도록 자연스러운 주름·흰머리·스타일 변화를 더하고 배경과 조명은 원본과 비슷하게 유지하세요.",
  baby: "유전이나 실제 자녀를 예측하지 않는 창작 이미지로, 이 사진의 색감과 따뜻한 분위기에서 영감을 받은 귀여운 아기 캐릭터를 생성해 주세요. 특정인의 미래 자녀라고 주장할 수 있는 표현은 피하고, 배경은 밝고 따뜻한 톤으로 해주세요.",
  anime:
    "이 사람의 얼굴을 고품질 일본 애니메이션 스타일 캐릭터로 변환해 주세요. 원본 얼굴의 눈·코·입·표정 특징을 살려서 애니메이션 아트로 재탄생시켜 주세요. 선명하고 깔끔한 애니메이션 일러스트 스타일로, 밝고 생동감 있게 표현해 주세요.",
};

const PAST_LIFE_CAREERS: Record<string, string> = {
  "조선의 임금": "용포와 익선관을 착용한 왕, 궁궐의 단청과 어좌가 보이는 장면",
  "왕실의 책사": "유교 관복을 입고 서책과 지도 앞에 선 왕실 책사",
  "암행어사": "검소한 도포와 마패를 든 암행어사, 한양의 골목 배경",
  "포도대장": "조선 군관복과 지휘봉을 든 포도대장, 성문 경비 장면",
  "전장의 무사": "조선 갑옷과 검을 갖춘 무사, 성곽과 깃발이 있는 장면",
  "명궁": "활과 화살을 든 조선 궁수, 훈련장 배경",
  "수군 장수": "조선 수군 장수 복식, 판옥선과 바다가 보이는 장면",
  "유학자 선비": "갓과 도포를 입고 서재에서 붓글씨를 쓰는 선비",
  "서당 훈장": "서당에서 책을 든 훈장, 나무 창과 서책이 있는 장면",
  "궁중 화원": "궁중 화원 복식으로 그림을 그리는 예술가, 화폭과 먹이 있는 장면",
  "궁중 악사": "전통 악기를 연주하는 궁중 악사, 연회장 배경",
  "왕실 의관": "조선 의관 복식, 약재와 의서가 놓인 진료 공간",
  "궁중 의녀": "단정한 조선 의녀 복식, 약재와 침구가 있는 장면",
  "마을의 무당": "전통 무속 의례의 상징적 색감, 신당 앞에서 의례를 준비하는 무당",
  "풍수지리사": "산세와 지도를 살피는 풍수지리사, 두루마리 지도를 든 장면",
  "대장간 장인": "대장간에서 망치와 모루를 다루는 장인, 불꽃과 철물이 보이는 장면",
  "도자기 장인": "물레 앞에서 도자기를 빚는 장인, 가마와 그릇이 있는 장면",
  "대목장": "나무 기둥과 연장을 다루는 대목장, 한옥 공사 현장",
  "한지 장인": "한지를 뜨는 장인, 종이와 물이 있는 작업장",
  "염색 장인": "천을 물들이는 장인, 전통 염료와 천이 걸린 작업장",
  "보부상": "등짐을 메고 장터를 걷는 보부상, 전통 시장 배경",
  "객주 주인": "객주에서 장부와 물품을 관리하는 상인, 한양 상점 배경",
  "약초상": "약재 서랍과 약초를 정리하는 약초상, 약방 배경",
  "농사꾼": "들판에서 농사일을 하는 농부, 계절감 있는 논밭 배경",
  "바다의 어부": "조선시대 어선 위에서 그물을 다루는 어부, 바다 배경",
  "산의 사냥꾼": "산길에서 활을 든 사냥꾼, 소나무 숲 배경",
  "나루터 뱃사공": "나루터의 작은 배를 모는 뱃사공, 강과 산 배경",
  "떠돌이 광대": "전통 연희 복장으로 마당에서 공연하는 광대",
  "궁중 예인": "단아한 조선 예인 복식, 궁중 연회 공간",
  "성실한 살림지기": "조선시대 생활복을 입고 살림을 돌보는 인물, 한옥 마당 배경",
  "비밀 정보원": "수수한 도포 차림으로 밀서를 든 조선시대 밀사, 달빛 골목 배경",
};

function buildPastLifePrompt(career: string): string | null {
  const scene = PAST_LIFE_CAREERS[career];
  if (!scene) return null;
  return `업로드된 사람의 얼굴 정체성, 얼굴 비율, 눈·코·입·표정을 최대한 유지한 고품질 조선시대 전생 캐릭터 인물화입니다. 이 인물은 ${scene}입니다. 복식·배경·소품으로 직업을 분명히 보여 주세요. 실사 기반의 영화 스틸처럼 자연스럽고 존중감 있게 표현하세요. 얼굴을 다른 사람으로 바꾸지 말고, 글자·워터마크·현대 물건은 넣지 마세요.`;
}

router.post("/generate-face-image", async (req, res): Promise<void> => {
  const { imageBase64, type, career } = req.body as {
    imageBase64?: string;
    type?: string;
    career?: string;
  };

  const prompt = type === "pastLife" && career ? buildPastLifePrompt(career) : PROMPTS[type ?? ""];
  if (!imageBase64 || !type || !prompt) {
    res
      .status(400)
      .json({ error: "imageBase64와 유효한 type(aging|baby|anime|pastLife)이 필요합니다." });
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

    console.info("[이미지생성] gpt-image-1 편집 시작", { type });

    const imageFile = await toFile(fs.createReadStream(tmpFile), "face.png", {
      type: "image/png",
    });

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) throw new Error("응답에 이미지 데이터가 없습니다.");

    const resultBase64 = `data:image/png;base64,${b64}`;

    console.info("[이미지생성] 완료", { type });
    res.json({ imageBase64: resultBase64 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[face-image] generation failed", { type, message });
    console.error("[이미지생성] 오류", { err, type });
    res.status(500).json({ error: "이미지 생성 중 오류가 발생했습니다." });
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

export default router;

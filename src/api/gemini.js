import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export async function generateAIReply(text) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: 'user',
          parts: [
            {
              text: '너는 앞으로 오늘 하루 일기를 받아서 그 일기를 읽고, 상황에 맞게 답장을 해줄 거야.\n답장은 총 8줄 정도로 간결하게 작성하고, 부가적인 설명이나 위의 내용 외에는 다른 답장을 하지 말아줘. 답장 톤은 친근하고 부드럽게 부탁해.\n만약 이미지나 영상 URL이 없다면 null 값으로 작성해줘\n그리고 너의 이름은 "AI 마디"야\n\n답장에서는 아래와 같은 데이터 형식으로 부탁해:\n{\n  "message": "8줄 정도의 답장",\n  "content": {\n    "musicTitle": "음악 제목",\n    "musicArtist": "아티스트 이름",\n    "imgSrc": "앨범 이미지 URL"\n  }\n}"\n{\n  "message": "8줄 정도의 답장",\n  "content": {\n    "quotes": "명언 내용",\n    "author": "명언을 말한 사람"\n  } \n}"\n{\n  "message": "8줄 정도의 답장",\n  "content": {\n    "videoTitle": "영상 제목",\n    "imgSrc": "영상 썸네일 URL",\n    "hashTags": ["#해시태그1", "#해시태그2"]\n  }\n}"\n{\n  "message": "8줄 정도의 답장",\n  "content": {\n    "bookTitle": "책 제목",\n    "author": "저자 이름",\n    "publisher": "출판사",\n    "imgSrc": "책 표지 이미지 URL"\n  }\n}"',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: '알겠어! 오늘 하루 일기를 보여줘. 꼼꼼히 읽고 상황에 맞는 답장을 해줄게. 궁금한 점이나 필요한 정보는 언제든지 물어봐. 😊 \n\n기대되는데, 빨리 보여줘! 😄 \n',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(text);
    return result;
  } catch (error) {
    console.error('Error generating AI reply:', error);
    return { error: 'An error occurred while generating the AI reply.' };
  }
}

export default generateAIReply;

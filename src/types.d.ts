type ContactResponseTime = {
  name: string;
  responseTime: string;
};

type Sentiment = {
  positive: string;
  negative: string;
  neutral: string;
};

type ContactEmojis = {
  name: string;
  rate: number;
  emojis: string;
};

type Emotion = {
  emotion: string;
  frequency: string;
};

type Topic = {
  topic: string;
  frequency: string;
};

type CelebMatch = {
  name: string;
  matchPercent: string;
  imgPath: string;
};

type WordFreq = {
  text: string;
  value: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  avgResponseTime: string;
  contactResTimes: ContactResponseTime[];
  avgTextLength: number;
  msgFreqDay: number;
  convoInitFreq: string;
  msgSentiment: Sentiment;
  totalMessages: number;
  messagesPerDay: string;
  favEmojis: string;
  emojisByContact: ContactEmojis[];
  emotions: Emotion[];
  topics: Topic[];
  personality: string;
  celebMatches: CelebMatch[];
  wordFreqs: WordFreq[];
};

export type Choice = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  question: string;
  explanation: string;
  choices: Choice[];
};

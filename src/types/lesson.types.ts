export type LessonLevel =
  | "CƠ BẢN"
  | "TRUNG CẤP"
  | "NÂNG CAO"
  | "TRA CỨU"
  | "THỰC HÀNH";

export interface LessonSection {
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  part: number;
  title: string;
  level: LessonLevel;
  description: string;
  keywords: string[];
  sections: LessonSection[];
}
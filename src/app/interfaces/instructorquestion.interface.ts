export interface InstructorQuestion {
  _id: number;
  student_id: number;
  instructor_id: number;
  lesson_id: number;
  question_text: string;
  question_answer: string;
}

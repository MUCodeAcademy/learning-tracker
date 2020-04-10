export interface Quiz {
    _id: string,
    quizName?: string,
    quizWeek?: number,
    cohort?: number,
    questions?: [
        {
            Q?: string,
            A?: string,
            Choices?: string[],
            code?: string,
        }
    ]
}
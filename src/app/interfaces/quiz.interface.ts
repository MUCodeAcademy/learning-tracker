export interface Quiz {
    quizName?: string
    quizWeek?: number
    cohort?: number
    questions?: [
        {
            Q?: string
            A?: string
            Choices?: string[]
            code?: string
        }
    ]
}
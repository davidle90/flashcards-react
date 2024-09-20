export interface Flashcard {
    id: number | undefined;
    question: string;
    answer: string;
}

export interface FlashcardSet {
    id: number | undefined,
    category: string;
    description: string;
    flashcards: Flashcard[];
}
  
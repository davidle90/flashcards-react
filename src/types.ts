export interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

export interface FlashcardSet {
    category: string;
    description: string;
    flashcards: Flashcard[];
}
  
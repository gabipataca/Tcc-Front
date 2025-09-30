import { Exercise } from "@/types/Exercise";
import { EditExerciseRequest } from "@/types/Exercise/Requests";

export interface EditExerciseModalProps {
    open: boolean;
    onClose: () => void;
    editingExercise: Exercise;
    saveEdit: (exercise: EditExerciseRequest) => Promise<void>;
    cancelEdit: () => void;
}
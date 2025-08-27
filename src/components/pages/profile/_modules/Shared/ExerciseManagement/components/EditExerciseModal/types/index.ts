import { Exercise } from "@/types/Exercise";
import { EditExerciseRequestFormValues } from "../../../types";

export interface EditExerciseModalProps {
    open: boolean;
    onClose: () => void;
    editingExercise: Exercise;
    saveEdit: (exercise: EditExerciseRequestFormValues) => Promise<void>;
    cancelEdit: () => void;
}
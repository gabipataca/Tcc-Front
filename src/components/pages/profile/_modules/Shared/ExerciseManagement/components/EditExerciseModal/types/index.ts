import { Control } from "react-hook-form";
import { EditExerciseRequestFormValues } from "../../../types";

export interface EditExerciseModalProps {
    open: boolean;
    onClose: () => void;
    editingExercise: EditExerciseRequestFormValues;
    saveEdit: () => void;
    cancelEdit: () => void;
    editExerciseControl: Control<EditExerciseRequestFormValues, unknown, EditExerciseRequestFormValues>
}
import { useState } from "react";
import { studentsData } from "../../../hooks/mockData";

const useStudentsTable = () => {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        student: (typeof studentsData)[0] | null;
    }>({
        isOpen: false,
        student: null,
    });

    const filteredStudents = studentsData.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.group.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || student.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSelectAll = (checked: boolean) => {
        setSelectedStudents(checked ? filteredStudents.map((s) => s.id) : []);
    };

    const handleSelectStudent = (studentId: number, checked: boolean) => {
        setSelectedStudents((prev) =>
            checked
                ? [...prev, studentId]
                : prev.filter((id) => id !== studentId)
        );
    };

    return {
        selectedStudents,
        searchTerm,
        statusFilter,
        deleteDialog,
        filteredStudents,
        setSearchTerm,
        setStatusFilter,
        setDeleteDialog,
        handleSelectAll,
        handleSelectStudent,
    };
};

export default useStudentsTable;

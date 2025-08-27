import { useState, useMemo } from "react";
import {
    studentsData,
    professorsData,
    groupsData,
    Student,
    Professor,
    Group,
} from "./mockData";

export const useAdminDashboard = () => {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        item: any | null;
        itemType: string;
    }>({
        isOpen: false,
        item: null,
        itemType: "",
    });
    const [editDialog, setEditDialog] = useState<{
        isOpen: boolean;
        item: any | null;
        itemType: string;
    }>({
        isOpen: false,
        item: null,
        itemType: "",
    });
    const [accessCodeDialog, setAccessCodeDialog] = useState<{
        isOpen: boolean;
        code: string;
    }>({
        isOpen: false,
        code: "PROF2024",
    });

    // Filtered data based on search and status
    const filteredStudents = useMemo(() => {
        return studentsData.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.group.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || student.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    const filteredProfessors = useMemo(() => {
        return professorsData.filter(
            (professor) =>
                professor.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                professor.department
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const filteredGroups = useMemo(() => {
        return groupsData.filter((group) => {
            const matchesSearch = group.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || group.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    // Handlers
    const handleSelectAllStudents = (checked: boolean) => {
        setSelectedStudents(checked ? filteredStudents.map((s) => s.id) : []);
    };

    const handleSelectStudent = (studentId: number, checked: boolean) => {
        setSelectedStudents((prev) =>
            checked
                ? [...prev, studentId]
                : prev.filter((id) => id !== studentId)
        );
    };

    const openDeleteDialog = (
        item: Student | Professor | Group,
        itemType: string
    ) => {
        setDeleteDialog({ isOpen: true, item, itemType });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog({ isOpen: false, item: null, itemType: "" });
    };

    const openEditDialog = (
        item: Student | Professor | Group,
        itemType: string
    ) => {
        setEditDialog({ isOpen: true, item, itemType });
    };

    const closeEditDialog = () => {
        setEditDialog({ isOpen: false, item: null, itemType: "" });
    };

    const handleConfirmDelete = () => {
        // Logic to delete the item
        console.log(
            `Deleting ${deleteDialog.itemType} with ID:`,
            deleteDialog.item.id
        );
        closeDeleteDialog();
    };

    const handleConfirmEdit = (updatedItem: any) => {
        console.log(
            `Editing ${editDialog.itemType} with new data:`,
            updatedItem
        );
        closeEditDialog();
    };

    const handleSaveAccessCode = (newCode: string) => {
        setAccessCodeDialog({ isOpen: false, code: newCode });
    };

    return {
        selectedStudents,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        deleteDialog,
        editDialog,
        accessCodeDialog,
        filteredStudents,
        filteredProfessors,
        filteredGroups,
        handleSelectAllStudents,
        handleSelectStudent,
        openDeleteDialog,
        closeDeleteDialog,
        openEditDialog,
        closeEditDialog,
        handleConfirmDelete,
        handleConfirmEdit,
        handleSaveAccessCode,
        setAccessCodeDialog,
    };
};

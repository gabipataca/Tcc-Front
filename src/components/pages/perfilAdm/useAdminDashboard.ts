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
    // Agora mantemos os dados no estado (para sincronizar edições/deleções)
    const [students, setStudents] = useState<Student[]>(studentsData);
    const [professors, setProfessors] = useState<Professor[]>(professorsData);
    const [groups, setGroups] = useState<Group[]>(groupsData);

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
        return students.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.group.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || student.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [students, searchTerm, statusFilter]);

    const filteredProfessors = useMemo(() => {
        return professors.filter(
            (professor) =>
                professor.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                professor.department
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [professors, searchTerm]);

    const filteredGroups = useMemo(() => {
        return groups.filter((group) => {
            const matchesSearch = group.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || group.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [groups, searchTerm, statusFilter]);

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
        if (!deleteDialog.item) return;

        if (deleteDialog.itemType === "student") {
            setStudents((prev) =>
                prev.filter((s) => s.id !== deleteDialog.item.id)
            );
        } else if (deleteDialog.itemType === "professor") {
            setProfessors((prev) =>
                prev.filter((p) => p.id !== deleteDialog.item.id)
            );
        } else if (deleteDialog.itemType === "group") {
            setGroups((prev) =>
                prev.filter((g) => g.id !== deleteDialog.item.id)
            );
        }

        closeDeleteDialog();
    };

    const handleConfirmEdit = (updatedItem: any) => {
        if (editDialog.itemType === "student") {
            setStudents((prev) =>
                prev.map((s) => (s.id === updatedItem.id ? updatedItem : s))
            );
        } else if (editDialog.itemType === "professor") {
            setProfessors((prev) =>
                prev.map((p) => (p.id === updatedItem.id ? updatedItem : p))
            );
        } else if (editDialog.itemType === "group") {
            setGroups((prev) =>
                prev.map((g) => (g.id === updatedItem.id ? updatedItem : g))
            );
        }

        closeEditDialog();
    };

    const handleSaveAccessCode = (newCode: string) => {
        setAccessCodeDialog({ isOpen: false, code: newCode });
    };

    return {
        students,
        professors,
        groups,
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

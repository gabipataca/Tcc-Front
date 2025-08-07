import { useState } from "react";
import { groupsData } from "../../../hooks/mockData";

const useGroupsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredGroups = groupsData.filter((group) => {
        const matchesSearch = group.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || group.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        filteredGroups,
    };
};

export default useGroupsTable;
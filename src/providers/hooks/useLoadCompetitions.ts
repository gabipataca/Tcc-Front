import { convertTimeSpanToNumber } from "@/libs/utils";
import CompetitionService from "@/services/CompetitionService";
import { Competition } from "@/types/Competition";
import { UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

export const useLoadCompetitions = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const addNewCompetition = useCallback((newCompetition: Competition) => {
        setCompetitions((prev) => [...prev, newCompetition]);
    }, []);

    const toggleLoading = useCallback(() => {
        setIsLoading((prev) => !prev);
    }, []);

    const loadCompetitions = useCallback(async () => {
        try {
            toggleLoading();
            const response = await CompetitionService.getCompetitionTemplates();
            if (response.status !== 200) {
                
                enqueueSnackbar("Erro ao carregar modelos de competições.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    autoHideDuration: 3000,
                });
                toggleLoading();
                return;
            }

            const data = response.data!;

            data.forEach((comp) => {
                comp.duration = 90;
                comp.submissionPenalty = 20;
                comp.maxExercises = 4;
                comp.maxSubmissionSize = 20;
                comp.stopRanking = null;
                comp.blockSubmissions = null;
                comp.startInscriptions = new Date(comp.startInscriptions!);
                comp.endInscriptions = null;
                comp.startTime = new Date(comp.startTime!);
                comp.endTime = new Date(comp.endTime!);
            })

            setCompetitions(data);
        } catch (error) {
            console.error("Error loading competitions:", error);
            enqueueSnackbar("Erro ao carregar modelos de competições.", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                autoHideDuration: 3000,
            });
        } finally {
            toggleLoading();
        }
    }, [enqueueSnackbar, toggleLoading]);

    const updateCompetition = useCallback(
        async (data: UpdateCompetitionRequest) => {
            try {
                toggleLoading();
                const response = await CompetitionService.updateCompetition(
                    data
                );
                if (response.status !== 200) {
                    enqueueSnackbar("Erro ao atualizar competição.", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        autoHideDuration: 3000,
                    });
                    toggleLoading();
                    return;
                }
                setCompetitions((prev) =>
                    prev.map((comp) =>
                        comp.id === response.data!.id
                            ? ({
                                  id: response.data!.id,
                                  name: response.data!.name,
                                  description: response.data!.description || "",
                                  blockSubmissions: response.data
                                      ?.blockSubmissions
                                      ? new Date(
                                            response.data!.blockSubmissions
                                        )
                                      : null,
                                  duration: convertTimeSpanToNumber(
                                      response.data!.duration
                                  ),
                                  startInscriptions: response.data
                                      ?.startInscriptions
                                      ? new Date(
                                            response.data!.startInscriptions
                                        )
                                      : null,
                                  endInscriptions: response.data
                                      ?.endInscriptions
                                      ? new Date(response.data!.endInscriptions)
                                      : null,
                                  startTime: new Date(response.data!.startTime),
                                  endTime: new Date(response.data!.endTime),
                                  maxExercises: response.data!.maxExercises,
                                  maxSubmissionSize:
                                      response.data!.maxSubmissionSize,
                                  submissionPenalty: convertTimeSpanToNumber(
                                      response.data!.submissionPenalty
                                  ),
                                  stopRanking: new Date(
                                      response.data!.stopRanking
                                  ),
                                  status: response.data!.status,
                              } satisfies Competition)
                            : comp
                    )
                );
            } catch (error) {
                console.error("Error updating competition:", error);
                enqueueSnackbar("Erro ao atualizar competição.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    autoHideDuration: 3000,
                });
            } finally {
                toggleLoading();
            }
        },
        [enqueueSnackbar, toggleLoading]
    );

    return {
        loadCompetitions,
        competitions,
        isLoading,
        updateCompetition,
        toggleLoading,
        addNewCompetition,
    };
};

export default useLoadCompetitions;

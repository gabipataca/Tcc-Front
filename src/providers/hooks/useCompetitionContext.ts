import { useCallback, useMemo } from "react";
import useLoadCompetitions from "./useLoadCompetitions";
import { Competition } from "@/types/Competition";
import { CreateCompetitionRequest } from "@/types/Competition/Requests";
import CompetitionService from "@/services/CompetitionService";
import { convertTimeSpanToNumber } from "@/libs/utils";
import { enqueueSnackbar } from "notistack";

const useCompetitionContext = () => {
    const {
        competitions,
        isLoading,
        loadCompetitions,
        addNewCompetition,
        toggleLoading,
        updateCompetition,
    } = useLoadCompetitions();

    const competitionModels = useMemo(() => {
        return competitions.filter((x) => x.status == 5);
    }, [competitions]);

    const addCompetitionModel = useCallback(
        (newCompetitionModel: Competition) => {
            addNewCompetition(newCompetitionModel);
        },
        [addNewCompetition]
    );

    const createCompetition = useCallback(
        async (payload: CreateCompetitionRequest) => {
            try {
                toggleLoading();
                const res = await CompetitionService.createCompetition(payload);

                if (res.status == 201) {
                    console.log(res.data);
                    addCompetitionModel({
                        id: res.data!.id,
                        blockSubmissions: res.data?.blockSubmissions
                            ? new Date(res.data!.blockSubmissions)
                            : null,
                        duration: res.data?.duration
                            ? new Date(
                                  convertTimeSpanToNumber(res.data!.duration)
                              )
                            : null,
                        endInscriptions: res.data?.endInscriptions
                            ? new Date(res.data!.endInscriptions)
                            : null,
                        endTime: res.data?.endTime
                            ? new Date(res.data!.endTime)
                            : null,
                        maxExercises: res.data!.maxExercises,
                        maxSubmissionSize: res.data!.maxSubmissionSize,
                        name: res.data!.name,
                        description: res.data?.description || "",
                        startInscriptions: res.data?.startInscriptions
                            ? new Date(
                                  convertTimeSpanToNumber(
                                      res.data!.startInscriptions
                                  )
                              )
                            : null,
                        startTime: new Date(res.data!.startTime),
                        status: res.data!.status,
                        stopRanking: res.data?.stopRanking
                            ? new Date(res.data!.stopRanking)
                            : null,
                        submissionPenalty: res.data?.submissionPenalty
                            ? convertTimeSpanToNumber(
                                  res.data!.submissionPenalty
                              )
                            : null,
                    });

                    enqueueSnackbar(
                        "Modelo de Competição criado com sucesso!",
                        {
                            variant: "success",
                            autoHideDuration: 2500,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "right",
                            },
                        }
                    );
                    toggleLoading();
                    return;
                }
            } catch (error) {
                console.error("Error creating competition model:", error);
                enqueueSnackbar("Erro ao criar modelo de competição.", {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } finally {
                toggleLoading();
            }
        },
        [addCompetitionModel, toggleLoading]
    );

    return {
        competitions,
        competitionModels,
        isLoading,
        addCompetitionModel,
        createCompetition,
        loadCompetitions,
        addNewCompetition,
        toggleLoading,
        updateCompetition,
    };
};

export default useCompetitionContext;

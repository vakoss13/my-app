import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getColloquiumByDate, getColloquiumsByFilter, addColloquium } from '../api/colloquiums'

export const useColloquium = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0]

    return useQuery({
        queryKey: ['colloquium', dateKey],
        queryFn: () => getColloquiumByDate(dateKey),
        enabled: !!dateKey,
    })
}

export const useColloquiumsByFilter = (subject: string, year: number, session: string, studyYear: number) => {
    return useQuery({
        queryKey: ['colloquiums', subject, year, session, studyYear],
        queryFn: () => getColloquiumsByFilter(subject, year, session, studyYear),
        enabled: !!subject && !!year && !!session && !!studyYear,
    })
}

export const useAddColloquium = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addColloquium,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['colloquiums', variables.subject_id, variables.year, variables.session, variables.study_year]
            })
        }
    })
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentService } from '@/services/student.service'

export const useAssignments = () => {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: studentService.getAssignments
  })
}

export const useAssignment = (id: number) => {
  return useQuery({
    queryKey: ['assignment', id],
    queryFn: () => studentService.getAssignment(id)
  })
}

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, url }: { id: number; url: string }) => 
      studentService.submitAssignment(id, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    }
  })
}

export const useFileUpload = () => {
  return useMutation({
    mutationFn: studentService.uploadFile
  })
}

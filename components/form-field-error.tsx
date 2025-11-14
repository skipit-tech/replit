type FormFieldErrorProps = {
  id: string
  error?: string
}

export function FormFieldError({ id, error }: FormFieldErrorProps) {
  if (!error) return null

  return (
    <p 
      id={id} 
      role="alert"
      aria-live="assertive"
      className="text-sm text-red-600 dark:text-red-400 mt-1"
    >
      {error}
    </p>
  )
}

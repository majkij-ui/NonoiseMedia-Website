export type QuestionnaireOption = {
  id: string
  label: string
  hasInput?: boolean
}

export type QuestionnaireField = {
  id: string
  label: string
  type?: string
  placeholder?: string
}

export type QuestionnaireSection =
  | {
      id: string
      title: string
      description: string
      type: "radio"
      /** When true, users can pick several options; payload lists all choices. */
      multiple?: boolean
      options: QuestionnaireOption[]
    }
  | {
      id: string
      title: string
      description: string
      type: "text-group"
      questions: QuestionnaireField[]
    }
  | {
      id: string
      title: string
      description: string
      type: "textarea"
      questions: QuestionnaireField[]
    }
  | {
      id: string
      title: string
      description: string
      type: "mixed"
      multiple?: boolean
      questions: QuestionnaireField[]
      options: QuestionnaireOption[]
    }

export type QuestionnaireContent = {
  header: { title: string; subtitle: string; startCta: string }
  sections: QuestionnaireSection[]
  contact: {
    title: string
    email: string
    phone: string
    nameLabel: string
    namePlaceholder: string
    sendButton: string
    missingContact: string
    submitting: string
    success: string
    error: string
  }
}

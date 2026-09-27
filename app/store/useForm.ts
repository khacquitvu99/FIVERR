// src/hooks/useForm.ts
import { useState } from 'react';
import { validateForm, FormRules, FormErrors } from '@/(pages)/validation';

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: FormRules<T>
) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const setFieldValue = (name: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (onSubmit: (data: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    setFormData,
  };
}
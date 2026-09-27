
export interface ValidationRule {
  required?: boolean;
  message?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any, formValues?: any) => boolean | string;
}

export type FormRules<T> = {
  [K in keyof T]?: ValidationRule[];
};

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Hàm kiểm tra lỗi động cho bất kỳ Form nào
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  rules: FormRules<T>
): FormErrors<T> => {
  const errors: FormErrors<T> = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    const value = formData[field];

    if (!fieldRules) continue;

    for (const rule of fieldRules) {
      // 1. Kiểm tra Required
      if (rule.required) {
        const isEmpty =
          value === undefined ||
          value === null ||
          (typeof value === 'string' && value.trim() === '') ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          errors[field] = rule.message || 'Trường này không được để trống';
          break; // Dừng kiểm tra rule tiếp theo của field này nếu đã lỗi
        }
      }

      // Nếu field rỗng và không required thì bỏ qua các rule sau
      if (value === undefined || value === null || value === '') continue;

      // 2. Kiểm tra minLength
      if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        errors[field] = rule.message || `Phải có ít nhất ${rule.minLength} ký tự`;
        break;
      }

      // 3. Kiểm tra maxLength
      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        errors[field] = rule.message || `Không được vượt quá ${rule.maxLength} ký tự`;
        break;
      }

      // 4. Kiểm tra Regex Pattern (Email, Phone,...)
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        errors[field] = rule.message || 'Định dạng không hợp lệ';
        break;
      }

      // 5. Custom Validate function (dùng cho Nhập lại mật khẩu, custom logic...)
      if (rule.validate) {
        const customResult = rule.validate(value, formData);
        if (typeof customResult === 'string') {
          errors[field] = customResult;
          break;
        } else if (!customResult) {
          errors[field] = rule.message || 'Dữ liệu không hợp lệ';
          break;
        }
      }
    }
  }

  return errors;
};

// Các Pattern Regex dùng chung
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, // Số điện thoại Việt Nam
  PASSWORD: /^(?=.*[A-Z])(?=.*\d).{6,12}$/,
};
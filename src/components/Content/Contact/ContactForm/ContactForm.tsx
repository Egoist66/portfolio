import { useAppContext } from "../../../../context/AppContext";
import styled, { css } from "styled-components";
import { FormEvent, useEffect, useMemo } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 520px;
  margin: 0 auto;
`;

const fieldBase = css<{ $error?: boolean }>`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: ${({ theme }) => theme.styles.colors.textColor};
  background: ${({ theme }) => theme.styles.colors.surface};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.styles.colors.error : theme.styles.colors.border};
  border-radius: ${({ theme }) => theme.styles.radius.md};
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder {
    color: ${({ theme }) => theme.styles.colors.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.styles.colors.borderFocus};
    box-shadow: 0 0 0 3px rgba(124, 108, 240, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledInput = styled.input<{ $error?: boolean }>`
  ${fieldBase}
`;

const StyledTextArea = styled.textarea<{ $error?: boolean }>`
  ${fieldBase}
  min-height: 140px;
  resize: vertical;
`;

const StyledContactLink = styled.button`
  align-self: center;
  min-width: 200px;
  padding: 0.875rem 1.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: ${({ theme }) => theme.styles.colors.accentGradient};
  border: none;
  border-radius: ${({ theme }) => theme.styles.radius.full};
  box-shadow: ${({ theme }) => theme.styles.shadow.md};
  transition: transform ${({ theme }) => theme.styles.transition.fast},
    box-shadow ${({ theme }) => theme.styles.transition.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.styles.shadow.lg},
      ${({ theme }) => theme.styles.shadow.glow};
  }

  a {
    display: block;
    color: inherit;
  }
`;

function ContactForm() {
  const context = useAppContext();
  const { t } = useLanguage();

  useEffect(() => {
    if (context?.hasError) {
      context.hasError();
    }
  }, [context?.body, context?.subject]);

  const submitLinks = useMemo(() => {
    if (context?.inputError) {
      return (
        <StyledContactLink type="button">
          <a href="#submit-input">{t("contact.subjectEmpty")}</a>
        </StyledContactLink>
      );
    }
    if (context?.bodyError) {
      return (
        <StyledContactLink type="button">
          <a href="#submit-area">{t("contact.bodyEmpty")}</a>
        </StyledContactLink>
      );
    }
    return (
      <StyledContactLink type="button">
        <a
          href={`mailto:razormad666@gmail.com?subject=${context?.subject}&body=${context?.body}.`}
        >
          {t("contact.send")}
        </a>
      </StyledContactLink>
    );
  }, [
    context?.body,
    context?.subject,
    context?.bodyError,
    context?.inputError,
    t,
  ]);

  return (
    <StyledForm
      id="contact-form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <StyledInput
        id="submit-input"
        $error={context?.inputError}
        name="subject"
        value={context?.subject}
        onChange={context?.handleInput}
        placeholder={t("contact.subject")}
      />
      <StyledTextArea
        disabled={context?.subject === ""}
        id="submit-area"
        maxLength={2000}
        $error={context?.bodyError}
        placeholder={t("contact.message")}
        name="body"
        value={context?.body}
        onChange={context?.handleInput}
      />
      {submitLinks}
    </StyledForm>
  );
}

export default ContactForm;

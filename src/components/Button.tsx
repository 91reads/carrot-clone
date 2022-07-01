import styled from 'styled-components';

interface ButtonStyleProps {
  marginTop?: number;
  active?: boolean;
  activeColor?: string;
  normalColor?: string;
  backgroundColor?: string;
  borderDisabled?: boolean;
  disabled?: boolean;
}

const ButtonContainer = styled.button<ButtonStyleProps>`
  background: none;
  border: ${({ borderDisabled }) => borderDisabled ? 'none' : '1px solid var(--gray-2);'};
  border-radius: var(--br-6);
  padding: 1rem;
  margin-top: ${({ marginTop }) => marginTop ? `${marginTop}rem` : '0'};

  font-size: 1.8rem;
  line-height: 3rem;
  font-weight: var(--weight-600);

  background-color: ${({ backgroundColor }) => backgroundColor && `${backgroundColor}`};
  color: ${( props ) => props.active ? `${props.activeColor}` : `${props.normalColor}`};
`;

interface ButtonProps {
  large?: boolean;
  content: string;
  active?: boolean;
  activeColor?: string;
  normarColor?: string;
  marginTop?: number;
  backgroundColor?: string;
  borderDisabled?: boolean;
  [key: string]: any;
}

export default function xButton({
  content,
  active,
  activeColor,
  normalColor,
  marginTop,
  backgroundColor,
  borderDisabled,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer 
      {...rest} 
      marginTop={marginTop} 
      active={active} 
      activeColor={activeColor} 
      normalColor={normalColor}
      backgroundColor={backgroundColor}
      borderDisabled={borderDisabled}
      disabled={disabled}
    >
      {content}
    </ButtonContainer>
  );
}
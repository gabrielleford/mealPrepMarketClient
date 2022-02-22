import styled from "styled-components";

export const TagLabel = styled.label`
  border-radius: 50%;
`

export const CreateInput = styled.input`
  display: none;
  

  &:checked + ${TagLabel} {
  background: rgba(92, 219, 149, 0.3);
  border-radius: 10px;
  }
`
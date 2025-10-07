import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  margin-top: 16px;
`;

export default Form;

import styled from "styled-components";

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); // 4 equal sizes, repeat 4 times 1fr(1 evenly and distributed and equidistant size)
    column-gap: 20px;
    row-gap: 50px;
`;

export const Title = styled.h2`
    font-size: 38px; 
    margin-bottom: 25px;
    text-align: center;
`;
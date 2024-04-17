import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

const DirectoryItem = ({ category }) => {
    const { imageurl, title, route } = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'imageurl'}>
            <BackgroundImage imageurl={imageurl} />
        </StyleSheetManager>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
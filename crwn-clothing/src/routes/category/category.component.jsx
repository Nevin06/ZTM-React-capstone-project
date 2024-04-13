import './category.styles.scss';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams(); // Get the category from URL params
    const { categoriesMap } = useContext(CategoriesContext);
    // const products = categoriesMap[category];
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            <div className="category-container">
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Category;
import React from 'react';
import './category.css';
import { categoryInfos } from './CategoryFullInfos.js';
import CategoryCard from './CategoryCard';

function Category() {
    return (
        <section className='category-container'>
            {categoryInfos.map((infos) => (
                <CategoryCard data={infos} />
            ))}
        </section>
    );
}

export default Category;
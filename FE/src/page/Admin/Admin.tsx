import React from 'react'
import { useParams } from 'react-router-dom'
import Categories from './componentsAdmin/Categories'
import Products from './componentsAdmin/Products'

const Admin = () => {
    const { categoryID1 } = useParams()
    return (
        <>
            {
                !categoryID1 ? <Categories />: <Products />
            }
        </>
    )
}

export default Admin
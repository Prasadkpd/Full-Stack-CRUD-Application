import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then();
    }, []);


    const getProducts = async () => {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
    }

    const deleteProducts = async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts().then();
    }

    return (
        <div>
            <Link to="/add" className='button is-primary mt-2'>Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td> {index + 1}</td>
                        <td> {product.title}</td>
                        <td> {product.price}</td>
                        <td>
                            <Link to={`/edit/${product.id}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={() => deleteProducts(product.id)} className=""></button>
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
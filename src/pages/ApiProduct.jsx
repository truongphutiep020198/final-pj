import { Pagination } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoadingOutlined } from "@ant-design/icons";
import { fetchProductAction, searchProductAction } from "store/slices/productSlice/productSlice";
import ProductCard from "components/UI/product-card/ProductCard";
import { Col, Row, Container } from "reactstrap";
import Helmet from "components/Helmet/Helmet";
import CommonSection from "components/UI/common-section/CommonSection";
import axios from "axios";
import { URL_API } from "api/const.api";

export default function ApiProduct() {
    const productState = useSelector((state) => state.product.productState);
    const dispatch = useDispatch();

    const page = productState.pagination.page;
    const total = productState.pagination.total;
    const loading = productState.loading;

    useEffect(() => {
        // Dispatch action gọi product từ server => Slice => action
        // Nếu có saga đang theo dõi action này thì hàm tương ứng trong saga sẽ chạy => fetchProduct
        dispatch(fetchProductAction(1));
    }, []);

    const onPaginationChange = (page, pageSize) => {
        dispatch(fetchProductAction(page));
    };

    const onSearchProduct = (searchTerm) => {
        dispatch(searchProductAction(searchTerm));
        console.log(searchTerm);
    };
    // useEffect(() => {
    //     axios.get(`${URL_API}/products?q=chicken`)
    //         .then((response) => {
    //             console.log(response);
    //         });
    // }, [])

    // // 
    const [searchTerm, setSearchTerm] = useState("");

    // const [pageNumber, setPageNumber] = useState(0);

    // const searchedProduct = products.filter((item) => {
    //     if (searchTerm.value === "") {
    //         return item;
    //     }
    //     if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
    //         return item;
    //     } else {
    //         return console.log("not found");
    //     }
    // });

    return (
        <Helmet title="All-Foods">

            <CommonSection title="All Foods" />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6" xs="12">
                            <div className="search__widget d-flex align-items-center justify-content-between">
                                <input
                                    type="text"
                                    placeholder="I'm looking for...."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {/* <span onClick={() => { onSearchProduct(searchTerm) }}>
                                    <i className="ri-search-line"></i>
                                </span> */}
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                            <div className="sorting__widget text-end">
                                <select className="w-50">
                                    <option>Default</option>
                                    <option value="ascending">Alphabetically, A-Z</option>
                                    <option value="descending">Alphabetically, Z-A</option>
                                    <option value="high-price">High Price</option>
                                    <option value="low-price">Low Price</option>
                                </select>
                            </div>
                        </Col>

                        {productState.data.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                                <ProductCard item={item} />
                            </Col>
                        ))}
                        <Col lg="12" md="12" sm="12" xs="12" className="mb-4">
                            <Pagination
                                onChange={onPaginationChange}
                                pageSize={12}
                                current={page}
                                total={total}
                            />
                        </Col>

                        {loading && (
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <LoadingOutlined />
                            </div>
                        )}
                    </Row>

                </Container>

            </section>

        </Helmet>

    );
}
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../redux/actions';
import { useParams } from 'react-router-dom';

export function useGetProductDetailHandler() {
  const dispatch = useDispatch();
  const { sku } = useParams();
  const productDetail = useSelector((state) => state.productDetails[sku]);

  useEffect(() => {
    if (!productDetail) {
      dispatch(getProductDetail(sku));
    }
  }, [sku, dispatch, productDetail]);

  return productDetail;
};
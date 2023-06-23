import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

const ProductPerfomance = ({products, count}) => {

    
  const [productList, setProductList] = useState(products);
  const allCount = count;
  const [counts, setCount] = useState(9);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getproducts?count=${counts + 9}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({category:''})
      }
    ).then((t) => t.json());
    setCount(count + 9);
    setProductList(res);
  };

  return (<>
    <BaseCard title="All productList">
    <InfiniteScroll 
        dataLength={productList.length}
        next={() => {
          setTimeout(() => {
            fetchData();
          }, 1000);
        }}
        hasMore={allCount !== productList.length}
        loader={
          <h4 className="text-2xl text-center text-orange-600 mt-5 mb-5">
            Loading...
          </h4>
        }
        endMessage={
          <p
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <b className="bg-slate-200 p-2">
              You have reached the end of the list
            </b>
          </p>
        }
         
        >
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "wrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Edit
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList && productList.map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {product.title.slice(0,14)+'...'}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.slug.slice(0,2)+'..'}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <img loading="lazy" style={{height:'82px'}} src={product.img[0]} alt="product-img" />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{product.size}/{product.color}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">₹{product.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  <Link href={`/updateproduct?id=${product._id}`}>
                <button className="bg-orange-600 px-2 py-1 m-0 rounded-sm text-white hover:bg-orange-500">Edit</button>
                </Link>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </InfiniteScroll>
    </BaseCard>
  </>
  );
};

export default ProductPerfomance;

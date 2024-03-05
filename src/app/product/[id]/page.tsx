import React from "react";

function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <>
      <p>{params.id}</p>
    </>
  );
}

export default ProductDetail;
